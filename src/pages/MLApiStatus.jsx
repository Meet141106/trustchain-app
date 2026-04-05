import React, { useEffect, useState, useCallback } from 'react';
import AppShell from '../components/AppShell';
import { getTrustScore, checkFraud, getInterestRate, getRepaymentSchedule, checkMLHealth } from '../services/mlApi';

// ─── Test payloads for each endpoint ─────────────────────────────────────────
const TEST_PAYLOADS = {
  trustScore: {
    repayment_history:       0.9,
    repayment_speed:         0.8,
    voucher_quality:         0.7,
    loan_to_repayment_ratio: 0.85,
    vouch_network_balance:   0.6,
    transaction_frequency:   15,
  },
  fraudCheck: {
    vouch_requests_24h:           2,
    avg_voucher_account_age_days: 30,
    network_clustering_score:     0.3,
  },
  interestRate: {
    trust_score:        72,
    loan_duration_days: 30,
    vouch_coverage_pct: 0.5,
  },
  repaymentSchedule: {
    tx_per_month:        12.5,
    avg_days_between_tx: 2.4,
  },
};

const ENDPOINTS = [
  {
    key:      'trustScore',
    label:    'Trust Score Calculator',
    path:     'POST /api/v1/trust-score',
    fn:       (p) => getTrustScore(p),
    expected: '{ status: "success", trust_score: int, eligible_limit_usd: int }',
    icon:     '🧠',
  },
  {
    key:      'fraudCheck',
    label:    'Fraud / Sybil Detector',
    path:     'POST /api/v1/fraud-check',
    fn:       (p) => checkFraud(p),
    expected: '{ status: "success", is_fraudulent: false, reason: "..." }',
    icon:     '🛡️',
  },
  {
    key:      'interestRate',
    label:    'Dynamic Interest Rate',
    path:     'POST /api/v1/interest-rate',
    fn:       (p) => getInterestRate(p),
    expected: '{ status: "success", data: { base_rate_pct, risk_premium_pct, ... } }',
    icon:     '📊',
  },
  {
    key:      'repaymentSchedule',
    label:    'Repayment Scheduler',
    path:     'POST /api/v1/repayment-schedule',
    fn:       (p) => getRepaymentSchedule(p),
    expected: '{ status: "success", data: { archetype, schedule_type, ... } }',
    icon:     '📅',
  },
];

