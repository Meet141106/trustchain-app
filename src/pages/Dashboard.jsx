import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { getUser, getUserLoans, getTier, TIER_COLORS, TIER_LIMITS } from '../lib/supabase';


/* ── small helpers ── */
const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';
const daysLeft  = (due) => {
  if (!due) return '—';
  const d = Math.ceil((new Date(due) - Date.now()) / 86400000);
  return d > 0 ? `${d} days` : 'Overdue';
};

/* ── stat card ── */
function StatCard({ label, value, sub, subColor = '#8C8C8C', accent = false, children }) {
  return (
    <div className={`bg-white dark:bg-[#111827] p-8 rounded-[12px] border
      ${accent ? 'border-[#F5A623]/40' : 'border-[#E8E8E8] dark:border-[#1E2A3A]'}
      flex flex-col justify-center group transition-all hover:border-[#F5A623]/50`}>
      {children}
      {label && <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">{label}</p>}
      {value && <h3 className="text-4xl font-black tracking-tighter text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet">{value}</h3>}
      {sub   && <p className="text-[10px] font-bold mt-2 uppercase tracking-widest" style={{ color: subColor }}>{sub}</p>}
    </div>
  );
}

/* ── loan health bar ── */
function LoanHealthBar({ loan }) {
  const total = loan.amount;
  const due   = new Date(loan.due_date);
  const now   = Date.now();
  const start = new Date(loan.created_at);
  const pct   = Math.min(100, Math.max(0, ((now - start) / (due - start)) * 100));
  const urgency = pct < 50 ? '#1D9E75' : pct < 80 ? '#F59E0B' : '#EF4444';

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-[#8C8C8C]">Time Elapsed</span>
        <span style={{ color: urgency }}>{Math.round(pct)}% of term used</span>
      </div>
      <div className="h-2 w-full bg-[#1E2A3A] rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: urgency }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1 }} />
      </div>
      <div className="flex justify-between text-[9px] text-[#8C8C8C] font-bold">
        <span>Borrowed</span>
        <span>Due in {daysLeft(loan.due_date)}</span>
      </div>
    </div>
  );
}

/* ── vouch row ── */
const MOCK_VOUCHERS = [
  { name: 'Arnab G.',  score: 82, status: 'Active Voucher',      color: '#1D9E75' },
  { name: 'Megha S.',  score: 71, status: 'Active Voucher',      color: '#1D9E75' },
  { name: 'Priya K.',  score: 0,  status: 'Pending Verification', color: '#F59E0B' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const wallet   = sessionStorage.getItem('tl_wallet') || '';

  const [user,   setUser]   = useState(null);
  const [loans,  setLoans]  = useState([]);
  const [loading, setLoading] = useState(true);

  /* fetch live data */
  useEffect(() => {
    if (!wallet) { setLoading(false); return; }
    Promise.all([getUser(wallet), getUserLoans(wallet)]).then(([u, ls]) => {
      setUser(u);
      setLoans(ls ?? []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [wallet]);

  if (loading) {
    return (
      <AppShell pageTitle="Dashboard" pageSubtitle="Loading…">
        <div className="flex items-center justify-center h-64">
          <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#F5A623" strokeWidth="2.5" strokeDasharray="45 20" strokeLinecap="round" />
          </svg>
        </div>
      </AppShell>
    );
  }

  /* derived state */
  const score      = user?.trust_score ?? 30;
  const tier       = getTier(score);
  const tierColor  = TIER_COLORS[tier];
  const limit      = TIER_LIMITS[tier];
  const activeLoan = loans.find(l => l.loan_status === 'active');
  const hasLoan    = !!activeLoan;
  const isNewUser  = !user;

  return (
    <AppShell pageTitle={user?.display_name ? `Welcome back, ${user.display_name.split(' ')[0]}` : 'Dashboard'}
              pageSubtitle={user?.uid ? `${user.uid} · ${shortAddr(wallet)}` : 'Your loans and trust score, live'}>
      <div className="max-w-7xl mx-auto space-y-10 pb-24">

        {/* ── TOP ROW: stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Trust Score ring */}
          <StatCard>
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.8" fill="transparent" stroke="#1E2A3A" strokeWidth="3" />
                  <motion.circle cx="18" cy="18" r="15.8" fill="transparent" strokeWidth="3"
                    style={{ stroke: tierColor }}
                    strokeDasharray={`${score} 100`}
                    initial={{ strokeDasharray: '0 100' }}
                    animate={{ strokeDasharray: `${score} 100` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8]">{score}</span>
                  <span className="text-[10px] text-[#8C8C8C] font-black uppercase tracking-widest mt-1">/ 100</span>
                </div>
              </div>
              <div className="text-center mt-4">
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                  style={{ color: tierColor, borderColor: tierColor + '40', background: tierColor + '15' }}>
                  {tier} Tier
                </span>
                <p className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-widest mt-2">
                  {score < 40 ? `${40 - score} pts to Bronze` : score < 60 ? `${60 - score} pts to Silver` : 'Elite status'}
                </p>
              </div>
            </div>
          </StatCard>

          {/* Borrow Limit */}
          <StatCard label="Borrow Limit"
            value={`$${limit.toLocaleString()}.00`}
            sub={score >= 40 ? `You're at ${tier} level — repay to grow` : 'Repay loans to increase your limit'}
            subColor={score >= 40 ? '#1D9E75' : '#F5A623'} />

          {/* Active Loan / Empty */}
          {hasLoan ? (
            <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#F59E0B]/40
                            flex flex-col justify-center group transition-all">
              <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">Active Loan</p>
              <h3 className="text-4xl font-black tracking-tighter text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet mb-4">
                ${activeLoan.amount}
              </h3>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <p className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest">
                  Due in {daysLeft(activeLoan.due_date)}
                </p>
              </div>
              <button id="btn-repay-now" onClick={() => navigate(`/repay?loanId=${activeLoan.id}`)}
                className="w-full py-3 rounded-xl bg-[#1D9E75] text-white text-[11px] font-black
                           uppercase tracking-widest hover:bg-[#13C296] transition-all active:scale-[0.98]">
                ⚡ Repay Now
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]
                            flex flex-col justify-center items-center text-center group transition-all hover:border-[#F5A623]/40">
              <div className="text-4xl mb-4">💸</div>
              <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">No Active Loan</p>
              <p className="text-[#8C8C8C] text-xs mb-6 leading-relaxed">Your $10 credit line is ready.</p>
              <button id="btn-get-first-loan" onClick={() => navigate('/loan-flow')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                           text-black text-[11px] font-black uppercase tracking-widest
                           hover:opacity-90 active:scale-[0.98] transition-all
                           shadow-[0_0_20px_rgba(245,166,35,0.25)]">
                Get My First Loan →
              </button>
            </div>
          )}
        </div>

        {/* ── ACTIVE LOAN HEALTH (only if loan exists) ── */}
        <AnimatePresence>
          {hasLoan && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#F59E0B]/20 dark:border-[#F59E0B]/20">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">
                  Your Active Loan
                </h4>
                <span className="px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20
                                 text-[9px] font-black uppercase text-[#F59E0B] tracking-widest">
                  Active
                </span>
              </div>
              <div className="space-y-8">
                <LoanHealthBar loan={activeLoan} />
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { l: 'Borrowed',  v: `$${activeLoan.amount}`,           c: '#FAFAF8' },
                    { l: 'Repay',     v: `$${activeLoan.amount}`,           c: '#1D9E75' },
                    { l: 'Loan Path', v: activeLoan.path,                   c: '#F5A623' },
                  ].map(({ l, v, c }, i) => (
                    <div key={i} className="text-center p-4 bg-[#FAFAF8] dark:bg-[#0A0F1E] rounded-xl border border-[#E8E8E8] dark:border-[#1E2A3A]">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] mb-2">{l}</p>
                      <p className="font-black font-cabinet text-lg capitalize" style={{ color: c }}>{v}</p>
                    </div>
                  ))}
                </div>
                <button id="btn-health-repay" onClick={() => navigate(`/repay?loanId=${activeLoan.id}`)}
                  className="w-full py-4 rounded-xl bg-[#1D9E75] text-white font-black text-[12px]
                             uppercase tracking-widest hover:bg-[#13C296] transition-all active:scale-[0.98]
                             shadow-[0_0_25px_rgba(29,158,117,0.2)]">
                  Repay Loan — Earn +10 Trust Score
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MIDDLE ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vouch Network Health */}
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] mb-8 uppercase tracking-widest">
              Vouch Network
            </h4>
            <div className="space-y-4 mb-8">
              {MOCK_VOUCHERS.map((node, i) => (
                <div key={i} className="flex items-center justify-between bg-[#FAFAF8]/50 dark:bg-[#0A0F1E]/50 p-3 rounded-lg border border-[#E8E8E8]/50 dark:border-[#1E2A3A]/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#F5A623]/20 flex items-center justify-center text-[10px] font-bold text-[#F5A623]">
                      {node.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1A1A1A] dark:text-[#FAFAF8]">{node.name}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: node.color }}>{node.status}</p>
                    </div>
                  </div>
                  {node.score > 0 && <span className="text-[11px] font-black text-[#F5A623] font-mono">{node.score}/100</span>}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => navigate('/invite-vouch')}
                id="btn-invite-voucher"
                className="flex-1 py-4 rounded-[8px] bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                           text-black text-[10px] font-black uppercase tracking-widest
                           hover:opacity-90 active:scale-[0.98] transition-all">
                + Invite Voucher
              </button>
              <button onClick={() => navigate('/network')}
                className="flex-1 py-4 border border-[#F5A623] text-[#F5A623] rounded-[8px]
                           text-[10px] font-black uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
                View Network
              </button>
            </div>
          </div>

          {/* Repayment Rhythm / Empty State */}
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">
                Loan History
              </h4>
              {loans.filter(l => l.loan_status === 'repaid').length > 0
                ? <span className="px-3 py-1 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[9px] font-black uppercase text-[#1D9E75] tracking-widest">
                    {loans.filter(l => l.loan_status === 'repaid').length} Repaid
                  </span>
                : <span className="px-3 py-1 rounded-full bg-[#8C8C8C]/10 border border-[#8C8C8C]/20 text-[9px] font-black uppercase text-[#8C8C8C] tracking-widest">
                    No History Yet
                  </span>
              }
            </div>

            {loans.length === 0 ? (
              /* empty state */
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="text-5xl mb-4">📊</div>
                <p className="text-[#8C8C8C] text-sm font-bold mb-2">No loan history yet</p>
                <p className="text-[#8C8C8C] text-xs leading-relaxed">
                  Take your first loan to start building repayment history and earn Trust Score.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {loans.slice(0, 3).map((l, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">${l.amount} Loan</p>
                      <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-0.5">
                        {new Date(l.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                      ${l.loan_status === 'repaid' ? 'bg-[#1D9E75]/10 text-[#1D9E75]'
                        : l.loan_status === 'active' ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                        : 'bg-[#8C8C8C]/10 text-[#8C8C8C]'}`}>
                      {l.loan_status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── EMPTY DASHBOARD CTA (no loan ever) ── */}
        {loans.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-[#F5A623]/8 to-[#D4AF37]/5 border border-[#F5A623]/25
                       rounded-[12px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A623] mb-2">🔥 First Move</p>
              <h3 className="font-cabinet font-black text-2xl text-[#1A1A1A] dark:text-[#FAFAF8] tracking-tight mb-2">
                Get Your First $10 Loan
              </h3>
              <p className="text-[#8C8C8C] text-sm leading-relaxed max-w-md">
                No collateral required at Entry tier. Repay on time to earn +10 Trust Score and unlock higher limits.
              </p>
            </div>
            <button id="btn-cta-first-loan" onClick={() => navigate('/loan-flow')}
              className="flex-shrink-0 px-10 py-4 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                         text-black font-black text-[13px] uppercase tracking-widest
                         hover:opacity-90 active:scale-[0.98] transition-all
                         shadow-[0_0_30px_rgba(245,166,35,0.3)] whitespace-nowrap">
              Get My First Loan →
            </button>
          </motion.div>
        )}

        {/* ── RECENT ACTIVITY ── */}
        {loans.length > 0 && (
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest mb-8">
              Recent Transactions
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#E8E8E8] dark:border-[#1E2A3A]">
                  <tr>
                    {['Transaction', 'Amount', 'Date', 'Status', 'Tx Hash'].map(h => (
                      <th key={h} className="pb-5 text-left text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2A3A]">
                  {loans.map((l, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-all duration-300">
                      <td className="py-5 text-sm font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">
                        {l.loan_status === 'repaid' ? 'Loan Repaid' : 'Loan Taken'}
                      </td>
                      <td className={`py-5 font-mono font-black text-sm ${l.loan_status === 'repaid' ? 'text-[#1D9E75]' : 'text-[#EF4444]'}`}>
                        {l.loan_status === 'repaid' ? '+' : '-'}${l.amount}
                      </td>
                      <td className="py-5 text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">
                        {new Date(l.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-5">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                          ${l.loan_status === 'repaid' ? 'bg-[#1D9E75]/10 text-[#1D9E75]'
                            : l.loan_status === 'active' ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                            : 'bg-[#8C8C8C]/10 text-[#8C8C8C]'}`}>
                          {l.loan_status}
                        </span>
                      </td>
                      <td className="py-5">
                        {l.tx_hash
                          ? <span className="font-mono text-[10px] text-[#8C8C8C]">{l.tx_hash.slice(0, 8)}…</span>
                          : <span className="text-[#8C8C8C] text-[10px]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
