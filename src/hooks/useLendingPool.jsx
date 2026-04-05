import { useState, useEffect, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import { ADDRESSES } from '../contracts/addresses';
import LendingPoolABI from '../contracts/LendingPool.json';
import { useDemo } from '../context/DemoContext';
import { showTxLoading, showTxSuccess, showTxError } from '../utils/txToast';
import { translateContractError } from '../utils/contractErrors';
import { syncNewLoan, updateLoanStatus, syncUserProfile, syncTransaction } from '../services/supabaseSync';

export function useLendingPool() {
  const { provider, walletAddress } = useWallet();
  const { isDemoMode, demoStateOverrides, simulateTx } = useDemo();
  const [borrowLimit, setBorrowLimit] = useState("0.0");
  const [userLoan, setUserLoan] = useState(null);
  const [pendingRequest, setPendingRequest] = useState(null);
  const [openRequests, setOpenRequests] = useState([]);
  const [poolStats, setPoolStats] = useState({
    totalFunded: "0.0",
    activeLoans: "0",
    openRequests: "0",
    avgInterestRate: "0"
  });
  const [lenderLoans, setLenderLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (isDemoMode && demoStateOverrides) {
        setBorrowLimit("500.0");
        setPoolStats({
            totalFunded: "15400.0",
            activeLoans: "42",
            openRequests: "12",
            avgInterestRate: "6.5"
        });
        setUserLoan(demoStateOverrides.userLoan);
        setPendingRequest(null);
        setOpenRequests([]);
        setIsLoading(false);
        return;
    }

    if (!provider || !ADDRESSES.LENDING_POOL) {
        setIsLoading(false);
        return;
    }

    try {
      const contract = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, provider);

      // Fetch Global Stats
      try {
        const stats = await contract.getPoolStats();
        if (stats) {
          setPoolStats({
              totalFunded: stats.funded ? ethers.formatUnits(stats.funded, 18) : "0.0",
              activeLoans: stats.active ? stats.active.toString() : "0",
              openRequests: stats.requests ? stats.requests.toString() : "0",
              avgInterestRate: stats.avgRate ? (Number(stats.avgRate) / 100).toFixed(1) : "0.0"
          });
        }
      } catch (e) {
          console.warn("[useLendingPool] stats error:", e.message);
      }

      // Fetch Open Requests for Marketplace
      try {
          const reqs = await contract.getOpenRequests();
          if (reqs && Array.isArray(reqs)) {
            const formatted = reqs.map(r => ({
                id: r.requestId ? r.requestId.toString() : "0",
                borrower: r.borrower || "",
                amount: r.amount ? ethers.formatUnits(r.amount, 18) : "0",
                duration: r.durationDays ? r.durationDays.toString() : "0",
                interestRate: r.interestRate ? (Number(r.interestRate) / 100).toFixed(1) : "0",
                path: r.path !== undefined ? Number(r.path) : 0,
                createdAt: r.createdAt ? Number(r.createdAt) * 1000 : Date.now(),
                expiresAt: r.expiresAt ? Number(r.expiresAt) * 1000 : Date.now(),
                status: r.status !== undefined ? Number(r.status) : 0
            }));
            setOpenRequests(formatted);
          } else {
            setOpenRequests([]);
          }
      } catch (e) {
          console.warn("[useLendingPool] open requests error:", e.message);
      }

      if (walletAddress) {
        try {
            const limit = await contract.getBorrowLimit(walletAddress);
            setBorrowLimit(limit ? ethers.formatUnits(limit, 18) : "0.0");
            
            // Check for pending request
            try {
              const pReq = await contract.getBorrowerRequest(walletAddress);
              if (pReq && pReq.requestId > 0 && Number(pReq.status) === 0) {
                  setPendingRequest({
                      id: pReq.requestId.toString(),
                      amount: ethers.formatUnits(pReq.amount, 18),
                      duration: pReq.durationDays.toString(),
                      interestRate: (Number(pReq.interestRate) / 100).toFixed(1),
                      path: Number(pReq.path),
                      createdAt: Number(pReq.createdAt) * 1000,
                      expiresAt: Number(pReq.expiresAt) * 1000,
                      status: Number(pReq.status)
                  });
              } else {
                  setPendingRequest(null);
              }
            } catch (e) {
              console.warn("[useLendingPool] borrower request error:", e.message);
              setPendingRequest(null);
            }

            // Check for active loan (as a borrower)
            try {
              const loan = await contract.getLoan(walletAddress);
              if (loan && Number(loan.status) === 1) {
                  const owed = await contract.getTotalOwed(walletAddress);
                  setUserLoan({
                      lender: loan.lender,
                      amount: ethers.formatUnits(loan.amount, 18),
                      repaidAmount: ethers.formatUnits(loan.repaidAmount, 18),
                      interestRate: (Number(loan.interestRate) / 100).toFixed(1),
                      startTime: Number(loan.startTime) * 1000,
                      dueDate: Number(loan.dueDate) * 1000,
                      installmentsPaid: loan.installmentsPaid.toString(),
                      totalInstallments: loan.totalInstallments.toString(),
                      status: Number(loan.status),
                      path: Number(loan.path),
                      totalOwed: ethers.formatUnits(owed, 18)
                  });
              } else {
                  setUserLoan(null);
              }
            } catch (e) {
              console.warn("[useLendingPool] loan fetch error:", e.message);
              setUserLoan(null);
            }

            // Fetch Lender Portfolio (as a lender)
            try {
                const fundFilter = contract.filters.LoanFunded(null, walletAddress);
                const currentBlock = await provider.getBlockNumber();
                // Cap to 1000 blocks to avoid -4990 RPC error on local hardhat
                let fromBlock = Math.max(0, Number(currentBlock) - 1000);
                if (isNaN(fromBlock)) fromBlock = 0;
                const fundEvents = await contract.queryFilter(fundFilter, fromBlock);
                
                const borrowers = [...new Set(fundEvents.map(e => e.args.borrower))];
                const loansData = await Promise.all(borrowers.map(async b => {
                    const l = await contract.getLoan(b);
                    if (l.lender.toLowerCase() === walletAddress.toLowerCase()) {
                        return {
                            borrower: b,
                            amount: ethers.formatUnits(l.amount, 18),
                            repaidAmount: ethers.formatUnits(l.repaidAmount, 18),
                            interestRate: (Number(l.interestRate) / 100).toFixed(1),
                            startTime: Number(l.startTime) * 1000,
                            dueDate: Number(l.dueDate) * 1000,
                            status: Number(l.status),
                            path: Number(l.path)
                        };
                    }
                    return null;
                }));
                setLenderLoans(loansData.filter(l => l !== null));
            } catch (e) {
                console.warn("[useLendingPool] lender loans error:", e.message);
                setLenderLoans([]);
            }
        } catch (e) {
            console.warn("[useLendingPool] user stats error:", e.message);
        }
      }
    } catch (err) {
      console.warn("[useLendingPool] main error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [provider, walletAddress, isDemoMode, demoStateOverrides, simulateTx]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  const submitLoanRequest = async (amount, durationDays, path, mlResults = {}) => {
    if (!provider || !walletAddress) throw new Error("Wallet not connected");
    const id = showTxLoading("Submitting loan request to marketplace...");
    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, signer);
        const amountWei = ethers.parseUnits(amount.toString(), 18);
        const txPromise = contract.submitLoanRequest(amountWei, durationDays, path);
        const tx = await simulateTx(txPromise);
        const receipt = await tx.wait();
        showTxSuccess(`Request submitted! Waiting for a lender.`, tx.hash, id);

        // ── Supabase Sync (non-blocking, non-critical) ──────────────────────
        syncNewLoan(
          { borrowerAddress: walletAddress, amount, durationDays, blockchainLoanId: tx.hash },
          mlResults
        ).catch(e => console.warn('[useLendingPool] syncNewLoan:', e.message));

        syncTransaction(tx.hash, 'borrow', walletAddress, ADDRESSES.LENDING_POOL, amount, null)
          .catch(e => console.warn('[useLendingPool] syncTransaction:', e.message));
        // ───────────────────────────────────────────────────────────────────

        await fetchData();
        return tx;
    } catch (err) {
        showTxError(translateContractError(err), id);
        throw err;
    }
  };

  const fundLoanRequest = async (requestId, supabaseLoanId = null) => {
    if (!provider || !walletAddress) throw new Error("Wallet not connected");
    const id = showTxLoading("Funding loan for borrower...");
    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, signer);
        const txPromise = contract.fundLoanRequest(requestId);
        const tx = await simulateTx(txPromise);
        await tx.wait();
        showTxSuccess("Loan funded! Principal has been sent.", tx.hash, id);

        // ── Supabase Sync ──────────────────────────────────────────────────
        if (supabaseLoanId) {
          updateLoanStatus(supabaseLoanId, 'funded', tx.hash, walletAddress)
            .catch(e => console.warn('[useLendingPool] updateLoanStatus:', e.message));
        }
        syncTransaction(tx.hash, 'fund', walletAddress, null, null, supabaseLoanId)
          .catch(e => console.warn('[useLendingPool] syncTransaction:', e.message));
        // ───────────────────────────────────────────────────────────────────

        await fetchData();
        return tx;
    } catch (err) {
        showTxError(translateContractError(err), id);
        throw err;
    }
  };

  const cancelRequest = async (requestId) => {
    if (!provider || !walletAddress) throw new Error("Wallet not connected");
    const id = showTxLoading("Cancelling loan request...");
    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, signer);
        const txPromise = contract.cancelLoanRequest(requestId);
        const tx = await simulateTx(txPromise);
        await tx.wait();
        showTxSuccess("Request cancelled", tx.hash, id);
        await fetchData();
        return tx;
    } catch (err) {
        showTxError(translateContractError(err), id);
        throw err;
    }
  };

  const makeRepayment = async (amount, supabaseLoanId = null) => {
    if (!provider || !walletAddress) throw new Error("Wallet not connected");
    const id = showTxLoading("Processing loan repayment...");
    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESSES.LENDING_POOL, LendingPoolABI.abi, signer);
        const amountWei = ethers.parseUnits(amount.toString(), 18);
        const txPromise = contract.makeRepayment(amountWei);
        const tx = await simulateTx(txPromise);
        await tx.wait();
        showTxSuccess("Direct repayment successful!", tx.hash, id);

        // ── Supabase Sync ──────────────────────────────────────────────────
        if (supabaseLoanId) {
          updateLoanStatus(supabaseLoanId, 'repaid', tx.hash)
            .catch(e => console.warn('[useLendingPool] updateLoanStatus repaid:', e.message));
        }
        syncTransaction(tx.hash, 'repay', walletAddress, null, amount, supabaseLoanId)
          .catch(e => console.warn('[useLendingPool] syncTransaction repay:', e.message));
        // Sync user profile after repayment
        syncUserProfile(walletAddress, {}, {})
          .catch(e => console.warn('[useLendingPool] syncUserProfile:', e.message));
        // ───────────────────────────────────────────────────────────────────

        await fetchData();
        return tx;
    } catch (err) {
        showTxError(translateContractError(err), id);
        throw err;
    }
  };

  return { 
    borrowLimit, 
    userLoan, 
    pendingRequest,
    openRequests,
    poolStats, 
    lenderLoans,
    isLoading, 
    isRequestPending: !!pendingRequest,
    submitLoanRequest, 
    fundLoanRequest,
    cancelRequest,
    makeRepayment, 
    refresh: fetchData 
  };
}
