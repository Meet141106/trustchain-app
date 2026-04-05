/**
 * TrustLend ML API Service
 * Connects to the FastAPI ML server via VITE_ML_API_URL
 *
 * ARCHITECTURE:
 * - Blockchain  → source of truth for money
 * - ML API      → called BEFORE every loan submission
 * - If ML API down → fallback mock data, allow submission with warning
 */

const BASE_URL = (import.meta.env.VITE_ML_API_URL || 'http://localhost:8000') + '/api/v1';
const TIMEOUT_MS = 15000; // 15s — generous for Render cold start
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000; // 3s between retries

// ─── Sleep helper ─────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Core fetch with timeout + cold-start retry ───────────────────────────────
async function mlFetch(endpoint, payload) {
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      // 503 = Render cold start — wait and retry
      if (res.status === 503 && attempt < MAX_RETRIES) {
        console.warn(`[mlApi] 503 on ${endpoint} (attempt ${attempt}/${MAX_RETRIES}) — retrying in ${RETRY_DELAY_MS}ms...`);
        clearTimeout(tid);
        await sleep(RETRY_DELAY_MS);
        continue;
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      clearTimeout(tid);
      lastError = err;
      if (err.name === 'AbortError') {
        lastError = new Error('ML API timed out');
      }
      if (attempt < MAX_RETRIES) {
        console.warn(`[mlApi] ${endpoint} attempt ${attempt} failed (${lastError.message}) — retrying...`);
        await sleep(RETRY_DELAY_MS);
      }
    } finally {
      clearTimeout(tid);
    }
  }

  throw lastError;
}

// ─── Fallback mock responses (when API is down) ───────────────────────────────
function mockTrustScore(payload) {
  const base = 30;
  const repayBonus    = ((payload.repayment_history      || 0.5) * 25);
  const speedBonus    = ((payload.repayment_speed         || 0.5) * 10);
  const voucherBonus  = ((payload.voucher_quality         || 0.5) * 15);
  const networkBonus  = ((payload.vouch_network_balance   || 0.5) * 10);
  const score = Math.min(100, Math.round(base + repayBonus + speedBonus + voucherBonus + networkBonus));
  return { status: 'fallback', trust_score: score, eligible_limit_usd: score * 10 };
}

function mockFraudCheck() {
  return { status: 'fallback', is_fraudulent: false, reason: 'ML API offline — conservative pass granted.' };
}

function mockInterestRate(payload) {
  const base      = 5.0;
  const risk      = Math.max(0, (100 - (payload.trust_score || 50)) / 20);
  const duration  = (payload.loan_duration_days || 30) > 30 ? 1.5 : 0.5;
  const discount  = ((payload.vouch_coverage_pct || 0) / 100) * 2;
  const total     = Number((base + risk + duration - discount).toFixed(1));
  return {
    status: 'fallback',
    data: {
      base_rate_pct: base,
      risk_premium_pct: risk,
      duration_premium_pct: duration,
      vouch_discount_pct: discount,
      total_interest_rate_pct: total,
    },
  };
}

function mockRepaymentSchedule(payload) {
  const txPerMonth = payload.tx_per_month || 8;
  const archetype  = txPerMonth > 20 ? 'Daily Earner'
                   : txPerMonth > 8  ? 'Weekly Earner'
                   : 'Seasonal Earner';
  const scheduleType = txPerMonth > 20 ? 'daily'
                     : txPerMonth > 8  ? 'weekly'
                     : 'lump_sum';
  return {
    status: 'fallback',
    data: {
      archetype,
      schedule_type: scheduleType,
      grace_period_days: txPerMonth > 8 ? 7 : 30,
      recommended_installments: txPerMonth > 20 ? 30 : txPerMonth > 8 ? 4 : 2,
    },
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * POST /api/v1/trust-score
 * @param {{ repayment_history: number, repayment_speed: number, voucher_quality: number,
 *           loan_to_repayment_ratio: number, vouch_network_balance: number, transaction_frequency: number }} payload
 */
export async function getTrustScore(payload) {
  try {
    return await mlFetch('/trust-score', payload);
  } catch (err) {
    console.warn('[mlApi] getTrustScore offline — using fallback:', err.message);
    return mockTrustScore(payload);
  }
}

/**
 * POST /api/v1/fraud-check
 * @param {{ vouch_requests_24h: number, avg_voucher_account_age_days: number, network_clustering_score: number }} payload
 */
export async function checkFraud(payload) {
  try {
    return await mlFetch('/fraud-check', payload);
  } catch (err) {
    console.warn('[mlApi] checkFraud offline — using fallback:', err.message);
    return mockFraudCheck();
  }
}

/**
 * POST /api/v1/interest-rate
 * Exact contract: { trust_score: int, loan_duration_days: int, vouch_coverage_pct: float }
 * @param {{ trust_score: number, loan_duration_days: number, vouch_coverage_pct: number }} payload
 */
export async function getInterestRate(payload) {
  try {
    return await mlFetch('/interest-rate', {
      trust_score:        Math.round(payload.trust_score),
      loan_duration_days: Math.round(payload.loan_duration_days),
      vouch_coverage_pct: Number(payload.vouch_coverage_pct),
    });
  } catch (err) {
    console.warn('[mlApi] getInterestRate offline — using fallback:', err.message);
    return mockInterestRate(payload);
  }
}

/**
 * POST /api/v1/repayment-schedule
 * @param {{ tx_per_month: number, avg_days_between_tx: number }} payload
 */
export async function getRepaymentSchedule(payload) {
  try {
    return await mlFetch('/repayment-schedule', payload);
  } catch (err) {
    console.warn('[mlApi] getRepaymentSchedule offline — using fallback:', err.message);
    return mockRepaymentSchedule(payload);
  }
}

/**
 * GET /health — check if ML server is reachable
 */
export async function checkMLHealth() {
  try {
    const res = await fetch(
      (import.meta.env.VITE_ML_API_URL || 'http://localhost:8000') + '/health',
      { signal: AbortSignal.timeout(5000) }
    );
    return res.ok;
  } catch {
    return false;
  }
}

const mlApi = { getTrustScore, checkFraud, getInterestRate, getRepaymentSchedule, checkMLHealth };
export default mlApi;
