import { useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import { ADDRESSES } from '../contracts/addresses';
import LendingPoolABI from '../contracts/LendingPool.json';
import VouchSystemABI from '../contracts/VouchSystem.json';

export function useTransactionHistory() {
  const { provider, walletAddress } = useWallet();
  const [globalActivity, setGlobalActivity] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!provider || !ADDRESSES.LENDING_POOL) {
      setIsLoading(false);
      return;
    }

    try {
      const pool = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, provider);
      const vouch = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, provider);

      // Fetch Global Activity (All Platform Events)
      const [requested, funded, repaid, defaulted] = await Promise.all([
        pool.queryFilter(pool.filters.LoanRequested(), -5000), // Last 5000 blocks
        pool.queryFilter(pool.filters.LoanFunded(), -5000),
        pool.queryFilter(pool.filters.RepaymentMade(), -5000),
        pool.queryFilter(pool.filters.LoanDefaulted(), -5000)
      ]);

      const allEvents = [
        ...requested.map(e => ({
          id: `req-${e.transactionHash}`,
          type: 'Loan Requested',
          user: e.args.borrower,
          value: `${ethers.formatUnits(e.args.amount, 18)} TRUST`,
          status: 'Marketplace',
          date: new Date(), // Block timestamp would be better but requires block fetch
          hash: e.transactionHash,
          positive: true,
          icon: 'lucide:file-plus'
        })),
        ...funded.map(e => ({
          id: `fund-${e.transactionHash}`,
          type: 'Loan Funded',
          user: e.args.lender,
          value: `${ethers.formatUnits(e.args.amount, 18)} TRUST`,
          status: 'Executed',
          date: new Date(),
          hash: e.transactionHash,
          positive: true,
          icon: 'lucide:zap'
        })),
        ...repaid.map(e => ({
          id: `repay-${e.transactionHash}`,
          type: 'Repayment Made',
          user: e.args.borrower,
          value: `${ethers.formatUnits(e.args.amount, 18)} TRUST`,
          status: 'Settled',
          date: new Date(),
          hash: e.transactionHash,
          positive: false,
          icon: 'lucide:refresh-ccw'
        })),
        ...defaulted.map(e => ({
          id: `default-${e.transactionHash}`,
          type: 'Loan Defaulted',
          user: e.args.borrower,
          value: `${ethers.formatUnits(e.args.amount, 18)} TRUST`,
          status: 'Slashed',
          date: new Date(),
          hash: e.transactionHash,
          positive: false,
          icon: 'lucide:alert-octagon'
        }))
      ].sort((a, b) => b.date - a.date).slice(0, 20);

      setGlobalActivity(allEvents);

      // Fetch User History if wallet connected
      if (walletAddress) {
        const addr = walletAddress.toLowerCase();
        const userEvents = allEvents.filter(e => 
          e.user.toLowerCase() === addr || 
          (e.type === 'Loan Funded' && funded.find(f => f.transactionHash === e.hash)?.args.borrower.toLowerCase() === addr)
        );
        setUserHistory(userEvents);
      }

    } catch (err) {
      console.warn("[useTransactionHistory] error:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [provider, walletAddress]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    transactions: userHistory,
    globalActivity,
    isLoading,
    refresh: fetchHistory
  };
}
