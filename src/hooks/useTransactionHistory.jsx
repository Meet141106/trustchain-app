import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import { ADDRESSES } from '../contracts/addresses';
import LendingPoolABI from '../contracts/LendingPool.json';
import VouchSystemABI from '../contracts/VouchSystem.json';
import { fetchUserTransactions } from '../services/supabaseSync';

// ─── Shape helpers ────────────────────────────────────────────────────────────
function shapeSupabaseTx(tx) {
  return {
    id:       tx.id,
    type:     tx.type === 'borrow'  ? 'Loan Requested'
            : tx.type === 'fund'    ? 'Loan Funded'
            : tx.type === 'repay'   ? 'Repayment Made'
            : tx.type === 'vouch'   ? 'Vouch Staked'
            : 'Claim',
    user:     tx.from_address || '',
    value:    `${tx.amount ?? '?'} TRUST`,
    status:   tx.type === 'fund'    ? 'Executed'
            : tx.type === 'repay'   ? 'Settled'
            : tx.type === 'vouch'   ? 'Staked'
            : 'Marketplace',
    date:     new Date(tx.created_at),
    hash:     tx.tx_hash || '',
    positive: ['borrow', 'fund', 'vouch', 'claim'].includes(tx.type),
    icon:     tx.type === 'borrow'  ? 'lucide:file-plus'
            : tx.type === 'fund'    ? 'lucide:zap'
            : tx.type === 'repay'   ? 'lucide:refresh-ccw'
            : tx.type === 'vouch'   ? 'lucide:users'
            : 'lucide:coins',
    source:   'supabase',
  };
}

function shapeBlockchainTx(events) {
  return events.map(e => {
    const kind = e._kind;
    return {
      id:       `bc-${e.transactionHash}`,
      type:     kind === 'request' ? 'Loan Requested'
              : kind === 'funded'  ? 'Loan Funded'
              : kind === 'repaid'  ? 'Repayment Made'
              : 'Loan Defaulted',
      user:     e.args.borrower || e.args.lender || '',
      value:    `${ethers.formatUnits(e.args.amount || 0n, 18)} TRUST`,
      status:   kind === 'funded'  ? 'Executed'
              : kind === 'repaid'  ? 'Settled'
              : kind === 'request' ? 'Marketplace'
              : 'Slashed',
      date:     new Date(),
      hash:     e.transactionHash || '',
      positive: ['request', 'funded'].includes(kind),
      icon:     kind === 'request' ? 'lucide:file-plus'
              : kind === 'funded'  ? 'lucide:zap'
              : kind === 'repaid'  ? 'lucide:refresh-ccw'
              : 'lucide:alert-octagon',
      source:   'blockchain',
    };
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTransactionHistory() {
  const { provider, walletAddress } = useWallet();
  const [globalActivity, setGlobalActivity]  = useState([]);
  const [userHistory, setUserHistory]        = useState([]);
  const [isLoading, setIsLoading]            = useState(true);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);

    // ── 1. Try Supabase first ────────────────────────────────────────────────
    if (walletAddress) {
      try {
        const rows = await fetchUserTransactions(walletAddress);
        if (rows.length > 0) {
          const shaped = rows.map(shapeSupabaseTx);
          setUserHistory(shaped);
          setGlobalActivity(shaped.slice(0, 20));
          setIsLoading(false);
          return; // done — no need to hit blockchain
        }
      } catch(err) {
        console.warn('[useTransactionHistory] Supabase unavailable:', err.message);
      }
    }

    // ── 2. Fallback: blockchain event queries (avoids -4990 fromBlock error) ─
    if (!provider || !ADDRESSES.LENDING_POOL) {
      setIsLoading(false);
      return;
    }

    try {
      const pool  = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, provider);

      // Safe fromBlock: never go negative
      const currentBlock = await provider.getBlockNumber();
      const fromBlock    = Math.max(0, Number(currentBlock) - 1000); // smaller window to avoid -4990

      const [requested, funded, repaid, defaulted] = await Promise.all([
        pool.queryFilter(pool.filters.LoanRequested(), fromBlock).catch(() => []),
        pool.queryFilter(pool.filters.LoanFunded(),    fromBlock).catch(() => []),
        pool.queryFilter(pool.filters.RepaymentMade(), fromBlock).catch(() => []),
        pool.queryFilter(pool.filters.LoanDefaulted(), fromBlock).catch(() => []),
      ]);

      const tagged = [
        ...requested.map(e => ({ ...e, _kind: 'request' })),
        ...funded.map(e    => ({ ...e, _kind: 'funded'  })),
        ...repaid.map(e    => ({ ...e, _kind: 'repaid'  })),
        ...defaulted.map(e => ({ ...e, _kind: 'default' })),
      ];

      const allEvents = shapeBlockchainTx(tagged)
        .sort((a, b) => b.date - a.date)
        .slice(0, 20);

      setGlobalActivity(allEvents);

      if (walletAddress) {
        const addr = walletAddress.toLowerCase();
        setUserHistory(allEvents.filter(e =>
          e.user?.toLowerCase() === addr
        ));
      }
    } catch (err) {
      console.warn('[useTransactionHistory] blockchain fallback error:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, [provider, walletAddress]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { transactions: userHistory, globalActivity, isLoading, refresh: fetchHistory };
}