// ─── Single endpoint row ──────────────────────────────────────────────────────
function EndpointRow({ ep, onTest }) {
  const [state, setState] = useState('idle'); // idle | loading | ok | fallback | error
  const [result, setResult] = useState(null);
  const [elapsed, setElapsed] = useState(null);

  const runTest = async () => {
    setState('loading');
    setResult(null);
    const t0 = Date.now();
    try {
      const res = await ep.fn(TEST_PAYLOADS[ep.key]);
      const ms = Date.now() - t0;
      setElapsed(ms);
      setResult(res);
      setState(res.status === 'fallback' ? 'fallback' : 'ok');
      onTest(ep.key, res.status === 'fallback' ? 'fallback' : 'ok');
    } catch (err) {
      setElapsed(Date.now() - t0);
      setResult({ error: err.message });
      setState('error');
      onTest(ep.key, 'error');
    }
  };

  const statusDot = {
    idle:     { color: '#8C8C8C', label: 'UNTESTED' },
    loading:  { color: '#F5A623', label: 'TESTING...' },
    ok:       { color: '#1D9E75', label: 'LIVE' },
    fallback: { color: '#F5A623', label: 'FALLBACK (ML offline)' },
    error:    { color: '#EF4444', label: 'UNREACHABLE' },
  }[state];

  return (
    <div className={`rounded-[20px] border p-7 transition-all duration-300
      ${state === 'ok'       ? 'border-[#1D9E75]/40 bg-[#1D9E75]/5'
      : state === 'fallback' ? 'border-[#F5A623]/40 bg-[#F5A623]/5'
      : state === 'error'    ? 'border-[#EF4444]/40 bg-[#EF4444]/5'
      : 'border-[#1E2A3A] bg-[#111827]'}`}>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{ep.icon}</span>
          <div>
            <p className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">{ep.label}</p>
            <p className="text-[9px] font-mono text-[#8C8C8C] mt-0.5">{ep.path}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {elapsed && (
            <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">{elapsed}ms</span>
          )}
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${state === 'loading' ? 'animate-pulse' : ''}`}
              style={{ background: statusDot.color }} />
            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: statusDot.color }}>
              {statusDot.label}
            </span>
          </div>
        </div>
      </div>

      {/* Expected shape */}
      <p className="text-[9px] font-mono text-[#555] mb-5 truncate">{ep.expected}</p>

      {/* Test button */}
      <button
        onClick={runTest}
        disabled={state === 'loading'}
        className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
          ${state === 'loading' ? 'bg-[#1E2A3A] text-[#8C8C8C] cursor-not-allowed'
          : 'bg-white/5 border border-white/10 text-[#FAFAF8] hover:bg-white/10'}`}
      >
        {state === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#F5A623" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/>
            </svg>
            Running...
          </span>
        ) : state === 'idle' ? 'Test Endpoint' : 'Re-test'}
      </button>

      {/* Response preview */}
      {result && (
        <div className="mt-5">
          <pre className={`text-[9px] font-mono p-4 rounded-xl border overflow-x-auto whitespace-pre-wrap leading-relaxed
            ${state === 'ok'       ? 'bg-[#1D9E75]/5 border-[#1D9E75]/20 text-[#1D9E75]'
            : state === 'fallback' ? 'bg-[#F5A623]/5 border-[#F5A623]/20 text-[#F5A623]'
            : 'bg-[#EF4444]/5 border-[#EF4444]/20 text-[#EF4444]'}`}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MLApiStatus() {
  const [healthState, setHealthState]     = useState('idle'); // idle | checking | ok | down
  const [lastChecked, setLastChecked]     = useState(null);
  const [endpointStates, setEndpointStates] = useState({});
  const [isRunningAll, setIsRunningAll]   = useState(false);

  const mlUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:8000';

  // ── Health check ──────────────────────────────────────────────────────────
  const ping = useCallback(async () => {
    setHealthState('checking');
    const ok = await checkMLHealth();
    setHealthState(ok ? 'ok' : 'down');
    setLastChecked(new Date());
  }, []);

  useEffect(() => { ping(); }, [ping]);

  // ── Record per-endpoint results ──────────────────────────────────────────
  const handleEndpointResult = (key, status) => {
    setEndpointStates(prev => ({ ...prev, [key]: status }));
  };

  // ── Run all 4 in sequence ─────────────────────────────────────────────────
  const runAll = async () => {
    setIsRunningAll(true);
    // Trigger re-mount of rows by clearing states (forces re-render)
    // Actually we just ping each one manually here
    const results = {};
    for (const ep of ENDPOINTS) {
      try {
        const res = await ep.fn(TEST_PAYLOADS[ep.key]);
        results[ep.key] = res.status === 'fallback' ? 'fallback' : 'ok';
      } catch {
        results[ep.key] = 'error';
      }
    }
    setEndpointStates(results);
    setIsRunningAll(false);
  };

  const liveCount    = Object.values(endpointStates).filter(s => s === 'ok').length;
  const fallbackCount = Object.values(endpointStates).filter(s => s === 'fallback').length;
  const errorCount   = Object.values(endpointStates).filter(s => s === 'error').length;
  const testedCount  = Object.keys(endpointStates).length;

  const healthColor = {
    idle:     '#8C8C8C',
    checking: '#F5A623',
    ok:       '#1D9E75',
    down:     '#EF4444',
  }[healthState];

  return (
    <AppShell pageTitle="ML API Diagnostics" pageSubtitle="TrustLend AI Engine Health">
      <div className="max-w-4xl mx-auto space-y-10 pb-24">

        {/* ── Server status card ── */}
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-[28px] p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-2">ML Engine Heartbeat</p>
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${healthState === 'checking' ? 'animate-pulse' : ''}`}
                  style={{ background: healthColor, boxShadow: `0 0 10px ${healthColor}` }} />
                <h2 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">
                  {healthState === 'idle'     ? 'Not checked'
                  : healthState === 'checking' ? 'Pinging server...'
                  : healthState === 'ok'       ? 'Server Online'
                  : 'Server Offline / Cold Starting'}
                </h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">API URL</p>
              <p className="font-mono text-xs text-[#F5A623]">{mlUrl}</p>
              {lastChecked && (
                <p className="text-[8px] text-[#555] mt-1 uppercase tracking-widest">
                  Last ping: {lastChecked.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          {/* Summary counts (only shown after testing) */}
          {testedCount > 0 && (
            <div className="grid grid-cols-3 gap-5 pt-8 border-t border-[#1E2A3A]">
              <div className="text-center">
                <p className="text-3xl font-black font-cabinet text-[#1D9E75]">{liveCount}</p>
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Live</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black font-cabinet text-[#F5A623]">{fallbackCount}</p>
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Fallback</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black font-cabinet text-[#EF4444]">{errorCount}</p>
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Errors</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={ping}
              disabled={healthState === 'checking'}
              className="flex-1 py-4 border border-[#1E2A3A] text-[#8C8C8C] text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-[#F5A623] hover:text-[#F5A623] transition-all disabled:opacity-40"
            >
              {healthState === 'checking' ? '⏳ Pinging...' : '⟳ Ping Server'}
            </button>
            <button
              onClick={runAll}
              disabled={isRunningAll}
              className="flex-[2] py-4 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 shadow-[0_0_20px_rgba(245,166,35,0.2)]"
            >
              {isRunningAll ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" strokeDasharray="30 15" strokeLinecap="round"/>
                  </svg>
                  Running All Tests...
                </span>
              ) : '⚡ Test All 4 Endpoints'}
            </button>
          </div>
        </div>

        {/* Cold-start notice */}
        <div className="flex items-start gap-3 px-7 py-5 rounded-2xl bg-[#F5A623]/5 border border-[#F5A623]/15">
          <span className="text-xl mt-0.5">💤</span>
          <div>
            <p className="text-[11px] font-black text-[#F5A623] uppercase tracking-widest mb-1">Render Free Tier — Cold Start</p>
            <p className="text-[10px] text-[#8C8C8C] leading-relaxed">
              If the server has been idle, first request takes <strong className="text-[#FAFAF8]">30–50 seconds</strong> to wake up.
              The ML client retries automatically up to <strong className="text-[#FAFAF8]">3 times with 3s delays</strong>.
              If all retries fail, the app shows fallback scores and allows submission with a warning.
            </p>
          </div>
        </div>

        {/* ── Per-endpoint cards ── */}
        <div>
          <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-7">
            Endpoint Status — Test each individually or use "Test All" above
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENDPOINTS.map(ep => (
              <EndpointRow key={ep.key} ep={ep} onTest={handleEndpointResult} />
            ))}
          </div>
        </div>

        {/* ── CORS + payload contracts ── */}
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-[28px] p-10 space-y-8">
          <h3 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em]">API Contract Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] font-mono">
            {ENDPOINTS.map(ep => (
              <div key={ep.key} className="bg-black/30 p-5 rounded-2xl border border-[#1E2A3A]">
                <p className="text-[9px] font-black text-[#F5A623] uppercase tracking-widest mb-3">{ep.path}</p>
                <pre className="text-[#8C8C8C] leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify(TEST_PAYLOADS[ep.key], null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}
