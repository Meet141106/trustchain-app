/**
 * addresses.js — Compatibility shim.
 * 
 * The single source of truth is now src/config/contracts.json,
 * auto-written by blockchain/scripts/deploy.js on every deployment.
 * 
 * This file re-exports in the ADDRESSES format that hooks expect.
 */
import CONTRACTS from '../config/contracts.json';

export const ADDRESSES = {
  TRUST_TOKEN:    CONTRACTS.TrustToken  || CONTRACTS.StableToken,
  LENDING_POOL:   CONTRACTS.LendingPool,
  REPUTATION_NFT: CONTRACTS.ReputationNFT,
  VOUCH_SYSTEM:   CONTRACTS.VouchSystem,
  CHAIN_ID:       Number(CONTRACTS.chainId) || 31337,
  EXPLORER:       CONTRACTS.network === 'amoy'
    ? 'https://amoy.polygonscan.com'
    : 'http://localhost:8545',
};

export const explorerTxUrl  = (hash) => `${ADDRESSES.EXPLORER}/tx/${hash}`;
export const explorerAddrUrl = (addr) => `${ADDRESSES.EXPLORER}/address/${addr}`;
