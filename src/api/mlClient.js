// src/api/mlClient.js

const ML_BASE_URL = 'https://preferentially-dizygotic-lilyanna.ngrok-free.dev';
const REQUEST_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out after 15 seconds');
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

const mlClient = {

  // Trust Score Calculator
  // Payload: { repayment_history: float, repayment_speed: float, voucher_quality: float,
  //            loan_to_repayment_ratio: float, vouch_network_balance: float, transaction_frequency: int }
  // Response: { status: "success", trust_score: int, eligible_limit_usd: int }
  // WARNING: The trust_score in this response is an ML recommendation ONLY.
  // It must NEVER be written to Zustand store, Supabase, or passed to any smart contract.
  // Display it only inside LoanMLSummary component.
  getTrustScore: async (payload) => {
    try {
      const response = await fetchWithTimeout(`${ML_BASE_URL}/api/v1/trust-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return response;
    } catch (err) {
      console.error("ML API getTrustScore Error:", err);
      throw err;
    }
  },

  // Health endpoint
  checkHealth: async () => {
    try {
      const response = await fetchWithTimeout(`${ML_BASE_URL}/health`, {
        method: 'GET'
      });
      return response;
    } catch (err) {
      console.error("ML API checkHealth Error:", err);
      throw err;
    }
  }

};

export default mlClient;