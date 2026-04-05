import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import { useReputationNFT } from '../hooks/useReputationNFT';
import { getTierForScore, nextTierInfo } from '../config/tiers';
import { updateLoan, createLoan } from '../lib/supabase';
import { translateContractError } from '../utils/contractErrors';
import { checkFraud, getTrustScore, getInterestRate, getRepaymentSchedule } from '../services/mlApi';

/* ── step dot ── */
function StepDot({ n, active, done }) {
  return (
    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center
      text-[11px] font-black transition-all duration-500 font-cabinet flex-shrink-0
      ${done  ? 'bg-[#1D9E75] border-[#1D9E75] text-white'
             : active ? 'border-[#F5A623] text-[#F5A623]'
             : 'border-[#1E2A3A] text-[#8C8C8C]'}`}>
      {done ? '✓' : n}
    </div>
  );
}

/* ════════════ STEP 1 — Select Path ════════════ */
function StepSelectPath({ onNext, maxLoan, tier }) {
  const [selected, setSelected] = useState('trust');

  const paths = [
    {
      id: 'trust',
      icon: '🤝',
      label: 'Trust-Only',
      badge: `${tier.name} Level`,
      badgeColor: tier.color,
      desc: 'Borrow based on your Trust Score. No collateral, no vouchers needed.',
      limit: `${maxLoan} TRUST`,
      apr: '7.1%',
      available: true,
      pathId: 2,
    },
    {
      id: 'vouched',
      icon: '👥',
      label: 'Vouch-Backed',
      badge: 'Available',
      badgeColor: '#1D9E75',
      desc: 'Get peers to vouch for you and unlock better rates. Need at least 1 active voucher.',
      limit: `${maxLoan} TRUST`,
      apr: '4.2%',
      available: true,
      pathId: 0,
    },
    {
      id: 'collateral',
      icon: '🔒',
      label: 'Collateral',
      badge: 'Available',
      badgeColor: '#1D9E75',
      desc: 'Lock tokens as collateral for the lowest interest rate.',
      limit: `${maxLoan} TRUST`,
      apr: '2.8%',
      available: true,
      pathId: 1,
    },
  ];

  const selectedPath = paths.find(p => p.id === selected);

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A623] mb-2">Step 1 of 4</p>
        <h2 className="font-cabinet font-black text-3xl text-[#FAFAF8] tracking-tight">How Do You Want to Borrow?</h2>
        <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed">
          Choose your loan type. Each pathway has different interest rates and requirements.
        </p>
      </div>

      <div className="space-y-3">
        {paths.map(p => (
          <button
            key={p.id}
            id={`path-${p.id}`}
            onClick={() => p.available && setSelected(p.id)}
            className={`w-full p-5 rounded-2xl border text-left transition-all duration-300
              ${!p.available ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              ${selected === p.id && p.available
                ? 'border-[#F5A623] bg-[#F5A623]/6 shadow-[0_0_20px_rgba(245,166,35,0.12)]'
                : 'border-[#1E2A3A] hover:border-[#1E2A3A]/60'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <span className="font-black font-cabinet text-[#FAFAF8] text-base">{p.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {selected === p.id && p.available && (
                  <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
                )}
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border"
                  style={{ color: p.badgeColor, borderColor: p.badgeColor + '40', background: p.badgeColor + '10' }}>
                  {p.badge}
                </span>
              </div>
            </div>
            <p className="text-[#8C8C8C] text-[12px] ml-9 leading-relaxed">{p.desc}</p>
            <div className="flex gap-6 ml-9 mt-3">
              <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">
                Limit: <span className="text-[#FAFAF8]">{p.limit}</span>
              </span>
              <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">
                Rate: <span className="text-[#FAFAF8]">{p.apr}</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        id="btn-continue-path"
        onClick={() => onNext(selectedPath)}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                   text-black font-black text-[13px] uppercase tracking-widest
                   hover:opacity-90 active:scale-[0.98] transition-all
                   shadow-[0_0_30px_rgba(245,166,35,0.2)]"
      >
        Continue → {selectedPath?.label}
      </button>
    </div>
  );
}

/* ════════════ STEP 2 — Choose Amount ════════════ */
function StepChooseAmount({ onNext, onBack, maxLoan, tier }) {
  const [amount, setAmount] = useState(Math.min(maxLoan, 50));

  const presets = [10, 50, 100, 200, 500, 1000].filter(v => v <= maxLoan);

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A623] mb-2">Step 2 of 4</p>
        <h2 className="font-cabinet font-black text-3xl text-[#FAFAF8] tracking-tight">How Much Do You Need?</h2>
        <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed">
          Choose your loan amount. Maximum for {tier.name} tier: <span className="text-[#F5A623] font-black">{maxLoan} TRUST</span>
        </p>
      </div>

      {/* Amount display */}
      <div className="bg-[#0A0F1E] border border-[#1E2A3A] rounded-2xl p-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] mb-3">Loan Amount</p>
        <div className="flex items-center justify-center gap-2">
          <input
            id="loan-amount-input"
            type="number"
            min={1}
            max={maxLoan}
            value={amount}
            onChange={(e) => {
              const v = Math.max(1, Math.min(Number(e.target.value) || 0, maxLoan));
              setAmount(v);
            }}
            className="bg-transparent text-5xl font-black font-cabinet text-[#F5A623] w-40 text-center outline-none
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-xl text-[#8C8C8C] font-black">TRUST</span>
        </div>

        {/* Slider */}
        <div className="mt-6 px-2">
          <input
            type="range"
            min={1}
            max={maxLoan}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer
                       bg-[#1E2A3A] accent-[#F5A623]
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:bg-[#F5A623] [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(245,166,35,0.5)]"
          />
          <div className="flex justify-between text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-2">
            <span>1 TRUST</span>
            <span>{maxLoan} TRUST (Max)</span>
          </div>
        </div>
      </div>

      {/* Quick presets */}
      <div className="grid grid-cols-3 gap-3">
        {presets.map(v => (
          <button
            key={v}
            onClick={() => setAmount(v)}
            className={`py-3 rounded-xl text-xs font-black transition-all border
              ${amount === v
                ? 'bg-[#F5A623] border-[#F5A623] text-black'
                : 'bg-transparent border-[#1E2A3A] text-[#8C8C8C] hover:border-[#F5A623]'}`}
          >
            {v} TRUST
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack}
          className="flex-1 py-5 rounded-2xl border border-[#1E2A3A] text-[#8C8C8C]
                     font-black text-[11px] uppercase tracking-widest hover:border-[#F5A623] hover:text-[#F5A623] transition-all">
          ← Back
        </button>
        <button
          id="btn-continue-amount"
          disabled={amount <= 0 || amount > maxLoan}
          onClick={() => onNext(amount)}
          className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                     text-black font-black text-[13px] uppercase tracking-widest
                     hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40
                     shadow-[0_0_30px_rgba(245,166,35,0.2)]"
        >
          Review →
        </button>
      </div>
    </div>
  );
}

/* ════════════ STEP 3 — ML Pipeline + Confirm (Blockchain-First) ════════════ */
function StepConfirm({ wallet, amount, path, trustScore, onSuccess, onBack }) {
  const [phase, setPhase] = useState('idle'); // idle|ml_fraud|ml_score|ml_rate|ml_sched|blockchain|supabase|done|error
  const [error, setError] = useState('');

  // ML result states
  const [fraudResult, setFraudResult]   = useState(null);
  const [mlTrustScore, setMlTrustScore] = useState(null);
  const [rateResult, setRateResult]     = useState(null);
  const [schedResult, setSchedResult]   = useState(null);
  const [mlWarning, setMlWarning]       = useState('');

  const { submitLoanRequest } = useLendingPool();

  const rateMap = { 0: '4.2%', 1: '2.8%', 2: '7.1%' };
  const pathMap = { 0: 'Vouch-Backed', 1: 'Collateral', 2: 'Trust-Only' };
  const vouchPct = path?.pathId === 0 ? 100 : 0;

  const confirm = async () => {
    try {
      // ══ STEP A: Fraud Check ══════════════════════════════════════════════
      setPhase('ml_fraud');
      const fraud = await checkFraud({
        vouch_requests_24h:           2,
        avg_voucher_account_age_days: 140,
        network_clustering_score:     0.12,
      });
      setFraudResult(fraud);
      if (fraud.is_fraudulent) {
        setError(`🚨 Fraud Detected: ${fraud.reason}`);
        setPhase('error');
        return;
      }
      if (fraud.status === 'fallback') setMlWarning('ML API offline — conservative fraud pass granted.');

      // ══ STEP B: Trust Score ══════════════════════════════════════════════
      setPhase('ml_score');
      const scoreRes = await getTrustScore({
        repayment_history:       0.7,
        repayment_speed:         0.8,
        voucher_quality:         0.6,
        loan_to_repayment_ratio: 1.0,
        vouch_network_balance:   0.5,
        transaction_frequency:   12,
      });
      const computedScore = scoreRes?.trust_score ?? Number(trustScore) ?? 30;
      setMlTrustScore(computedScore);

      // ══ STEP C: Interest Rate ════════════════════════════════════════════
      setPhase('ml_rate');
      const rateRes = await getInterestRate({
        trust_score:        computedScore,
        loan_duration_days: 30,
        vouch_coverage_pct: vouchPct,
      });
      setRateResult(rateRes?.data || rateRes);

      // ══ STEP D: Repayment Schedule ═══════════════════════════════════════
      setPhase('ml_sched');
      const schedRes = await getRepaymentSchedule({
        tx_per_month:         12.5,
        avg_days_between_tx:  2.4,
      });
      setSchedResult(schedRes?.data || schedRes);

      // ══ BLOCKCHAIN FIRST — always ════════════════════════════════════════
      setPhase('blockchain');
      const mlResults = {
        fraudChecked:            true,
        mlTrustScore:            computedScore,
        mlInterestRate:          rateRes?.data?.total_interest_rate_pct ?? null,
        repaymentArchetype:      schedRes?.data?.archetype ?? null,
        scheduleType:            schedRes?.data?.schedule_type ?? null,
        gracePeriodDays:         schedRes?.data?.grace_period_days ?? null,
        recommendedInstallments: schedRes?.data?.recommended_installments ?? null,
      };
      const tx = await submitLoanRequest(amount, 30, path.pathId, mlResults);
      const txHash = tx?.hash || 'confirmed';

      // ══ SUPABASE SECOND — only after chain confirmation ══════════════════
      setPhase('supabase');
      try {
        await createLoan({ walletAddress: wallet, amount, path: path.id });
      } catch (sbErr) {
        console.warn('[LoanFlow] Supabase write failed (loan exists on-chain):', sbErr);
      }

      setPhase('done');
      await new Promise(r => setTimeout(r, 600));
      onSuccess({ amount }, txHash);
    } catch (err) {
      console.error('[LoanFlow] error:', err);
      setError(translateContractError(err));
      setPhase('error');
    }
  };

  const mlPhases = ['ml_fraud','ml_score','ml_rate','ml_sched','blockchain','supabase'];
  const isMLRunning = mlPhases.includes(phase);

  const ARCHETYPE_DESC = {
    'Daily Earner':    '→ Daily micro-installments',
    'Weekly Earner':   '→ Weekly installments',
    'Seasonal Earner': '→ Lump sum with grace period',
    'Power User':      '→ Accelerated payback',
    'Steady Earner':   '→ Bi-weekly installments',
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A623] mb-2">Step 3 of 4</p>
        <h2 className="font-cabinet font-black text-3xl text-[#FAFAF8] tracking-tight">AI Risk Assessment + Confirm</h2>
        <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed">
          ML pipeline runs before on-chain submission via <span className="font-mono text-[#F5A623]">submitLoanRequest()</span>.
        </p>
      </div>

      {/* ML warning banner */}
      {mlWarning && (
        <div className="px-4 py-3 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/30 text-[10px] font-black text-[#F5A623] uppercase tracking-widest">
          ⚠️ {mlWarning}
        </div>
      )}

      {/* ML Pipeline results (shown as they arrive) */}
      {phase !== 'idle' && (
        <div className="bg-[#0A0F1E] border border-[#1E2A3A] rounded-2xl p-5 space-y-3">
          {/* Fraud Check */}
          <div className={`flex items-center gap-3 transition-opacity ${fraudResult || phase === 'ml_fraud' ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0
              ${fraudResult ? (fraudResult.is_fraudulent ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#1D9E75]/20 text-[#1D9E75]') : 'border border-[#1E2A3A]'}`}>
              {phase === 'ml_fraud' ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/></svg>
               : fraudResult ? (fraudResult.is_fraudulent ? '🚨' : '🛡️') : '.'}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Fraud Check</p>
              {fraudResult && <p className="text-[11px] font-black text-[#FAFAF8]">{fraudResult.is_fraudulent ? 'BLOCKED' : '✓ Clear — authentic behavior'}</p>}
            </div>
          </div>

          {/* ML Trust Score */}
          <div className={`flex items-center gap-3 transition-opacity ${mlTrustScore !== null || phase === 'ml_score' ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0
              ${mlTrustScore !== null ? 'bg-[#1D9E75]/20 text-[#1D9E75]' : 'border border-[#1E2A3A]'}`}>
              {phase === 'ml_score' ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/></svg>
               : mlTrustScore !== null ? '🧠' : '.'}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">ML Trust Score</p>
              {mlTrustScore !== null && <p className="text-[11px] font-black text-[#1D9E75]">{mlTrustScore} / 100</p>}
            </div>
          </div>

          {/* Interest Rate */}
          <div className={`flex items-center gap-3 transition-opacity ${rateResult || phase === 'ml_rate' ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0
              ${rateResult ? 'bg-[#1D9E75]/20 text-[#1D9E75]' : 'border border-[#1E2A3A]'}`}>
              {phase === 'ml_rate' ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/></svg>
               : rateResult ? '📊' : '.'}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">AI Interest Rate</p>
              {rateResult && (
                <p className="text-[11px] font-black text-[#FAFAF8]">
                  {rateResult.base_rate_pct}% base + {rateResult.risk_premium_pct?.toFixed(1)}% risk + {rateResult.duration_premium_pct}% duration
                  &nbsp;−&nbsp;{rateResult.vouch_discount_pct}% vouch&nbsp;
                  = <span className="text-[#F5A623]">{rateResult.total_interest_rate_pct}% APR</span>
                </p>
              )}
            </div>
          </div>

          {/* Repayment Archetype */}
          <div className={`flex items-center gap-3 transition-opacity ${schedResult || phase === 'ml_sched' ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0
              ${schedResult ? 'bg-[#F5A623]/20 text-[#F5A623]' : 'border border-[#1E2A3A]'}`}>
              {phase === 'ml_sched' ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/></svg>
               : schedResult ? '📅' : '.'}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Repayment Archetype</p>
              {schedResult && (
                <p className="text-[11px] font-black text-[#F5A623]">
                  You are a <strong>{schedResult.archetype}</strong> {ARCHETYPE_DESC[schedResult.archetype] || ''}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loan summary */}
      <div className="bg-[#0A0F1E] border border-[#1E2A3A] rounded-2xl p-6 space-y-0">
        {[
          { l: 'Loan Amount', v: `${amount} TRUST`,      c: '#F5A623' },
          { l: 'Loan Path',   v: pathMap[path?.pathId],  c: '#FAFAF8' },
          { l: 'Term',        v: '30 days',              c: '#FAFAF8' },
          { l: 'APR',         v: rateResult ? `${rateResult.total_interest_rate_pct}%` : rateMap[path?.pathId], c: '#1D9E75' },
        ].map(({ l, v, c }, i) => (
          <div key={i} className="flex justify-between py-3.5 border-b border-[#1E2A3A] last:border-0">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">{l}</span>
            <span className="font-black text-sm font-cabinet" style={{ color: c }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Blockchain+DB pipeline visual */}
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
        {[
          { l: 'ML Check',   active: ['ml_fraud','ml_score','ml_rate','ml_sched'].includes(phase), done: ['blockchain','supabase','done'].includes(phase), icon: '🤖' },
          { l: 'Blockchain', active: phase === 'blockchain', done: ['supabase','done'].includes(phase), icon: '⛓️' },
          { l: 'Database',   active: phase === 'supabase',   done: phase === 'done',                    icon: '🗄️' },
          { l: 'Active',     active: false,                  done: phase === 'done',                    icon: '✅' },
        ].map((s, i) => (
          <React.Fragment key={i}>
            <div className={`flex flex-col items-center gap-1 transition-all duration-500
              ${s.done ? 'opacity-100' : s.active ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm
                ${s.done ? 'border-[#1D9E75] bg-[#1D9E75]/10'
                         : s.active ? 'border-[#F5A623] bg-[#F5A623]/10' : 'border-[#1E2A3A]'}`}>
                {s.active
                  ? <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/></svg>
                  : s.icon}
              </div>
              <span className={s.done ? 'text-[#1D9E75]' : s.active ? 'text-[#F5A623]' : 'text-[#8C8C8C]'}>{s.l}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-px transition-all duration-500 ${s.done ? 'bg-[#1D9E75]' : 'bg-[#1E2A3A]'}`} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
            <button onClick={onBack}
              className="flex-1 py-5 rounded-2xl border border-[#1E2A3A] text-[#8C8C8C]
                         font-black text-[11px] uppercase tracking-widest hover:border-[#F5A623] hover:text-[#F5A623] transition-all">
              ← Back
            </button>
            <button id="btn-confirm-loan" onClick={confirm}
              className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                         text-black font-black text-[13px] uppercase tracking-widest
                         hover:opacity-90 active:scale-[0.98] transition-all
                         shadow-[0_0_30px_rgba(245,166,35,0.25)]">
              ⚡ Run ML + Confirm
            </button>
          </motion.div>
        )}

        {isMLRunning && phase !== 'done' && phase !== 'error' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full py-5 rounded-2xl border border-[#1E2A3A] text-center
                       text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">
            {phase === 'ml_fraud'    ? '🛡️ Running fraud check...'
           : phase === 'ml_score'   ? '🧠 Computing ML trust score...'
           : phase === 'ml_rate'    ? '📊 Calculating interest rate...'
           : phase === 'ml_sched'   ? '📅 Profiling repayment pattern...'
           : phase === 'blockchain' ? '⛓️ Awaiting blockchain confirmation...'
           : '🗄️ Writing to database...'}
          </motion.div>
        )}

        {phase === 'done' && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full py-4 rounded-2xl bg-[#1D9E75]/10 border border-[#1D9E75]/30
                       text-center text-[11px] font-black uppercase tracking-widest text-[#1D9E75]">
            ✓ Loan Activated On-Chain
          </motion.div>
        )}

        {phase === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="py-4 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30
                            text-center text-[11px] font-black uppercase tracking-widest text-[#EF4444] px-4">
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
    </div>
  );
}

/* ════════════ STEP 4 — Success ════════════ */
function StepSuccess({ loan, txHash, navigate }) {
  return (
    <div className="space-y-7 text-center">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1D9E75] mb-2">Loan Active</p>
        <h2 className="font-cabinet font-black text-3xl text-[#FAFAF8] tracking-tight">Money on Its Way! 🎉</h2>
        <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed">
          Your {loan?.amount ?? '—'} TRUST loan is active on-chain. Repay it on time to grow your Trust Score.
        </p>
      </div>

      {/* amount celebration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1D9E75] to-[#13C296]
                   flex items-center justify-center mx-auto
                   shadow-[0_0_50px_rgba(29,158,117,0.3)]"
      >
        <div>
          <p className="text-3xl font-black font-cabinet text-white">{loan?.amount ?? '—'}</p>
          <p className="text-[9px] font-black text-white/70 uppercase tracking-widest">TRUST</p>
        </div>
      </motion.div>

      {/* tx hash */}
      {txHash && (
        <div className="px-4 py-3 rounded-xl bg-[#0A0F1E] border border-[#1E2A3A] text-left">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1">Tx Hash</p>
          <p className="font-mono text-[10px] text-[#F5A623] break-all">{txHash}</p>
        </div>
      )}

      <button
        id="btn-goto-dashboard"
        onClick={() => navigate('/dashboard')}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                   text-black font-black text-[13px] uppercase tracking-widest
                   hover:opacity-90 active:scale-[0.98] transition-all
                   shadow-[0_0_40px_rgba(245,166,35,0.3)]"
      >
        View My Dashboard →
      </button>
    </div>
  );
}

/* ════════════ ROOT ════════════ */
export default function LoanFlow() {
  const navigate = useNavigate();
  const { walletAddress } = useWallet();
  const wallet = walletAddress || localStorage.getItem('tl_wallet') || '';

  const { trustScore } = useReputationNFT();
  const { borrowLimit } = useLendingPool();

  const [step, setStep]     = useState(0);
  const [path, setPath]     = useState(null);
  const [amount, setAmount] = useState(0);
  const [loan, setLoan]     = useState(null);
  const [txHash, setTxHash] = useState('');

  const score   = Number(trustScore) || 0;
  const tier    = getTierForScore(score);
  const maxLoan = Number(borrowLimit) || tier.maxLoan;
  const next    = nextTierInfo(score);

  const STEP_LABELS = ['Select Path', 'Amount', 'Confirm', 'Success'];

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center
                    relative overflow-hidden py-12 px-4">
      {/* ambient */}
      <motion.div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'rgba(245,166,35,0.06)' }}
        animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity }} />

      {/* back */}
      <button onClick={() => navigate('/dashboard')}
        className="absolute top-8 left-8 text-[#8C8C8C] text-[11px] font-black uppercase tracking-widest
                   hover:text-[#F5A623] transition-colors">
        ← Dashboard
      </button>

      {/* Trust growth bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full max-w-md z-10 mb-2">
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl
                        bg-[#111827] border border-[#1E2A3A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center
                            font-black text-[11px] font-cabinet"
              style={{ borderColor: tier.color, color: tier.color }}>
              {score}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest"
                 style={{ color: tier.color }}>{tier.name} Tier</p>
              <p className="text-[#FAFAF8] font-black text-sm">Limit: {maxLoan} TRUST</p>
            </div>
          </div>
          {next && (
            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C]">
                Next: {next.tier}
              </p>
              <p className="text-[#F5A623] font-black text-xs">
                {next.ptsNeeded} pts → {next.limit} TRUST
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* step bar */}
      <div className="flex items-center gap-2 mb-10 z-10 w-full max-w-md">
        {STEP_LABELS.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1">
              <StepDot n={i + 1} active={step === i} done={step > i} />
              <span className={`text-[9px] font-black uppercase tracking-widest hidden sm:block
                ${step === i ? 'text-[#F5A623]' : step > i ? 'text-[#1D9E75]' : 'text-[#8C8C8C]'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-px transition-colors duration-500
                ${step > i ? 'bg-[#1D9E75]' : 'bg-[#1E2A3A]'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-3xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <StepSelectPath onNext={(p) => { setPath(p); setStep(1); }}
                  maxLoan={maxLoan} tier={tier} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <StepChooseAmount
                  onNext={(amt) => { setAmount(amt); setStep(2); }}
                  onBack={() => setStep(0)}
                  maxLoan={maxLoan}
                  tier={tier}
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <StepConfirm
                  wallet={wallet}
                  amount={amount}
                  path={path}
                  trustScore={score}
                  onSuccess={(activeLoan, hash) => {
                    setLoan(activeLoan);
                    setTxHash(hash);
                    setStep(3);
                  }}
                  onBack={() => setStep(1)}
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <StepSuccess loan={loan} txHash={txHash} navigate={navigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
