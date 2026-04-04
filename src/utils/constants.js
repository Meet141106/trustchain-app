/**
 * constants.js — Re-exports from the single tier config.
 * All tier logic lives in src/config/tiers.js.
 */
export {
  TIER_ORDER,
  TIER_COLORS,
  TIER_LIMITS,
  getTier,
  getTierForScore,
  nextTierInfo,
} from '../config/tiers';
