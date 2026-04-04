/**
 * store.js — Zustand store (CACHE ONLY)
 *
 * RULES:
 * - This store is a CLIENT-SIDE CACHE. Never the source of truth.
 * - Trust score comes from on-chain (LendingPool.getTrustScore)
 * - Tier is derived from the single config (config/tiers.js)
 * - Loans come from on-chain (LendingPool.getLoan)
 * - NO borrowFunds() or repayLoan() here. Those live in hooks that
 *   call the blockchain directly.
 */

import { create } from 'zustand';
import { getTierForScore } from './config/tiers';

export const useStore = create((set) => ({
  // ── wallet (mirrors WalletContext for non-React consumers) ──
  address: null,
  isConnected: false,

  // ── trust score — fetched from chain, cached here ──
  trustScore: null,
  tier: null,

  // ── loans — fetched from chain, cached here ──
  activeLoan: null,
  loanHistory: [],

  // ── pool stats — fetched from chain, cached here ──
  poolLiquidity: 0,
  activeLoansCount: 0,

  // ── actions (cache updates only — no blockchain calls) ──
  setAddress: (address) => set({
    address,
    isConnected: !!address,
  }),

  setTrustScore: (score) => set({
    trustScore: score,
    tier: getTierForScore(score),
  }),

  setActiveLoan: (loan) => set({ activeLoan: loan }),
  setLoanHistory: (history) => set({ loanHistory: history }),

  setPoolStats: (liquidity, activeLoans) => set({
    poolLiquidity: liquidity,
    activeLoansCount: activeLoans,
  }),

  clearWallet: () => set({
    address: null,
    isConnected: false,
    trustScore: null,
    tier: null,
    activeLoan: null,
    loanHistory: [],
    poolLiquidity: 0,
    activeLoansCount: 0,
  }),
}));
