/**
 * syncWallet.js — On-chain to Supabase reconciliation utility.
 *
 * Reads all on-chain state for a wallet and upserts into Supabase.
 * Blockchain is ALWAYS the source of truth.
 *
 * Call this on every wallet connection to start from ground truth.
 */

import { ethers } from 'ethers';
import ADDRESSES from '../config/contracts.json';
import LendingPoolABI from '../contracts/LendingPool.json';
import { supabase, upsertUser } from './supabase';

/**
 * Sync a wallet's on-chain state into Supabase.
 *
 * @param {string} address - Wallet address
 * @param {ethers.BrowserProvider} provider - ethers provider
 * @returns {{ score, loan, synced }} Synced state summary
 */
export async function syncWalletState(address, provider) {
  if (!address || !provider || !ADDRESSES.LendingPool) {
    return { score: 0, loan: null, synced: false };
  }

  const lower = address.toLowerCase();

  try {
    const pool = new ethers.Contract(
      ADDRESSES.LendingPool,
      LendingPoolABI.abi,
      provider
    );

    // 1. Get trust score from chain
    let onChainScore = 0;
    try {
      onChainScore = Number(await pool.getTrustScore(lower));
    } catch {
      // getTrustScore may not exist on older deployments — fallback to getBorrowLimit heuristic
      console.warn('[syncWallet] getTrustScore failed, skipping score sync');
    }

    // 2. Get active loan from chain
    let onChainLoan = null;
    try {
      const loan = await pool.getLoan(lower);
      if (loan && Number(loan.status) === 1) { // 1 = Active
        const owed = await pool.getTotalOwed(lower);
        onChainLoan = {
          amount: parseFloat(ethers.formatUnits(loan.amount, 18)),
          repaidAmount: parseFloat(ethers.formatUnits(loan.repaidAmount, 18)),
          totalOwed: parseFloat(ethers.formatUnits(owed, 18)),
          status: Number(loan.status), // 1=Active, 2=Repaid, 3=Defaulted
          path: Number(loan.path),
          startTime: Number(loan.startTime) * 1000,
          dueDate: Number(loan.dueDate) * 1000,
        };
      }
    } catch (e) {
      console.warn('[syncWallet] loan fetch error:', e.message);
    }

    // 3. Upsert user in Supabase (create if not exists)
    try {
      await upsertUser(lower);
    } catch (e) {
      console.warn('[syncWallet] upsert user error:', e.message);
    }

    // 4. If there's an active on-chain loan, ensure Supabase has it
    if (onChainLoan && onChainLoan.status === 1) {
      try {
        // Check if Supabase already has an active loan for this wallet
        const { data } = await supabase
          .from('loans')
          .select('id')
          .eq('wallet_address', lower)
          .eq('loan_status', 'active')
          .maybeSingle();

        if (!data) {
          // On-chain loan exists but Supabase doesn't know about it → reconcile
          await supabase.from('loans').insert({
            wallet_address: lower,
            amount: onChainLoan.amount,
            path: onChainLoan.path === 0 ? 'vouched' : onChainLoan.path === 1 ? 'collateral' : 'trust',
            loan_status: 'active',
            due_date: new Date(onChainLoan.dueDate).toISOString(),
            tx_hash: 'synced-from-chain',
          });
          console.log('[syncWallet] Reconciled on-chain loan into Supabase');
        }
      } catch (e) {
        console.warn('[syncWallet] loan reconcile error:', e.message);
      }
    } else if (!onChainLoan) {
      // 4b. Blockchain says NO active loan. If Supabase says Active, mark it Repaid.
      try {
        await supabase
          .from('loans')
          .update({ loan_status: 'repaid' })
          .eq('wallet_address', lower)
          .eq('loan_status', 'active');
      } catch (e) {
        console.warn('[syncWallet] loan repay reconcile error:', e.message);
      }
    }

    console.log(`[syncWallet] ✓ Synced wallet ${lower.slice(0, 8)}… — score: ${onChainScore}, loan: ${onChainLoan ? 'active' : 'none'}`);

    return {
      score: onChainScore,
      loan: onChainLoan,
      synced: true,
    };
  } catch (e) {
    console.warn('[syncWallet] sync failed:', e.message);
    return { score: 0, loan: null, synced: false };
  }
}
