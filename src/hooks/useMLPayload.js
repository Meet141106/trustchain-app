// src/hooks/useMLPayload.js
import { useStore } from '../store';

export function useMLPayload() {
  const address = useStore(state => state.address);

  const getPayloads = () => ({
    trustScore: {
      repayment_history: 0.85,           // production: ratio of on-time repayments from loan history table
      repayment_speed: 0.72,             // production: avg days early / loan term from LendingPool events
      voucher_quality: 0.68,             // production: avg trust score of vouchers from VouchSystem contract
      loan_to_repayment_ratio: 0.91,     // production: total repaid / total borrowed from chain
      vouch_network_balance: 0.60,       // production: vouches given vs received from VouchSystem
      transaction_frequency: 14,         // production: tx count last 30 days from on-chain indexer
    }
  });

  return { getPayloads };
}
