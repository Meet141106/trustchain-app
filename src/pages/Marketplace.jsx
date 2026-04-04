import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { getPendingLoans, fundLoan, getLenderPositions, TIER_COLORS, getTier } from '../lib/supabase';

/* ── mock blockchain fund tx ── */
async function mockFundLoan(amount) {
  await new Promise(r => setTimeout(r, 2200));
  return '0x' + Array.from({ length: 40 }, () =>
    '0123456789abcdef'[Math.floor(Math.random() * 16)]
  ).join('');
}

const MOCK_APY = { Entry: 14.5, Bronze: 12.0, Silver: 9.5, Gold: 7.0, Platinum: 5.5 };

/* ── Loan card ── */
function LoanCard({ loan, onFund }) {
  const tier       = loan.users?.tier ?? 'Entry';
  const score      = loan.users?.trust_score ?? 30;
  const tierColor  = TIER_COLORS[tier] ?? '#F5A623';
  const apy        = MOCK_APY[tier] ?? 14.5;
  const name       = loan.users?.display_name ?? 'Anonymous';
  const uid        = loan.users?.uid ?? '—';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111827] rounded-2xl border border-[#E8E8E8] dark:border-[#1E2A3A]
                 p-6 hover:border-[#F5A623]/40 dark:hover:border-[#F5A623]/40 transition-all group overflow-hidden relative">
      {/* tier badge */}
      <div className="absolute top-4 right-4">
        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border"
          style={{ color: tierColor, borderColor: tierColor + '40', background: tierColor + '12' }}>
          {tier}
        </span>
      </div>

      {/* borrower info */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center
                        font-black text-sm font-cabinet"
          style={{ borderColor: tierColor, color: tierColor, background: tierColor + '12' }}>
          {name[0]}
        </div>
        <div>
          <p className="font-black text-sm text-[#1A1A1A] dark:text-[#FAFAF8]">{name}</p>
          <p className="font-mono text-[9px] text-[#8C8C8C]">{uid}</p>
        </div>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { l: 'Requesting', v: `$${loan.amount}`,     c: '#FAFAF8' },
          { l: 'Trust Score', v: score,                 c: tierColor  },
          { l: 'Lender APY',  v: `${apy}%`,            c: '#1D9E75'  },
        ].map(({ l, v, c }, i) => (
          <div key={i} className="text-center p-3 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <p className="text-[8px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1">{l}</p>
            <p className="font-black font-cabinet text-base" style={{ color: c }}>{v}</p>
          </div>
        ))}
      </div>

      {/* trust bar */}
      <div className="mb-5">
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1.5">
          <span>Trust Score</span><span style={{ color: tierColor }}>{score}/100</span>
        </div>
        <div className="h-1.5 bg-[#E8E8E8] dark:bg-[#1E2A3A] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${score}%`, background: tierColor }} />
        </div>
      </div>

      {/* path */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C]">Path:</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#F5A623] capitalize">{loan.path}</span>
        <span className="ml-auto text-[9px] font-black text-[#8C8C8C]">30-day term</span>
      </div>

      <button
        id={`btn-fund-loan-${loan.id}`}
        onClick={() => onFund(loan, apy)}
        className="w-full py-3.5 rounded-xl border border-[#1D9E75] text-[#1D9E75]
                   font-black text-[10px] uppercase tracking-widest
                   hover:bg-[#1D9E75] hover:text-white transition-all active:scale-[0.98]">
        ⚡ Fund This Loan
      </button>
    </motion.div>
  );
}

/* ── Fund modal/panel ── */
function FundModal({ loan, apy, wallet, onClose, onSuccess }) {
  const [phase, setPhase] = useState('idle');
  const [error, setError] = useState('');
  const name = loan.users?.display_name ?? 'Anonymous';

  const confirm = async () => {
    try {
      setPhase('blockchain');
      const hash = await mockFundLoan(loan.amount);
      setPhase('supabase');
      const position = await fundLoan({
        lenderWallet:  wallet,
        loanId:        loan.id,
        fundedAmount:  loan.amount,
        apy,
        txHash:        hash,
      });
      setPhase('done');
      setTimeout(() => onSuccess(position, hash), 600);
    } catch (err) {
      setError(err.message.includes('unique') ? 'You already funded this loan' : err.message);
      setPhase('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111827] border border-[#1E2A3A] rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1D9E75] mb-2">Confirm Funding</p>
          <h2 className="font-cabinet font-black text-2xl text-[#FAFAF8] tracking-tight">
            Fund {name}'s Loan
          </h2>
        </div>

        <div className="bg-[#0A0F1E] border border-[#1E2A3A] rounded-xl p-5 space-y-0">
          {[
            { l: 'Amount to Fund',  v: `$${loan.amount}`,     c: '#F5A623' },
            { l: 'Your APY',        v: `${apy}%`,             c: '#1D9E75' },
            { l: 'Term',            v: '30 days',             c: '#FAFAF8' },
            { l: 'Expected Return', v: `$${(loan.amount * (1 + apy / 100 / 12)).toFixed(2)}`, c: '#1D9E75' },
          ].map(({ l, v, c }, i) => (
            <div key={i} className="flex justify-between py-3 border-b border-[#1E2A3A] last:border-0">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">{l}</span>
              <span className="font-black text-sm" style={{ color: c }}>{v}</span>
            </div>
          ))}
        </div>

        {/* blockchain flow */}
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
          {[
            { l: 'Transfer',   active: phase === 'blockchain', done: ['supabase', 'done'].includes(phase), icon: '⛓️' },
            { l: 'Portfolio',  active: phase === 'supabase',   done: phase === 'done',                      icon: '🗄️' },
            { l: 'Live',       active: false,                  done: phase === 'done',                      icon: '✅' },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <div className={`flex flex-col items-center gap-1 transition-all ${s.done || s.active ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm
                  ${s.done ? 'border-[#1D9E75] bg-[#1D9E75]/10'
                           : s.active ? 'border-[#F5A623] bg-[#F5A623]/10' : 'border-[#1E2A3A]'}`}>
                  {s.active
                    ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" />
                      </svg>
                    : s.icon}
                </div>
                <span className={s.done ? 'text-[#1D9E75]' : s.active ? 'text-[#F5A623]' : 'text-[#8C8C8C]'}>{s.l}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-px ${s.done ? 'bg-[#1D9E75]' : 'bg-[#1E2A3A]'} transition-all`} />}
            </React.Fragment>
          ))}
        </div>

        {error && (
          <p className="text-[11px] font-black text-[#EF4444] uppercase tracking-widest text-center">{error}</p>
        )}

        <div className="flex gap-3">
          {phase === 'idle' && (
            <>
              <button onClick={onClose}
                className="flex-1 py-4 rounded-xl border border-[#1E2A3A] text-[#8C8C8C]
                           font-black text-[11px] uppercase tracking-widest hover:border-[#EF4444]/40 hover:text-[#EF4444] transition-all">
                Cancel
              </button>
              <button id="btn-confirm-fund" onClick={confirm}
                className="flex-2 flex-1 py-4 rounded-xl bg-[#1D9E75] text-white
                           font-black text-[11px] uppercase tracking-widest
                           hover:bg-[#13C296] active:scale-[0.98] transition-all">
                ⚡ Confirm Fund
              </button>
            </>
          )}
          {['blockchain', 'supabase'].includes(phase) && (
            <div className="w-full py-4 rounded-xl border border-[#1E2A3A] text-center
                            text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">
              {phase === 'blockchain' ? 'Transferring funds on-chain…' : 'Updating your portfolio…'}
            </div>
          )}
          {phase === 'done' && (
            <div className="w-full py-4 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/30
                            text-center text-[11px] font-black uppercase tracking-widest text-[#1D9E75]">
              ✓ Funded — redirecting…
            </div>
          )}
          {phase === 'error' && (
            <button onClick={() => setPhase('idle')}
              className="w-full py-4 rounded-xl border border-[#F5A623]/40 text-[#F5A623]
                         font-black text-[11px] uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
              Try Again
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════ MAIN ════════════ */
export default function Marketplace() {
  const navigate  = useNavigate();
  const wallet    = sessionStorage.getItem('tl_wallet') || '';

  const [pendingLoans, setPendingLoans] = useState([]);
  const [positions,    setPositions]    = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [tab,          setTab]          = useState('live');   // live|portfolio
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedApy,  setSelectedApy]  = useState(0);
  const [successMsg,   setSuccessMsg]   = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([
      getPendingLoans(),
      wallet ? getLenderPositions(wallet) : Promise.resolve([]),
    ]).then(([pl, pos]) => {
      setPendingLoans(pl);
      setPositions(pos);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, [wallet]);

  const onFundSuccess = (position, hash) => {
    setSelectedLoan(null);
    setSuccessMsg(`Funded! Tx: ${hash.slice(0, 12)}…`);
    setTimeout(() => setSuccessMsg(''), 4000);
    loadData();
  };

  const totalDeployed = positions.reduce((s, p) => s + parseFloat(p.funded_amount), 0);
  const activePositions = positions.filter(p => p.status === 'active');
  const repaidPositions = positions.filter(p => p.status === 'repaid');

  return (
    <AppShell pageTitle="Marketplace" pageSubtitle="Fund loans, earn yield">
      {selectedLoan && (
        <FundModal
          loan={selectedLoan} apy={selectedApy} wallet={wallet}
          onClose={() => setSelectedLoan(null)}
          onSuccess={onFundSuccess}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-10 pb-24">

        {/* success toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 bg-[#1D9E75] text-white px-6 py-4 rounded-2xl
                         font-black text-[11px] uppercase tracking-widest shadow-xl">
              ✓ {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { l: 'Total Funds',       v: '$1.2M+',    c: '#1D9E75' },
            { l: 'Open Loan Requests', v: loading ? '…' : pendingLoans.length, c: '#F5A623' },
            { l: 'Average Return',    v: '10.5%',     c: '#F5A623' },
            { l: 'Default Rate',      v: '0.12%',     c: '#1D9E75' },
          ].map((m, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-[#E8E8E8] dark:border-[#1E2A3A]">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">{m.l}</p>
              <p className={`text-2xl font-black font-cabinet`} style={{ color: m.c }}>{m.v}</p>
            </div>
          ))}
        </div>

        {/* ── Tab row ── */}
        <div className="flex items-center justify-between">
          <div className="flex bg-white dark:bg-[#111827] border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-xl p-1 gap-1">
            {[
              { id: 'live',      label: `Open Requests (${loading ? '…' : pendingLoans.length})` },
              { id: 'portfolio', label: `My Portfolio (${positions.length})` },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all
                  ${tab === t.id
                    ? 'bg-[#F5A623] text-black'
                    : 'text-[#8C8C8C] hover:text-[#1A1A1A] dark:hover:text-[#FAFAF8]'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">
            Deployed: <span className="text-[#F5A623]">${totalDeployed.toFixed(2)}</span>
          </div>
        </div>

        {/* ── Live Loan Requests ── */}
        {tab === 'live' && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#F5A623" strokeWidth="2.5" strokeDasharray="45 20" />
                </svg>
              </div>
            ) : pendingLoans.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="text-5xl">🏦</div>
                <p className="font-black font-cabinet text-xl text-[#FAFAF8]">No Open Loans Right Now</p>
                <p className="text-[#8C8C8C] text-sm">Check back soon — new loan requests come in daily.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingLoans.map(loan => (
                  <LoanCard key={loan.id} loan={loan}
                    onFund={(l, apy) => { setSelectedLoan(l); setSelectedApy(apy); }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Lender Portfolio ── */}
        {tab === 'portfolio' && (
          <div className="space-y-6">
            {positions.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="text-5xl">💼</div>
                <p className="font-black font-cabinet text-xl text-[#FAFAF8]">No Loans Funded Yet</p>
                <p className="text-[#8C8C8C] text-sm">Fund a loan to start earning returns on trust-verified borrowers.</p>
                <button onClick={() => setTab('live')}
                  className="px-8 py-3 rounded-xl border border-[#1D9E75] text-[#1D9E75]
                             font-black text-[11px] uppercase tracking-widest hover:bg-[#1D9E75] hover:text-white transition-all">
                  Browse Loan Requests →
                </button>
              </div>
            ) : (
              <>
                {/* portfolio summary */}
                <div className="grid grid-cols-3 gap-5">
                  {[
                    { l: 'Total Deployed', v: `$${totalDeployed.toFixed(2)}`, c: '#F5A623' },
                    { l: 'Active',         v: activePositions.length,          c: '#F59E0B' },
                    { l: 'Repaid',         v: repaidPositions.length,          c: '#1D9E75' },
                  ].map((m, i) => (
                    <div key={i} className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-[#E8E8E8] dark:border-[#1E2A3A] text-center">
                      <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">{m.l}</p>
                      <p className="text-2xl font-black font-cabinet" style={{ color: m.c }}>{m.v}</p>
                    </div>
                  ))}
                </div>

                {/* position table */}
                <div className="bg-white dark:bg-[#111827] border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="border-b border-[#E8E8E8] dark:border-[#1E2A3A]">
                      <tr>
                        {['Borrower', 'Amount', 'APY', 'Status', 'Expected Return', 'Tx'].map(h => (
                          <th key={h} className="px-6 py-4 text-left text-[9px] font-black uppercase tracking-widest text-[#8C8C8C]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E8E8] dark:divide-[#1E2A3A]">
                      {positions.map((p, i) => {
                        const expected = (parseFloat(p.funded_amount) * (1 + p.apy / 100 / 12)).toFixed(2);
                        return (
                          <tr key={i} className="hover:bg-[#FAFAF8]/50 dark:hover:bg-[#0A0F1E]/30 transition-all">
                            <td className="px-6 py-4 font-mono text-[11px] text-[#8C8C8C]">
                              {p.loans?.wallet_address?.slice(0, 8) ?? '—'}…
                            </td>
                            <td className="px-6 py-4 font-black text-sm text-[#F5A623]">${p.funded_amount}</td>
                            <td className="px-6 py-4 font-black text-sm text-[#1D9E75]">{p.apy}%</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                                ${p.status === 'repaid' ? 'bg-[#1D9E75]/10 text-[#1D9E75]'
                                  : p.status === 'active' ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                                  : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-black text-sm text-[#1D9E75]">${expected}</td>
                            <td className="px-6 py-4 font-mono text-[10px] text-[#8C8C8C]">
                              {p.tx_hash ? `${p.tx_hash.slice(0, 8)}…` : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* tip card */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#F59E0B]/5 border border-[#F59E0B]/15">
          <span className="text-xl">💡</span>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#F59E0B] leading-relaxed">
            Borrowers with 3+ vouchers have a 99.8% repayment rate. Higher Trust Score = lower risk for you.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
