import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import { useTrustToken } from '../hooks/useTrustToken';
import { useVouchSystem } from '../hooks/useVouchSystem';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMarketplaceLoans, subscribeToMarketplace } from '../services/supabaseSync';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

const ARCHETYPE_ICONS = {
  'Daily Earner':    { icon: '⚡', color: '#F5A623' },
  'Weekly Earner':   { icon: '📅', color: '#1D9E75' },
  'Seasonal Earner': { icon: '🌱', color: '#627EEA' },
  'Power User':      { icon: '🚀', color: '#D4AF37' },
  'Steady Earner':   { icon: '📊', color: '#8C8C8C' },
};

export default function Marketplace() {
  const { walletAddress: address } = useWallet();
  const navigate = useNavigate();

  // Blockchain data for pool stats and fund action (blockchain stays source of truth for money)
  const { openRequests: chainRequests, fundLoanRequest, poolStats, isLoading: isChainLoading, refresh: refreshChain } = useLendingPool();
  const { trustBalance, isApproved, approvePool } = useTrustToken();
  const { globalActivity, isLoading: isTxLoading } = useTransactionHistory();

  // Supabase marketplace data
  const [supabaseLoans, setSupabaseLoans]   = useState([]);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(true);
  const [useSupabase, setUseSupabase]       = useState(true);

  const [filter, setFilter]     = useState('All');
  const [isFunding, setIsFunding] = useState(null);

  // ── Load Supabase loans + realtime sub ──────────────────────────────────────
  const loadSupabaseLoans = useCallback(async () => {
    try {
      const loans = await fetchMarketplaceLoans();
      setSupabaseLoans(loans);
      setUseSupabase(true);
    } catch {
      setUseSupabase(false);
    } finally {
      setIsSupabaseLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSupabaseLoans();

    // Realtime subscription — loan disappears instantly when funded
    const channel = subscribeToMarketplace((payload) => {
      setSupabaseLoans(prev => {
        if (payload.eventType === 'INSERT') {
          return [payload.new, ...prev];
        }
        if (payload.eventType === 'UPDATE') {
          if (payload.new.status !== 'pending') {
            // Remove from marketplace if no longer pending
            return prev.filter(l => l.id !== payload.new.id);
          }
          return prev.map(l => l.id === payload.new.id ? payload.new : l);
        }
        if (payload.eventType === 'DELETE') {
          return prev.filter(l => l.id !== payload.old.id);
        }
        return prev;
      });
    });

    return () => { channel?.unsubscribe?.(); };
  }, [loadSupabaseLoans]);

  // ── Merge Supabase + blockchain data ─────────────────────────────────────────
  // If Supabase is available: use Supabase list (has ML data), match blockchain IDs
  // If Supabase is down:      fall back to blockchain openRequests
  const displayLoans = useMemo(() => {
    if (!useSupabase || supabaseLoans.length === 0) {
      // Blockchain fallback: normalize into same shape
      return chainRequests.map(r => ({
        id:                   r.id,
        borrower_address:     r.borrower,
        amount:               Number(r.amount),
        apr:                  Number(r.interestRate),
        duration_days:        Number(r.duration),
        ml_trust_score:       null,
        ml_interest_rate:     null,
        repayment_archetype:  null,
        fraud_checked:        false,
        status:               'pending',
        _chainId:             r.id,
        _source:              'blockchain',
      }));
    }
    return supabaseLoans.map(l => ({
      ...l,
      _chainId: l.blockchain_loan_id,
      _source:  'supabase',
    }));
  }, [useSupabase, supabaseLoans, chainRequests]);

  const isLoading = useSupabase ? isSupabaseLoading : isChainLoading;

  const filteredLoans = useMemo(() => {
    if (filter === 'All') return displayLoans;
    if (filter === 'Low Risk') return displayLoans.filter(l => (l.apr ?? l.ml_interest_rate ?? 99) < 6);
    if (filter === 'Vouch-Backed') return displayLoans.filter(l => l.repayment_archetype);
    return displayLoans;
  }, [displayLoans, filter]);

  const totalRequested = displayLoans.reduce((s, l) => s + Number(l.amount || 0), 0);
  const avgScore = displayLoans.length > 0
    ? Math.round(displayLoans.reduce((s, l) => s + (l.ml_trust_score || 68), 0) / displayLoans.length)
    : 0;

  const getTier = (score) => {
    if (score >= 90) return { label: 'PLATINUM', color: '#B4B4B4', border: '#B4B4B4' };
    if (score >= 70) return { label: 'GOLD',     color: '#F5A623', border: '#F5A623' };
    if (score >= 50) return { label: 'SILVER',   color: '#D4AF37', border: '#D4AF37' };
    return            { label: 'BRONZE',  color: '#A36B2B', border: '#A36B2B' };
  };

  const handleFund = async (loan) => {
    if (!address) { toast.error("Please connect your wallet first."); return; }
    if ((loan.borrower_address || loan.borrower)?.toLowerCase() === address.toLowerCase()) {
      toast.error("You cannot fund your own request."); return;
    }
    if (Number(trustBalance) < Number(loan.amount)) {
      toast.error(`Insufficient TRUST. You have ${trustBalance}, need ${loan.amount}.`); return;
    }

    const reqId = loan._chainId || loan.id;
    setIsFunding(loan.id);
    try {
      const approved = await isApproved(loan.amount);
      if (!approved) {
        const ok = await approvePool(loan.amount);
        if (!ok) { setIsFunding(null); return; }
      }
      await fundLoanRequest(reqId, loan._source === 'supabase' ? loan.id : null);
      toast.success(`Loan funded! You'll earn ${((Number(loan.amount) * Number(loan.apr)) / 100).toFixed(1)} TRUST interest.`);
      navigate('/portfolio');
    } catch (err) {
      console.error(err);
    } finally {
      setIsFunding(null);
    }
  };

  // ── Loan Card ─────────────────────────────────────────────────────────────
  const LoanCard = ({ loan }) => {
    const isOwner   = (loan.borrower_address || loan.borrower)?.toLowerCase() === address?.toLowerCase();
    const score     = loan.ml_trust_score || 68;
    const tier      = getTier(score);
    const archetype = loan.repayment_archetype;
    const archetypeInfo = archetype && ARCHETYPE_ICONS[archetype];
    const { stakeForBorrower } = useVouchSystem();
    const [isVouching, setIsVouching] = useState(false);

    const handleVouch = async () => {
      if (!address) { toast.error("Connect wallet to vouch"); return; }
      if (isOwner)  { toast.error("Self-vouching not permitted"); return; }
      setIsVouching(true);
      try {
        const vouchAmount = (Number(loan.amount) / 3).toFixed(1);
        await stakeForBorrower(loan.borrower_address || loan.borrower, vouchAmount);
        toast.success(`You are now backing ${shortAddr(loan.borrower_address || loan.borrower)} for ${vouchAmount} TRUST!`);
      } catch (err) { console.error(err); }
      finally { setIsVouching(false); }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white dark:bg-[#111827] rounded-[24px] border border-[#E8E8E8] dark:border-[#1E2A3A] p-8 relative overflow-hidden transition-all hover:shadow-2xl hover:border-[#F5A623]/30"
        style={{ borderLeft: `6px solid ${tier.border}` }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1E2A3A] flex items-center justify-center text-xs font-black text-[#F5A623] border border-white/5">
              {(loan.borrower_address || loan.borrower || '0x??').slice(2, 4).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-black text-[#FAFAF8] font-mono">{shortAddr(loan.borrower_address || loan.borrower)}</p>
              <div className="flex items-center gap-2 mt-1">
                {loan.fraud_checked && (
                  <span className="flex items-center gap-1 text-[8px] font-black text-[#1D9E75] uppercase tracking-widest">
                    <iconify-icon icon="lucide:shield-check" className="text-xs"></iconify-icon>
                    Verified
                  </span>
                )}
                {loan._source === 'supabase' && (
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-[#8C8C8C]">
                    Node ID: {loan.id?.slice(0, 8)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">{tier.label} TIER</p>
            <p className="text-sm font-black font-cabinet" style={{ color: tier.color }}>
              SCORE: {score}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="flex justify-between items-end mb-6">
          <h4 className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">REQUESTING</h4>
          <p className="text-3xl font-black font-cabinet text-[#FAFAF8]">{Number(loan.amount).toFixed(1)} TRUST</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-[#E8E8E8] dark:border-[#1E2A3A] mb-6">
          <div>
            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Duration</p>
            <p className="text-xs font-black text-[#FAFAF8]">{loan.duration_days || loan.duration} Days</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Interest APR</p>
            <p className="text-xs font-black text-[#1D9E75]">{(loan.apr ?? loan.ml_interest_rate ?? loan.interestRate ?? 7.1).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">ML Trust Score</p>
            <p className="text-xs font-black" style={{ color: tier.color }}>{score}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Archetype</p>
            {archetypeInfo ? (
              <p className="text-[9px] font-black" style={{ color: archetypeInfo.color }}>
                {archetypeInfo.icon} {archetype}
              </p>
            ) : (
              <p className="text-[9px] font-black text-[#8C8C8C]">—</p>
            )}
          </div>
        </div>

        {/* Return projection */}
        <div className="bg-[#1D9E75]/5 p-5 rounded-2xl border border-[#1D9E75]/10 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">
              {isOwner ? 'PROJECTED REPAYMENT' : 'ESTIMATED RETURN'}
            </p>
            <p className="text-lg font-black text-[#1D9E75] font-cabinet">
              {(Number(loan.amount) * (1 + Number(loan.apr ?? 7.1) / 100)).toFixed(1)} TRUST
            </p>
          </div>
        </div>

        {/* Actions */}
        {isOwner ? (
          <div className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:user"></iconify-icon>
              Your Active Request
            </span>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleVouch}
              disabled={isVouching}
              className="flex-1 py-5 border border-[#1D9E75] text-[#1D9E75] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#1D9E75] hover:text-black transition-all"
            >
              Back Peer
            </button>
            <button
              onClick={() => handleFund(loan)}
              disabled={isFunding === loan.id}
              className="flex-[2] py-5 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(245,166,35,0.15)] flex items-center justify-center gap-3"
            >
              {isFunding === loan.id ? (
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
    <AppShell pageTitle="P2P Marketplace" pageSubtitle="Direct Capital Exchange — Real-time">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">

        {/* Source indicator */}
        {!useSupabase && (
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/20 text-[#F5A623] text-[10px] font-black uppercase tracking-widest">
            <iconify-icon icon="lucide:alert-triangle"></iconify-icon>
            Supabase offline — showing on-chain data (real-time updates disabled)
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { l: "Open Requests",   v: isLoading ? '...' : displayLoans.length,                      c: '#F5A623' },
            { l: "Total Requested", v: isLoading ? '...' : `${Number(totalRequested).toLocaleString()} TRUST`, c: '#FAFAF8' },
            { l: "Avg Trust Score", v: isLoading ? '...' : avgScore,                                 c: '#D4AF37' },
            { l: "Average APR",     v: isLoading ? '...' : `${poolStats.avgInterestRate}%`,           c: '#1D9E75' },
          ].map((m, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] p-8 rounded-[20px] border border-[#E8E8E8] dark:border-[#1E2A3A] relative overflow-hidden">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">{m.l}</p>
              <p className="text-2xl font-black font-cabinet" style={{ color: m.c }}>{m.v}</p>
            </div>
          ))}
        </div>

        {/* Header + filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Live Loan Requests</h3>
            <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse inline-block"></span>
              Real-time Supabase updates — loans vanish when funded
            </p>
          </div>
          <div className="flex bg-[#111827] p-1 rounded-xl border border-[#1E2A3A]">
            {['All', 'Low Risk', 'Vouch-Backed'].map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-[#F5A623] text-black shadow-lg' : 'text-[#8C8C8C] hover:text-[#FAFAF8]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Loan grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton h="350px" rounded="24px" />
            <Skeleton h="350px" rounded="24px" />
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="bg-[#111827] border-2 border-dashed border-[#1E2A3A] p-32 rounded-[32px] text-center">
            <div className="w-24 h-24 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
              <iconify-icon icon="lucide:search-x" className="text-4xl text-[#8C8C8C]"></iconify-icon>
            </div>
            <h4 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tight mb-3">No Open Requests</h4>
            <p className="text-sm text-[#8C8C8C] max-w-sm mx-auto leading-relaxed mb-10">
              All active requests have been funded. Check back later or submit your own.
            </p>
            <button onClick={() => navigate('/borrow')}
              className="px-10 py-4 border border-[#F5A623] text-[#F5A623] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-[#F5A623] hover:text-black transition-all">
              Submit a Request
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredLoans.map(loan => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Lender CTA */}
        <div className="bg-[#1D9E75]/5 border border-[#1D9E75]/10 p-12 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <iconify-icon icon="lucide:shield-check" className="text-3xl text-[#1D9E75]"></iconify-icon>
              <h4 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Your Lending Position</h4>
            </div>
            <p className="text-sm text-[#8C8C8C] leading-relaxed max-w-lg">Track funded loans, monitor borrower health, and collect accrued interest directly to your wallet.</p>
          </div>
          <button onClick={() => navigate('/portfolio')} className="px-10 py-5 bg-[#1D9E75] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
            My Portfolio
          </button>
        </div>

        {/* Live Activity */}
        <div className="bg-white dark:bg-[#111827] border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-[32px] p-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Live Platform Activity</h4>
              <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-[0.2em] mt-1">Real-time ledger of protocol-wide credit events</p>
            </div>
            <button onClick={() => navigate('/ledger')} className="text-[10px] font-black text-[#F5A623] border border-[#F5A623]/30 px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
              Full Ledger
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-white/5">
                <tr>
                  {['Transaction Type', 'Originating Node', 'Value Magnitude', 'Block Reference'].map((h, i) => (
                    <th key={h} className={`pb-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                  ))}
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
                    <td className="py-6 text-right font-mono text-[10px] text-[#8C8C8C] group-hover:text-[#F5A623] transition-colors">
                      {tx.hash ? `${tx.hash.slice(0, 10)}...` : '—'}
                    </td>
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
