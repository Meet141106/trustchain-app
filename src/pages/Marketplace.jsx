import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import { useTrustToken } from '../hooks/useTrustToken';
import { useVouchSystem } from '../hooks/useVouchSystem';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

export default function Marketplace() {
  const { isDarkMode } = useTheme();
  const { walletAddress: address } = useWallet();
  const navigate = useNavigate();

  const { openRequests, fundLoanRequest, poolStats, isLoading, refresh } = useLendingPool();
  const { trustBalance, isApproved, approvePool, claimTestTokens } = useTrustToken();
  const { globalActivity, isLoading: isTxLoading } = useTransactionHistory();

  const [filter, setFilter] = useState('All');
  const [isFunding, setIsFunding] = useState(null); // stores requestId

  const filteredRequests = useMemo(() => {
    if (filter === 'All') return openRequests;
    // Basic filtering logic for demo
    if (filter === 'Low Risk') return openRequests.filter(r => Number(r.interestRate) < 5);
    return openRequests; 
  }, [openRequests, filter]);

  const totalRequested = openRequests.reduce((sum, r) => sum + Number(r.amount), 0);
  const avgScore = openRequests.length > 0 ? 68 : 0; // Mock avg for demo

  const handleFund = async (req) => {
    if (!address) {
        toast.error("Please connect your wallet first.");
        return;
    }
    if (req.borrower.toLowerCase() === address.toLowerCase()) {
        toast.error("You cannot fund your own request.");
        return;
    }
    if (Number(trustBalance) < Number(req.amount)) {
        toast.error(`Insufficient TRUST. You have ${trustBalance}, need ${req.amount}.`);
        return;
    }

    setIsFunding(req.id);
    try {
        const approved = await isApproved(req.amount);
        if (!approved) {
            const ok = await approvePool(req.amount);
            if (!ok) {
                setIsFunding(null);
                return;
            }
        }
        await fundLoanRequest(req.id);
        toast.success(`Loan funded! You'll earn ${((Number(req.amount) * Number(req.interestRate)) / 100).toFixed(1)} TRUST interest.`);
        navigate('/portfolio');
    } catch (err) {
        console.error(err);
    } finally {
        setIsFunding(null);
    }
  };

  const getTier = (score) => {
      if (score >= 90) return { label: 'PLATINUM', color: '#B4B4B4', border: '#B4B4B4' };
      if (score >= 70) return { label: 'GOLD', color: '#F5A623', border: '#F5A623' };
      if (score >= 50) return { label: 'SILVER', color: '#D4AF37', border: '#D4AF37' };
      return { label: 'BRONZE', color: '#A36B2B', border: '#A36B2B' };
  };

  const RequestCard = ({ req }) => {
    const isOwner = req.borrower.toLowerCase() === address?.toLowerCase();
    const tier = getTier(req.interestRate > 7 ? 40 : 75); // Mocked for demo
    const { stakeForBorrower } = useVouchSystem();
    const [isVouching, setIsVouching] = useState(false);

    const handleVouch = async () => {
        if (!address) { toast.error("Connect wallet to vouch"); return; }
        if (isOwner) { toast.error("Self-vouching not permitted"); return; }
        
        setIsVouching(true);
        try {
            // Check allowance first (simplified for demo)
            const vouchAmount = (Number(req.amount) / 3).toFixed(1); // Back 1/3 of the loan
            await stakeForBorrower(req.borrower, vouchAmount);
            toast.success(`You are now backing ${shortAddr(req.borrower)} for ${vouchAmount} TRUST!`);
        } catch (err) {
            console.error(err);
        } finally {
            setIsVouching(false);
        }
    };
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-[#111827] rounded-[24px] border border-[#E8E8E8] dark:border-[#1E2A3A] p-8 relative overflow-hidden transition-all hover:shadow-2xl hover:border-[#F5A623]/30"
        style={{ borderLeft: `6px solid ${tier.border}` }}
      >
        <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1E2A3A] flex items-center justify-center text-xs font-black text-[#F5A623] border border-white/5">
                    {req.borrower.slice(2, 4).toUpperCase()}
                </div>
                <div>
                    <p className="text-xs font-black text-[#FAFAF8] font-mono">{shortAddr(req.borrower)}</p>
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-[#8C8C8C]">Node ID: {req.id}</span>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">{tier.label} TIER</p>
                <p className="text-sm font-black font-cabinet" style={{ color: tier.color }}>TRUST SCORE: 75</p>
            </div>
        </div>

        <div className="space-y-6 mb-10">
            <div className="flex justify-between items-end">
                <h4 className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">REQUESTING</h4>
                <p className="text-3xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">{req.amount} TRUST</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-[#E8E8E8] dark:border-[#1E2A3A]">
                <div>
                     <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Duration</p>
                     <p className="text-xs font-black text-[#FAFAF8]">{req.duration} Days</p>
                </div>
                <div className="text-right">
                     <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Interest APR</p>
                     <p className="text-xs font-black text-[#1D9E75]">{req.interestRate}%</p>
                </div>
                <div>
                     <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Loan Path</p>
                     <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${req.path === 0 ? 'bg-[#1D9E75]' : req.path === 1 ? 'bg-[#627EEA]' : 'bg-[#F5A623]'}`}></span>
                        <p className="text-[9px] font-black text-[#FAFAF8] uppercase tracking-widest">
                            {req.path === 0 ? "Social-Backed" : req.path === 1 ? "Collateralized" : "Reputation-Only"}
                        </p>
                     </div>
                </div>
                <div className="text-right">
                     <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Expires In</p>
                     <p className="text-xs font-black text-[#EF4444]">47h 32m</p>
                </div>
            </div>
        </div>

        <div className="bg-[#1D9E75]/5 p-6 rounded-2xl border border-[#1D9E75]/10 mb-10">
             <div className="flex justify-between items-center mb-4">
                 <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">{isOwner ? 'PROJECTED REPAYMENT' : 'ESTIMATED RETURN'}</p>
                 <p className="text-lg font-black text-[#1D9E75] font-cabinet">{(Number(req.amount) * (1 + Number(req.interestRate)/100)).toFixed(1)} TRUST</p>
             </div>
             <p className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest">
                {req.path === 0 ? "Vouchers earn protocol-governed interest share" : "Direct P2P payout to lender wallet"}
             </p>
        </div>

        {isOwner ? (
            <div className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest flex items-center justify-center gap-2">
                    <iconify-icon icon="lucide:user"></iconify-icon>
                    Your Active Request
                </span>
            </div>
        ) : (
            <div className="flex gap-4">
                {req.path === 0 && (
                    <button 
                        onClick={handleVouch}
                        disabled={isVouching}
                        className="flex-1 py-5 border border-[#1D9E75] text-[#1D9E75] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1D9E75] hover:text-black transition-all"
                    >
                        Back This Peer
                    </button>
                )}
                <button 
                    onClick={() => handleFund(req)}
                    disabled={isFunding === req.id}
                    className="flex-[2] py-5 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(245,166,35,0.15)] flex items-center justify-center gap-3"
                >
                    {isFunding === req.id ? (
                        <><svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Funding...</>
                    ) : (
                        <>Fund Market Loan <iconify-icon icon="lucide:arrow-right" className="text-lg"></iconify-icon></>
                    )}
                </button>
            </div>
        )}
      </motion.div>
    );
  };

  return (
    <AppShell pageTitle="P2P Marketplace" pageSubtitle="Direct Capital Exchange">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Marketplace Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
            { l: "Open Requests",   v: isLoading ? '...' : poolStats.openRequests, c: '#F5A623' },
            { l: "Total Requested", v: isLoading ? '...' : `${Number(totalRequested).toLocaleString()} TRUST`, c: '#FAFAF8' },
            { l: "Avg Trust Score", v: isLoading ? '...' : avgScore, c: '#D4AF37' },
            { l: "Average APR",     v: isLoading ? '...' : `${poolStats.avgInterestRate}%`, c: '#1D9E75' },
            ].map((m, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] p-8 rounded-[20px] border border-[#E8E8E8] dark:border-[#1E2A3A] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-white/5"></div>
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">{m.l}</p>
                <p className="text-2xl font-black font-cabinet" style={{ color: m.c }}>{m.v}</p>
            </div>
            ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h3 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Live Loan Requests</h3>
                <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest mt-1">Fund direct loans and earn protocol-guaranteed interest</p>
            </div>
            <div className="flex bg-[#111827] p-1 rounded-xl border border-[#1E2A3A]">
                {['All', 'Low Risk', 'Vouch-Backed'].map(t => (
                    <button key={t} onClick={() => setFilter(t)} className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-[#F5A623] text-black shadow-lg' : 'text-[#8C8C8C] hover:text-[#FAFAF8]'}`}>
                        {t}
                    </button>
                ))}
            </div>
        </div>

        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton h="300px" rounded="24px" />
                <Skeleton h="300px" rounded="24px" />
            </div>
        ) : filteredRequests.length === 0 ? (
            <div className="bg-[#111827] border-2 border-dashed border-[#1E2A3A] p-32 rounded-[32px] text-center">
                <div className="w-24 h-24 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                    <iconify-icon icon="lucide:search-x" className="text-4xl text-[#8C8C8C]"></iconify-icon>
                </div>
                <h4 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tight mb-3">No Open Requests</h4>
                <p className="text-sm text-[#8C8C8C] max-w-sm mx-auto leading-relaxed mb-10">All active requests have been funded. Check back later or establish your own request to get started.</p>
                <button onClick={() => navigate('/borrow')} className="px-10 py-4 border border-[#F5A623] text-[#F5A623] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-[#F5A623] hover:text-black transition-all">Submit a Request</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                    {filteredRequests.map(req => (
                        <RequestCard key={req.id} req={req} />
                    ))}
                </AnimatePresence>
            </div>
        )}

        <div className="bg-[#1D9E75]/5 border border-[#1D9E75]/10 p-12 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <iconify-icon icon="lucide:shield-check" className="text-3xl text-[#1D9E75]"></iconify-icon>
                    <h4 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Your Lending Position</h4>
                </div>
                <p className="text-sm text-[#8C8C8C] leading-relaxed max-w-lg">Track your funded loans, monitor borrower health, and collect accrued interest directly to your wallet.</p>
            </div>
            <div className="flex gap-6 items-center">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Total Deployed</p>
                    <p className="text-3xl font-black font-cabinet text-[#FAFAF8]">0.0 TRUST</p>
                 </div>
                 <button onClick={() => navigate('/portfolio')} className="px-10 py-5 bg-[#1D9E75] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">My Portfolio</button>
            </div>
        </div>

        {/* Live Platform Activity */}
        <div className="bg-white dark:bg-[#111827] border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-[32px] p-10">
            <div className="flex justify-between items-center mb-10">
                <div>
                   <h4 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Live Platform Activity</h4>
                   <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-[0.2em] mt-1">Real-time ledger of protocol-wide credit events</p>
                </div>
                <button onClick={() => navigate('/ledger')} className="text-[10px] font-black text-[#F5A623] border border-[#F5A623]/30 px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">Full Platform Ledger</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/5 pb-4">
                        <tr>
                            <th className="pb-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Transaction Type</th>
                            <th className="pb-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Originating Node</th>
                            <th className="pb-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Value Magnitude</th>
                            <th className="pb-6 text-right text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Block Reference</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {isTxLoading ? (
                             <tr><td colSpan="4" className="py-10"><Skeleton h="40px" count={3} /></td></tr>
                        ) : globalActivity.length === 0 ? (
                            <tr><td colSpan="4" className="py-10 text-center text-[10px] font-black text-[#555] uppercase tracking-widest">Awaiting platform broadcast...</td></tr>
                        ) : globalActivity.map((tx, i) => (
                            <tr key={i} className="group hover:bg-[#F5A623]/5 transition-all border-l-2 border-transparent hover:border-l-[#F5A623]">
                                <td className="py-6 flex items-center gap-4">
                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.positive ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                                        <iconify-icon icon={tx.icon} className="text-lg"></iconify-icon>
                                     </div>
                                     <span className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">{tx.type}</span>
                                </td>
                                <td className="py-6 font-mono text-xs text-[#8C8C8C]">{shortAddr(tx.user)}</td>
                                <td className={`py-6 text-sm font-black font-cabinet ${tx.positive ? 'text-[#FAFAF8]' : 'text-[#8C8C8C]'}`}>{tx.value}</td>
                                <td className="py-6 text-right font-mono text-[10px] text-[#8C8C8C] group-hover:text-[#F5A623] transition-colors">{tx.hash.slice(0, 10)}...</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </AppShell>
  );
}
