/**
 * TrustLend Supabase Sync Service
 *
 * ARCHITECTURE:
 * - Supabase  → source of truth for DISPLAY (marketplace, history, user profiles)
 * - Blockchain → source of truth for MONEY (always executed first)
 * - This service is called AFTER blockchain transactions succeed
 *
 * If Supabase is down → fall back to blockchain queries (handled at call sites)
 */

import { supabase } from '../lib/supabase';

// ─── syncNewLoan ──────────────────────────────────────────────────────────────
/**
 * Insert a new loan into loan_requests with all ML result columns.
 * Called immediately after submitLoanRequest() tx confirms on-chain.
 *
 * @param {{ borrowerAddress: string, amount: number, apr: number, durationDays: number,
 *           purpose?: string, blockchainLoanId?: string }} loanData
 * @param {{ fraudChecked: boolean, mlTrustScore: number, mlInterestRate: number,
 *           repaymentArchetype: string, scheduleType: string,
 *           gracePeriodDays: number, recommendedInstallments: number }} mlResults
 * @returns {Promise<object>} inserted row
 */
export async function syncNewLoan(loanData, mlResults = {}) {
  try {
    const { data, error } = await supabase
      .from('loan_requests')
      .insert({
        borrower_address:         loanData.borrowerAddress.toLowerCase(),
        amount:                   loanData.amount,
        apr:                      loanData.apr ?? mlResults.mlInterestRate ?? 7.1,
        duration_days:            loanData.durationDays,
        purpose:                  loanData.purpose ?? null,
        status:                   'pending',
        blockchain_loan_id:       loanData.blockchainLoanId ?? null,
        fraud_checked:            mlResults.fraudChecked ?? false,
        ml_trust_score:           mlResults.mlTrustScore ?? null,
        ml_interest_rate:         mlResults.mlInterestRate ?? null,
        repayment_archetype:      mlResults.repaymentArchetype ?? null,
        schedule_type:            mlResults.scheduleType ?? null,
        grace_period_days:        mlResults.gracePeriodDays ?? null,
        recommended_installments: mlResults.recommendedInstallments ?? null,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('[supabaseSync] syncNewLoan failed (loan exists on-chain):', err.message);
    return null;
  }
}

// ─── updateLoanStatus ─────────────────────────────────────────────────────────
/**
 * Update loan status (funded/repaid/defaulted) and record the transaction.
 *
 * @param {string} loanId        - UUID in loan_requests
 * @param {'funded'|'repaid'|'defaulted'} status
 * @param {string} txHash        - blockchain tx hash
 * @param {string} [fundedBy]    - funder wallet address (for 'funded' status)
 * @returns {Promise<object>} updated row
 */
export async function updateLoanStatus(loanId, status, txHash, fundedBy = null) {
  try {
    const patch = {
      status,
      ...(status === 'funded' && {
        funded_at: new Date().toISOString(),
        funded_by: fundedBy?.toLowerCase() ?? null,
      }),
    };

    const { data, error } = await supabase
      .from('loan_requests')
      .update(patch)
      .eq('id', loanId)
      .select()
      .single();

    if (error) throw error;

    // Also insert transaction record
    if (txHash) {
      await supabase.from('transactions').insert({
        tx_hash:      txHash,
        type:         status === 'funded' ? 'fund' : status === 'repaid' ? 'repay' : 'borrow',
        from_address: fundedBy?.toLowerCase() ?? null,
        amount:       data?.amount ?? null,
        status:       'confirmed',
        loan_id:      loanId,
      }).select();
    }

    return data;
  } catch (err) {
    console.warn('[supabaseSync] updateLoanStatus failed:', err.message);
    return null;
  }
}

// ─── syncUserProfile ─────────────────────────────────────────────────────────
/**
 * Upsert user profile with on-chain data + ML score.
 *
 * @param {string} address
 * @param {{ trustScore?: number, tier?: string, totalBorrowed?: number, totalRepaid?: number, activeLoans?: number }} onChainData
 * @param {{ mlTrustScore?: number, repaymentArchetype?: string }} mlScore
 */
export async function syncUserProfile(address, onChainData = {}, mlScore = {}) {
  try {
    const { error } = await supabase
      .from('users')
      .upsert(
        {
          wallet_address:      address.toLowerCase(),
          trust_score:         onChainData.trustScore         ?? 30,
          tier:                onChainData.tier               ?? 'bronze',
          total_borrowed:      onChainData.totalBorrowed      ?? 0,
          total_repaid:        onChainData.totalRepaid        ?? 0,
          active_loans:        onChainData.activeLoans        ?? 0,
          ml_trust_score:      mlScore.mlTrustScore           ?? null,
          repayment_archetype: mlScore.repaymentArchetype     ?? null,
          last_seen:           new Date().toISOString(),
        },
        { onConflict: 'wallet_address', ignoreDuplicates: false }
      );
    if (error) throw error;
  } catch (err) {
    console.warn('[supabaseSync] syncUserProfile failed:', err.message);
  }
}

// ─── syncTransaction ─────────────────────────────────────────────────────────
/**
 * Insert a blockchain transaction record into Supabase.
 *
 * @param {string} txHash
 * @param {'borrow'|'fund'|'repay'|'vouch'|'claim'} type
 * @param {string} from
 * @param {string} to
 * @param {number} amount
 * @param {string|null} loanId - UUID in loan_requests (optional)
 */
export async function syncTransaction(txHash, type, from, to, amount, loanId = null) {
  try {
    const { error } = await supabase
      .from('transactions')
      .insert({
        tx_hash:      txHash,
        type,
        from_address: from?.toLowerCase() ?? null,
        to_address:   to?.toLowerCase()   ?? null,
        amount,
        status:       'confirmed',
        loan_id:      loanId,
      });
    if (error && error.code !== '23505') throw error; // ignore duplicate tx_hash
  } catch (err) {
    console.warn('[supabaseSync] syncTransaction failed:', err.message);
  }
}

// ─── fetchMarketplaceLoans ────────────────────────────────────────────────────
/**
 * Fetch all pending loan requests for the marketplace.
 * Returns [] if Supabase is unavailable.
 */
export async function fetchMarketplaceLoans() {
  try {
    const { data, error } = await supabase
      .from('loan_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.warn('[supabaseSync] fetchMarketplaceLoans failed:', err.message);
    return [];
  }
}

// ─── fetchUserProfile ─────────────────────────────────────────────────────────
/**
 * Fetch a user's profile row from Supabase.
 */
export async function fetchUserProfile(address) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', address.toLowerCase())
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('[supabaseSync] fetchUserProfile failed:', err.message);
    return null;
  }
}

// ─── fetchUserTransactions ────────────────────────────────────────────────────
/**
 * Fetch transaction history for a wallet from Supabase.
 */
export async function fetchUserTransactions(address) {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .or(`from_address.eq.${address.toLowerCase()},to_address.eq.${address.toLowerCase()}`)
      .order('created_at', { ascending: false })
      .limit(30);
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.warn('[supabaseSync] fetchUserTransactions failed:', err.message);
    return [];
  }
}

// ─── subscribeToMarketplace ───────────────────────────────────────────────────
/**
 * Realtime subscription on loan_requests table.
 * Fires callback({ eventType, new: row, old: row }) on INSERT, UPDATE, DELETE.
 *
 * @param {Function} callback
 * @returns {object} subscription — call subscription.unsubscribe() to clean up
 */
export function subscribeToMarketplace(callback) {
  const channel = supabase
    .channel('marketplace-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'loan_requests' },
      (payload) => callback(payload)
    )
    .subscribe();

  return channel;
}
