/**
 * TrustLend ML Engine Interface
 * This utility handles calls to the AI/ML backend for dynamic risk and interest modeling.
 */

const BASE_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:5000/api/v1';

async function callML(endpoint, payload) {
    try {
        // For demo/development: generate fallback mock data if API is not reachable
        // In production, this would be a real fetch call
        if (import.meta.env.MODE === 'development' || !import.meta.env.VITE_ML_API_URL) {
            return mockResponse(endpoint, payload);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    } catch (error) {
        console.warn(`ML Engine Error [${endpoint}]:`, error);
        return mockResponse(endpoint, payload);
    }
}

/**
 * Endpoint 1: Trust Score Calculator
 */
export const calculateTrustScore = (data) => callML('/trust-score', data);

/**
 * Endpoint 2: Adaptive Repayment Scheduler
 */
export const getRepaymentSchedule = (data) => callML('/repayment-schedule', data);

/**
 * Endpoint 3: Fraud / Sybil Check
 */
export const checkFraudRisk = (data) => callML('/fraud-check', data);

/**
 * Endpoint 4: P2P Dynamic Interest Rate
 */
export const calculateInterestRate = (data) => callML('/interest-rate', data);

/**
 * MOCK ENGINE
 * Generates realistic responses for UI testing even without the ML backend live.
 */
function mockResponse(endpoint, payload) {
    return new Promise((resolve) => {
        setTimeout(() => {
            switch (endpoint) {
                case '/trust-score':
                    resolve({
                        status: "success",
                        trust_score: Math.min(100, Math.round(75 + (payload.repayment_history * 20))),
                        eligible_limit_usd: Math.round(500 + (payload.vouch_network_balance * 0.1))
                    });
                    break;
                case '/repayment-schedule':
                    resolve({
                        status: "success",
                        data: {
                            archetype: payload.tx_per_month > 10 ? "Power User" : "Steady Earner",
                            schedule_type: "Bi-Weekly",
                            grace_period_days: 7,
                            recommended_installments: 4
                        }
                    });
                    break;
                case '/fraud-check':
                    resolve({
                        status: "success",
                        is_fraudulent: payload.vouch_requests_24h > 10,
                        reason: payload.vouch_requests_24h > 10 ? "Anomalous vouch requesting volume detected." : "Pattern matches authentic user behavior."
                    });
                    break;
                case '/interest-rate':
                    const base = 5.0;
                    const discount = (payload.vouch_coverage_pct / 100) * 2;
                    resolve({
                        status: "success",
                        data: {
                            base_rate_pct: base,
                            risk_premium_pct: Math.max(0, (100 - payload.trust_score) / 10),
                            duration_premium_pct: payload.loan_duration_days > 30 ? 1.5 : 0.5,
                            vouch_discount_pct: discount,
                            total_interest_rate_pct: Number((base + (100 - payload.trust_score)/10 + 0.5 - discount).toFixed(1))
                        }
                    });
                    break;
                default:
                    resolve({ status: "error", message: "Unknown endpoint" });
            }
        }, 800); // Simulate network latency
    });
}
