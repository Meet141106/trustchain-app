/**
 * tiers.js — Single source of truth for TrustLend tier definitions.
 *
 * RULE: If you need tier info anywhere — frontend, Zustand, Supabase helpers —
 *       import from here. Never hardcode tier numbers elsewhere.
 *
 * The on-chain LendingPool.getBorrowLimit() MUST match these thresholds exactly.
 */

export const TIERS = {
  ENTRY: {
    name: 'Entry',
    minScore: 0,
    maxScore: 29,
    maxLoan: 0,       // cannot borrow yet
    color: '#8C8C8C',
  },
  BRONZE: {
    name: 'Bronze',
    minScore: 30,
    maxScore: 49,
    maxLoan: 10,      // 10 TRUST
    color: '#CD7F32',
  },
  SILVER: {
    name: 'Silver',
    minScore: 50,
    maxScore: 69,
    maxLoan: 200,     // 200 TRUST
    color: '#A8A9AD',
  },
  GOLD: {
    name: 'Gold',
    minScore: 70,
    maxScore: 89,
    maxLoan: 500,     // 500 TRUST
    color: '#FFD700',
  },
  PLATINUM: {
    name: 'Platinum',
    minScore: 90,
    maxScore: 100,
    maxLoan: 1000,    // 1000 TRUST
    color: '#2DD4BF',
  },
};

/** Ordered array for iteration */
export const TIER_ORDER = ['Entry', 'Bronze', 'Silver', 'Gold', 'Platinum'];

/** Tier name → color lookup */
export const TIER_COLORS = Object.fromEntries(
  Object.values(TIERS).map(t => [t.name, t.color])
);

/** Tier name → max loan lookup */
export const TIER_LIMITS = Object.fromEntries(
  Object.values(TIERS).map(t => [t.name, t.maxLoan])
);

/**
 * Get the tier object for a given trust score.
 * @param {number} score 0–100
 * @returns {{ name, minScore, maxScore, maxLoan, color }}
 */
export function getTierForScore(score) {
  const s = Number(score) || 0;
  if (s >= 90) return TIERS.PLATINUM;
  if (s >= 70) return TIERS.GOLD;
  if (s >= 50) return TIERS.SILVER;
  if (s >= 30) return TIERS.BRONZE;
  return TIERS.ENTRY;
}

/** Legacy compat — returns tier name string */
export function getTier(score) {
  return getTierForScore(score).name;
}

/**
 * Info about the next tier the user can reach.
 * @returns {{ tier, at, limit, ptsNeeded } | null} null if already max
 */
export function nextTierInfo(score) {
  const s = Number(score) || 0;
  const thresholds = [
    { tier: 'Bronze',   at: 30,  limit: 10   },
    { tier: 'Silver',   at: 50,  limit: 200  },
    { tier: 'Gold',     at: 70,  limit: 500  },
    { tier: 'Platinum', at: 90,  limit: 1000 },
  ];
  const next = thresholds.find(t => s < t.at);
  if (!next) return null;
  return { ...next, ptsNeeded: next.at - s };
}
