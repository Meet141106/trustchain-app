import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserLoans, updateLoan, updateUser, getUser } from '../lib/supabase';

/* ── tier logic ── */
function getTier(score) {
  if (score >= 90) return 'Platinum';
  if (score >= 75) return 'Gold';
  if (score >= 60) return 'Silver';
  if (score >= 40) return 'Bronze';
  return 'Entry';
}
const TIER_COLORS = { Entry: '#F5A623', Bronze: '#CD7F32', Silver: '#A8A9AD', Gold: '#FFD700', Platinum: '#E5E4E2' };

/* ── mock blockchain repay ── */
async function mockRepayLoan(loanId) {
  await new Promise(r => setTimeout(r, 2000));
  return '0x' + Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
}

/* ── animated score counter ── */
function AnimCount({ from, to, duration = 1.5 }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const steps = 60 * duration;
    const delta = (to - from) / steps;
    let curr = from;
    const t = setInterval(() => {
      curr += delta;
      if ((delta > 0 && curr >= to) || (delta < 0 && curr <= to)) {
        setVal(to); clearInterval(t);
      } else setVal(Math.round(curr));
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [from, to, duration]);
  return <>{val}</>;
}

export default function RepayLoan() {
  const navigate = useNavigate();
  const [params]  = useSearchParams();
  const wallet    = sessionStorage.getItem('tl_wallet') || '';

  const [loan, setLoan]         = useState(null);
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [phase, setPhase]       = useState('idle'); // idle|blockchain|supabase|done|error
  const [error, setError]       = useState('');
  const [newScore, setNewScore] = useState(null);
  const [oldScore, setOldScore] = useState(null);
  const [tierUp, setTierUp]     = useState(false);
  const [txHash, setTxHash]     = useState('');

  /* load active loan + user */
  useEffect(() => {
    if (!wallet) return;
    Promise.all([getUserLoans(wallet), getUser(wallet)]).then(([loans, u]) => {
      const loanId   = params.get('loanId');
      const activeLoan = loanId
        ? loans.find(l => l.id === loanId)
        : loans.find(l => l.loan_status === 'active');
      setLoan(activeLoan ?? null);
      setUser(u);
      setLoading(false);
    });
  }, [wallet]);

  const handleRepay = async () => {
    if (!loan) { setError('No active loan found.'); return; }
    if (phase !== 'idle') return; // prevent double-submit
    setError('');
    try {
      // Phase 1: mock blockchain repayLoan()
      setPhase('blockchain');
      const hash = await mockRepayLoan(loan.id);
      setTxHash(hash);

      // Phase 2: Supabase — mark loan repaid
      setPhase('supabase');
      await updateLoan(loan.id, { loan_status: 'repaid', repaid_at: new Date().toISOString(), tx_hash: hash });

      // Phase 3: Re-fetch FRESH user score to avoid stale-state race condition
      const freshUser = await getUser(wallet);
      const prev      = freshUser?.trust_score ?? 30;
      const gained    = 10;
      const next      = Math.min(prev + gained, 100);
      const prevTier  = getTier(prev);
      const nextTier  = getTier(next);
      await updateUser(wallet, { trust_score: next, tier: nextTier });

      setOldScore(prev);
      setNewScore(next);
      setTierUp(prevTier !== nextTier);
      setPhase('done');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Transaction failed. Please try again.');
      setPhase('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#F5A623" strokeWidth="2.5" strokeDasharray="45 20" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  /* ── SUCCESS screen ── */
  if (phase === 'done') {
    const tier      = getTier(newScore);
    const tierColor = TIER_COLORS[tier];
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <motion.div className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(29,158,117,0.08)' }} animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />

        <div className="w-full max-w-md z-10 space-y-6">
          {/* celebration ring */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            className="flex justify-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#1D9E75] to-[#13C296]
                            flex items-center justify-center shadow-[0_0_50px_rgba(29,158,117,0.35)]">
              <span className="text-5xl">✓</span>
            </div>
          </motion.div>

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1D9E75] mb-2">Loan Repaid</p>
            <h1 className="font-cabinet font-black text-4xl text-[#FAFAF8] tracking-tight">Well Done! 🔥</h1>
            <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed">
              Your repayment is recorded on-chain and your Trust Score has been updated.
            </p>
          </div>

          {/* Score change */}
          <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] mb-5">Trust Score Update</p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-black font-cabinet text-[#8C8C8C]">{oldScore}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] mt-1">Before</p>
              </div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-1">
                <div className="text-[#1D9E75] text-xl">→</div>
                <span className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">+10 pts</span>
              </motion.div>
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                  className="text-4xl font-black font-cabinet"
                  style={{ color: tierColor }}
                >
                  <AnimCount from={oldScore} to={newScore} />
                </motion.p>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#1D9E75] mt-1">After</p>
              </div>
            </div>

            {/* progress bar */}
            <div className="mt-5 h-2 bg-[#1E2A3A] rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: tierColor }}
                initial={{ width: `${oldScore}%` }} animate={{ width: `${newScore}%` }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] font-black text-[#8C8C8C]">0</span>
              <span className="text-[9px] font-black text-[#8C8C8C]">100</span>
            </div>
          </div>

          {/* Tier upgrade badge */}
          {tierUp && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-4 p-5 rounded-2xl border"
              style={{ borderColor: tierColor + '40', background: tierColor + '0D' }}>
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-black font-cabinet text-[#FAFAF8]">Tier Upgrade!</p>
                <p className="text-[10px] font-black uppercase tracking-widest mt-0.5"
                   style={{ color: tierColor }}>You're now {getTier(newScore)} Tier</p>
              </div>
            </motion.div>
          )}

          {/* tx hash */}
          {txHash && (
            <div className="px-4 py-3 rounded-xl bg-[#0A0F1E] border border-[#1E2A3A]">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1">Repayment Tx</p>
              <p className="font-mono text-[10px] text-[#1D9E75] break-all">{txHash}</p>
            </div>
          )}

          <button id="btn-back-dashboard" onClick={() => navigate('/dashboard')}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                       text-black font-black text-[13px] uppercase tracking-widest
                       hover:opacity-90 active:scale-[0.98] transition-all
                       shadow-[0_0_40px_rgba(245,166,35,0.3)]">
            Back to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  /* ── MAIN repay screen ── */
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <motion.div className="fixed bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(245,166,35,0.06)' }} animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity }} />

      <button onClick={() => navigate('/dashboard')}
        className="absolute top-8 left-8 text-[#8C8C8C] text-[11px] font-black uppercase tracking-widest
                   hover:text-[#F5A623] transition-colors">
        ← Dashboard
      </button>

      <div className="w-full max-w-md z-10 space-y-6">
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-3xl p-8 shadow-2xl space-y-7">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A623] mb-2">Repayment</p>
            <h1 className="font-cabinet font-black text-3xl text-[#FAFAF8] tracking-tight">Repay Your Loan</h1>
            <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed">
              Early repayments earn you <strong className="text-[#1D9E75]">+10 Trust Score</strong>{' '}
              and increase your borrow limit.
            </p>
          </div>

          {!loan ? (
            <div className="text-center py-10 text-[#8C8C8C] font-bold">No active loan found.</div>
          ) : (
            <>
              {/* Active loan breakdown */}
              <div className="bg-[#0A0F1E] border border-[#1E2A3A] rounded-2xl p-5 space-y-0">
                {[
                  { l: 'Loan Amount',   v: `$${loan.amount}`,                        c: '#FAFAF8' },
                  { l: 'Status',        v: loan.loan_status.toUpperCase(),            c: '#F59E0B' },
                  { l: 'Due Date',      v: loan.due_date
                      ? new Date(loan.due_date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
                      : '—',                                                            c: '#FAFAF8' },
                  { l: 'Path',          v: loan.path.replace(/_/g,' '),              c: '#FAFAF8' },
                  { l: 'Repay Amount',  v: `$${loan.amount} (0% APR)`,              c: '#1D9E75' },
                ].map(({ l, v, c }, i) => (
                  <div key={i} className="flex justify-between py-3.5 border-b border-[#1E2A3A] last:border-0">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">{l}</span>
                    <span className="font-black text-sm" style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* score gain preview */}
              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-[#1D9E75]/20 bg-[#1D9E75]/5">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-[#FAFAF8] font-black text-sm">On-time repayment bonus</p>
                  <p className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest mt-0.5">
                    +10 Trust Score · Borrow limit increases
                  </p>
                </div>
              </div>

              {/* blockchain flow indicator */}
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                {[
                  { l: 'repayLoan()',  active: phase === 'blockchain', done: phase === 'supabase' || phase === 'done', icon: '⛓️' },
                  { l: 'Supabase',     active: phase === 'supabase',   done: phase === 'done',                         icon: '🗄️' },
                  { l: 'Score +10',    active: false,                  done: phase === 'done',                         icon: '📈' },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    <div className={`flex flex-col items-center gap-1 transition-all duration-500
                      ${s.done ? 'opacity-100' : s.active ? 'opacity-100' : 'opacity-30'}`}>
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm
                        ${s.done ? 'border-[#1D9E75] bg-[#1D9E75]/10'
                                 : s.active ? 'border-[#F5A623] bg-[#F5A623]/10' : 'border-[#1E2A3A]'}`}>
                        {s.active
                          ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/>
                            </svg>
                          : s.icon}
                      </div>
                      <span className={s.done ? 'text-[#1D9E75]' : s.active ? 'text-[#F5A623]' : 'text-[#8C8C8C]'}>
                        {s.l}
                      </span>
                    </div>
                    {i < 2 && (
                      <div className={`flex-1 h-px transition-all duration-500 ${s.done ? 'bg-[#1D9E75]' : 'bg-[#1E2A3A]'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {(phase === 'idle') && (
                  <motion.button key="repay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    id="btn-repay" onClick={handleRepay}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#1D9E75] to-[#13C296]
                               text-white font-black text-[13px] uppercase tracking-widest
                               hover:opacity-90 active:scale-[0.98] transition-all
                               shadow-[0_0_30px_rgba(29,158,117,0.25)]">
                    ⚡ Repay ${loan.amount} Now
                  </motion.button>
                )}

                {['blockchain','supabase'].includes(phase) && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full py-5 rounded-2xl border border-[#1E2A3A] text-center
                               text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">
                    {phase === 'blockchain' ? 'Calling repayLoan() on-chain…' : 'Updating your trust score…'}
                  </motion.div>
                )}

                {phase === 'error' && (
                  <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="py-4 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30
                                    text-center text-[11px] font-black uppercase tracking-widest text-[#EF4444]">
                      {error}
                    </div>
                    <button onClick={() => setPhase('idle')}
                      className="w-full py-4 rounded-2xl border border-[#F5A623]/40 text-[#F5A623]
                                 font-black text-[11px] uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
