import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../context/WalletContext';
import { useReputationNFT } from '../hooks/useReputationNFT';
import { useLendingPool } from '../hooks/useLendingPool';
import { useVouchSystem } from '../hooks/useVouchSystem';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { getTier, TIER_COLORS } from '../utils/constants';
import Skeleton from '../components/Skeleton';
import { fetchUserProfile } from '../services/supabaseSync';
import { getTrustScore as getMLTrustScore } from '../services/mlApi';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';
const daysLeft = (due, t) => {
  if (!due) return '—';
  const d = Math.ceil((due - Date.now()) / 86400000);
  return d > 0 ? `${d} ${t('dashboard.days')}` : t('dashboard.overdue');
};

function StatCard({ label, value, sub, subColor = '#8C8C8C', accent = false, children }) {
  return (
    <div className={`bg-white dark:bg-[#111827] p-8 rounded-[24px] border transition-all hover:border-[#F5A623]/50
      ${accent ? 'border-[#F5A623]/40 shadow-[0_0_30px_rgba(245,166,35,0.05)]' : 'border-[#E8E8E8] dark:border-[#1E2A3A]'}`}>
      {children}
      {label && <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">{label}</p>}
      {value !== undefined && <h3 className="text-3xl font-black tracking-tighter text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet">{value}</h3>}
      {sub && <p className="text-[10px] font-bold mt-2 uppercase tracking-widest" style={{ color: subColor }}>{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { walletAddress: address } = useWallet();

  const { trustScore, isLoading: isRepLoading } = useReputationNFT();
  const { borrowLimit, userLoan, pendingRequest, isRequestPending, poolStats, isLoading: isPoolLoading } = useLendingPool();
  const { vouches, isLoading: isVouchLoading } = useVouchSystem();
  const { transactions, isLoading: isTxLoading } = useTransactionHistory();

  const score = Number(trustScore);
  const isInitialized = score >= 30;
  const tierName = getTier(isInitialized ? score : 30);
  const tierColor = TIER_COLORS[tierName];
  const hasLoan = !!userLoan && userLoan?.amount > 0;

  // ── Supabase + ML enrichment ─────────────────────────────────────────────
  const [supabaseUser, setSupabaseUser]   = useState(null);
  const [mlScore, setMlScore]             = useState(null);
  const [archetype, setArchetype]         = useState(null);

  useEffect(() => {
    if (!address) return;
    // 1. Load Supabase profile (has cached ml_trust_score + repayment_archetype)
    fetchUserProfile(address).then(u => {
      if (u) {
        setSupabaseUser(u);
        if (u.ml_trust_score)      setMlScore(u.ml_trust_score);
        if (u.repayment_archetype) setArchetype(u.repayment_archetype);
      }
    }).catch(()=>{});

    // 2. Call ML API for fresh score (non-blocking)
    getMLTrustScore({
      repayment_history:      0.7,
      repayment_speed:        0.8,
      voucher_quality:        0.6,
      loan_to_repayment_ratio:1.0,
      vouch_network_balance:  0.5,
      transaction_frequency:  12,
    }).then(res => {
      if (res?.trust_score) setMlScore(res.trust_score);
    }).catch(()=>{});
  }, [address]);
  
  const handleInitialize = async () => {
    const { initializeOnChainScore, parseBlockchainError } = await import('../lib/blockchain');
    const toast = (await import('react-hot-toast')).default;
    const id = toast.loading("Initializing on-chain identity...");
    try {
      await initializeOnChainScore();
      toast.success("Identity initialized! Starting trust score: 30.", { id });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(parseBlockchainError(err), { id });
    }
  };

  return (
    <AppShell pageTitle="System Dashboard" pageSubtitle={address ? shortAddr(address) : "Unconnected Node"}>
      <div className="max-w-7xl mx-auto space-y-12 pb-24">

        {/* ── TOP ROW ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatCard>
            {isRepLoading ? <Skeleton h="140px" /> : (
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="15.8" fill="transparent" stroke="#1E2A3A" strokeWidth="3" />
                      <motion.circle cx="18" cy="18" r="15.8" fill="transparent" strokeWidth="3"
                        style={{ stroke: isInitialized ? tierColor : '#8C8C8C' }}
                        strokeDasharray={`${isInitialized ? score : 0} 100`}
                        initial={{ strokeDasharray: '0 100' }}
                        animate={{ strokeDasharray: `${isInitialized ? score : 0} 100` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black font-cabinet text-[#FAFAF8]">{isInitialized ? score : '—'}</span>
                      <span className="text-[9px] text-[#8C8C8C] font-black uppercase tracking-widest mt-1">On-chain</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[9px] font-black uppercase tracking-widest" style={{ color: tierColor }}>{tierName} TIER</p>
                  {/* ML Score badge */}
                  {mlScore !== null && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/20">
                      <iconify-icon icon="lucide:brain-circuit" className="text-sm text-[#1D9E75]"></iconify-icon>
                      <span className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">ML: {mlScore}</span>
                    </div>
                  )}
                  {/* Repayment archetype badge */}
                  {archetype && (
                    <div className="mt-2 px-3 py-1.5 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20">
                      <span className="text-[9px] font-black text-[#F5A623] uppercase tracking-widest">{archetype}</span>
                    </div>
                  )}
                </div>
            )}
          </StatCard>

          <StatCard label="Direct Limit"
            value={isInitialized ? `$${Number(borrowLimit).toLocaleString()}` : '$0'}
            sub={isInitialized ? "Authorized Protocol Risk" : "Initialize ID to unlock"}
            subColor={isInitialized ? '#1D9E75' : '#8C8C8C'} />

          <StatCard label="Marketplace Action"
            value={poolStats.openRequests}
            sub="Live Requests Waiting"
            subColor="#F5A623" />

          {/* Dynamic Action Card */}
          {hasLoan ? (
             <div className="bg-[#111827] border border-[#1D9E75]/30 p-8 rounded-[24px] flex flex-col justify-between shadow-[0_0_30px_rgba(29,158,117,0.1)]">
                <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">Active Loan</p>
                    <h3 className="text-3xl font-black font-cabinet text-[#FAFAF8]">{userLoan.amount} TRUST</h3>
                </div>
                <div className="mt-6 space-y-4">
                    <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">On Track — Due {daysLeft(userLoan.dueDate, t)}</p>
                    <button onClick={() => navigate('/repay')} className="w-full py-4 bg-[#1D9E75] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">Settle Debt</button>
                </div>
             </div>
          ) : isRequestPending ? (
             <div className="bg-[#111827] border border-[#F5A623]/30 p-8 rounded-[24px] flex flex-col justify-between shadow-[0_0_30px_rgba(245,166,35,0.1)]">
                <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">Pending Request</p>
                    <h3 className="text-3xl font-black font-cabinet text-[#FAFAF8]">{pendingRequest.amount} TRUST</h3>
                </div>
                <div className="mt-6 space-y-4">
                    <p className="text-[9px] font-black text-[#F5A623] uppercase tracking-widest">Live in Marketplace</p>
                    <button onClick={() => navigate('/request-pending')} className="w-full py-4 bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">View Status</button>
                </div>
             </div>
          ) : (
             <div className="bg-[#111827] border border-[#1E2A3A] p-8 rounded-[24px] flex flex-col items-center justify-center text-center group hover:border-[#D4AF37]/40 transition-all">
                <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">💸</div>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">No Active Position</p>
                {isInitialized ? (
                    <button onClick={() => navigate('/borrow')} className="w-full mt-4 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#F5A623] transition-all">Submit Request →</button>
                ) : (
                    <button onClick={handleInitialize} className="w-full mt-4 py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Initialize ID</button>
                )}
             </div>
          )}
        </div>

        {/* ── MIDDLE ROW: P2P Interaction ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <iconify-icon icon="lucide:shopping-bag" className="text-3xl text-[#1D9E75]"></iconify-icon>
                        <h4 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Marketplace Opportunity</h4>
                    </div>
                    <p className="text-sm text-[#8C8C8C] leading-relaxed">There are currently <span className="text-[#FAFAF8] font-black">{poolStats.openRequests} open requests</span> at an average of <span className="text-[#1D9E75] font-black">{poolStats.avgInterestRate}% APR</span>. Start funding peers to grow your capital.</p>
                    <button onClick={() => navigate('/marketplace')} className="px-10 py-4 bg-[#1D9E75] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">Open Marketplace →</button>
                </div>
                <div className="w-full md:w-64 aspect-square bg-[#0A0B14] rounded-3xl border border-[#1E2A3A] p-6 flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[#1D9E75]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Protocol Staking</p>
                    <div className="text-center">
                        <p className="text-5xl font-black font-cabinet text-[#FAFAF8]">{poolStats.avgInterestRate}%</p>
                        <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest mt-2">Target Yield</p>
                    </div>
                    <div className="w-full h-1 bg-[#1E2A3A] rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-[#1D9E75]"></div>
                    </div>
                </div>
            </div>

            <div className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-10">
                <h4 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-8">Syndicate Mesh</h4>
                <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                        <p className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-widest">{vouches.length} Social Backers</p>
                        <span className="text-[10px] text-[#1D9E75] font-black">Verified</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => navigate('/invite-vouch')} className="flex-1 py-4 bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-[#FAFAF8] rounded-xl hover:bg-white/10 transition-all">+ Invite</button>
                    <button onClick={() => navigate('/network')} className="flex-1 py-4 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4AF37]/10 transition-all">Graph</button>
                </div>
            </div>
        </div>

        {/* ── LOWER ROW: Ledger ── */}
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-10">
            <div className="flex justify-between items-center mb-10">
                <h4 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Recent Ledger Activity</h4>
                <button onClick={() => navigate('/ledger')} className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest hover:text-[#FAFAF8] transition-all">View All Activity →</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/5 pb-4">
                        <tr>
                            <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Event</th>
                            <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Impact</th>
                            <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Status</th>
                            <th className="pb-4 text-right text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Hash</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions.length === 0 ? (
                            <tr><td colSpan="4" className="py-10 text-center text-[10px] font-black text-[#555] uppercase tracking-widest">No protocol activity detected</td></tr>
                        ) : transactions.slice(0, 4).map((tx, i) => (
                            <tr key={i} className="group hover:bg-white/5 transition-all">
                                <td className="py-5 text-sm font-black text-[#FAFAF8]">{tx.type}</td>
                                <td className={`py-5 text-sm font-black font-cabinet ${tx.positive ? 'text-[#1D9E75]' : 'text-[#EF4444]'}`}>{tx.value}</td>
                                <td className="py-5">
                                    <span className="px-3 py-1 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] text-[9px] font-black uppercase tracking-widest">{tx.status}</span>
                                </td>
                                <td className="py-5 text-right font-mono text-[10px] text-[#8C8C8C]">{tx.hash ? `${tx.hash.slice(0, 8)}...` : '0x...'}</td>
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
