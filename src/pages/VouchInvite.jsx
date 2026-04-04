import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createVouch, activateVouch, getBorrowerVouches, getUser } from '../lib/supabase';

/* ── mock blockchain stake ── */
async function mockStakeTokens(amount) {
  await new Promise(r => setTimeout(r, 2000));
  return '0x' + Array.from({ length: 40 }, () =>
    '0123456789abcdef'[Math.floor(Math.random() * 16)]
  ).join('');
}

function isValidAddress(addr) {
  return /^0x[0-9a-fA-F]{40}$/.test(addr);
}

const STATUS_PILL = {
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  active:  { label: 'Active',  color: '#1D9E75', bg: 'rgba(29,158,117,0.1)', border: 'rgba(29,158,117,0.3)' },
  revoked: { label: 'Revoked', color: '#EF4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)'  },
};

export default function VouchInvite() {
  const navigate   = useNavigate();
  const wallet     = sessionStorage.getItem('tl_wallet') || '';
  const [user, setUser]       = useState(null);
  const [vouches, setVouches] = useState([]);
  const [loading, setLoading] = useState(true);

  // form
  const [voucherAddr, setVoucherAddr] = useState('');
  const [stakeAmt, setStakeAmt]       = useState(5);
  const [phase, setPhase]             = useState('idle'); // idle|pending|staking|done|error|simulating
  const [simVouchId, setSimVouchId]   = useState(null);
  const [newVouch, setNewVouch]       = useState(null);
  const [error, setError]             = useState('');

  useEffect(() => {
    if (!wallet) { setLoading(false); return; }
    Promise.all([getUser(wallet), getBorrowerVouches(wallet)]).then(([u, vs]) => {
      setUser(u); setVouches(vs); setLoading(false);
    });
  }, [wallet]);

  const refreshVouches = () => getBorrowerVouches(wallet).then(setVouches);

  /* ── send invite ── */
  const sendInvite = async () => {
    setError('');
    if (!isValidAddress(voucherAddr)) { setError('Enter a valid 0x wallet address'); return; }
    if (voucherAddr.toLowerCase() === wallet.toLowerCase()) { setError("You can't vouch for yourself"); return; }
    try {
      setPhase('pending');
      const vouch = await createVouch({ borrowerWallet: wallet, voucherWallet: voucherAddr, stakeAmount: stakeAmt });
      setNewVouch(vouch);
      setSimVouchId(vouch.id);
      setPhase('done');
      await refreshVouches();
    } catch (err) {
      setError(err.message.includes('unique') ? 'You already invited this address' : err.message);
      setPhase('error');
    }
  };

  /* ── simulate acceptance (demo: voucher stakes & accepts) ── */
  const simulateAccept = async () => {
    setPhase('staking');
    try {
      const hash = await mockStakeTokens(stakeAmt);
      await activateVouch(simVouchId, hash);
      const fresh = await getUser(wallet);
      setUser(fresh);
      setPhase('accepted');
      await refreshVouches();
    } catch (err) {
      setError(err.message);
      setPhase('error');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
      <svg className="animate-spin w-10 h-10" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#F5A623" strokeWidth="2.5" strokeDasharray="45 20" strokeLinecap="round" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0F1E] relative overflow-hidden">
      {/* ambient */}
      <motion.div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none z-0"
        style={{ background: 'rgba(245,166,35,0.07)' }}
        animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity }} />

      <div className="max-w-4xl mx-auto px-6 py-12 z-10 relative">
        {/* back */}
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#8C8C8C] text-[11px] font-black uppercase tracking-widest
                     hover:text-[#F5A623] transition-colors mb-10">
          ← Dashboard
        </button>

        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#F5A623] mb-2">Vouch Network</p>
          <h1 className="font-cabinet font-black text-4xl text-[#FAFAF8] tracking-tight">Invite a Voucher</h1>
          <p className="text-[#8C8C8C] text-sm mt-2 leading-relaxed max-w-xl">
            Ask someone you trust to put money behind your name. Each accepted vouch stakes $
            {stakeAmt} tokens and adds <strong className="text-[#1D9E75]">+10 to your Trust Score</strong> — which means you can borrow more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Send invite form ── */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-8 space-y-6">
              <h2 className="font-cabinet font-black text-xl text-[#FAFAF8] tracking-tight">Invite Someone to Vouch for You</h2>

              {/* voucher address */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">
                  Their Wallet Address <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  value={voucherAddr}
                  onChange={e => setVoucherAddr(e.target.value)}
                  placeholder="0x1234…abcd"
                  className="w-full bg-[#0A0F1E] border border-[#1E2A3A] rounded-xl px-4 py-3.5
                             text-[#FAFAF8] font-mono text-sm placeholder-[#8C8C8C]/50
                             focus:outline-none focus:border-[#F5A623]/50 transition-colors"
                />
              </div>

              {/* stake amount */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">
                  How Much They Stake (TL Tokens)
                </label>
                <div className="flex gap-3">
                  {[5, 10, 25, 50].map(amt => (
                    <button key={amt} onClick={() => setStakeAmt(amt)}
                      className={`flex-1 py-3 rounded-xl border font-black text-sm transition-all duration-200
                        ${stakeAmt === amt
                          ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#F5A623]'
                          : 'border-[#1E2A3A] text-[#8C8C8C] hover:border-[#1E2A3A]/60'}`}>
                      ${amt}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#8C8C8C] leading-relaxed">
                  More stake = stronger vouch. If you default, their stake is slashed.
                </p>
              </div>

              {/* effect preview */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1D9E75]/20 bg-[#1D9E75]/5">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="text-sm font-black text-[#FAFAF8]">If they accept: +10 Trust Score for you</p>
                  <p className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest mt-0.5">
                    Score {user?.trust_score ?? 30} → {(user?.trust_score ?? 30) + 10}
                    {' '}·{' '}
                    {(user?.trust_score ?? 30) + 10 >= 40 && (user?.trust_score ?? 30) < 40 ? 'Bronze unlocked! 🥉' : 'Your borrow limit goes up'}
                  </p>
                </div>
              </div>

              {/* error */}
              {error && (
                <p className="text-[11px] font-black text-[#EF4444] uppercase tracking-widest">{error}</p>
              )}

              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.button key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    id="btn-send-vouch-invite" onClick={sendInvite}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#D4AF37]
                               text-black font-black text-[13px] uppercase tracking-widest
                               hover:opacity-90 active:scale-[0.98] transition-all
                               shadow-[0_0_25px_rgba(245,166,35,0.2)]">
                    Send Vouch Invite →
                  </motion.button>
                )}

                {phase === 'pending' && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full py-4 rounded-xl border border-[#1E2A3A] text-center
                               text-[11px] font-black uppercase tracking-widest text-[#8C8C8C]">
                    Storing vouch request…
                  </motion.div>
                )}

                {(phase === 'done' || phase === 'staking') && simVouchId && (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#F59E0B]/8 border border-[#F59E0B]/30 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#F59E0B]">
                        ✓ Invite sent — awaiting voucher acceptance
                      </p>
                      <p className="font-mono text-[10px] text-[#8C8C8C]">
                        Code: {newVouch?.invite_code}
                      </p>
                    </div>

                    {/* Demo: simulate voucher accepting */}
                    <div className="p-4 rounded-xl border border-[#1E2A3A] bg-[#0A0F1E] space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">
                        Demo Mode — Simulate Voucher Response
                      </p>
                      {phase === 'staking' ? (
                        <div className="text-center py-2 text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest animate-pulse">
                          Staking ${stakeAmt} on-chain…
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <button onClick={simulateAccept} id="btn-sim-accept"
                            className="py-3 rounded-xl bg-[#1D9E75] text-white font-black text-[11px]
                                       uppercase tracking-widest hover:bg-[#13C296] active:scale-[0.98] transition-all">
                            Accept & Stake 🤝
                          </button>
                          <button onClick={() => { setPhase('idle'); setVoucherAddr(''); }}
                            className="py-3 rounded-xl border border-[#1E2A3A] text-[#8C8C8C] font-black text-[11px]
                                       uppercase tracking-widest hover:border-[#EF4444]/40 hover:text-[#EF4444] transition-all">
                            Invite Another
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {phase === 'accepted' && (
                  <motion.div key="accepted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/30 text-center space-y-2">
                    <p className="text-2xl">🎉</p>
                    <p className="font-black text-[#1D9E75] font-cabinet">Vouch Accepted!</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">
                      Trust Score updated → {user?.trust_score ?? '—'}
                    </p>
                    <button onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl border border-[#1D9E75] text-[#1D9E75]
                                 font-black text-[11px] uppercase tracking-widest
                                 hover:bg-[#1D9E75] hover:text-black transition-all">
                      View Dashboard →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* how it works */}
            <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-6 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">How Vouching Works</p>
              {[
                { n: '01', t: 'You send an invite',          d: 'Enter their wallet address — they get notified.' },
                { n: '02', t: 'They stake tokens',           d: `They stake $${stakeAmt} TL tokens on-chain — real skin in the game.` },
                { n: '03', t: 'Your Trust Score goes up',    d: '+10 points → higher borrow limit.' },
                { n: '04', t: 'Everyone is accountable',     d: 'Their stake is slashed if you default. That\'s what makes trust real.' },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4">
                  <span className="text-[10px] font-black text-[#F5A623] w-6 flex-shrink-0 pt-0.5">{n}</span>
                  <div>
                    <p className="text-sm font-black text-[#FAFAF8]">{t}</p>
                    <p className="text-[11px] text-[#8C8C8C] leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Vouch network history ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] mb-5">
                People Vouching for You ({vouches.length})
              </p>

              {vouches.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-4xl mb-3">🤝</p>
                  <p className="text-[#8C8C8C] text-sm font-bold">No vouchers yet</p>
                  <p className="text-[#8C8C8C] text-xs mt-1 leading-relaxed">
                    Invite someone you trust. Their stake is what makes your score trustworthy.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vouches.map(v => {
                    const s = STATUS_PILL[v.status] ?? STATUS_PILL.pending;
                    return (
                      <div key={v.id}
                        className="flex items-center justify-between p-3 rounded-xl
                                   bg-[#0A0F1E] border border-[#1E2A3A]">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1E2A3A] border border-[#F5A623]/20
                                          flex items-center justify-center text-[10px] font-black text-[#F5A623]">
                            {v.voucher_wallet.slice(2, 4).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[#FAFAF8] font-mono text-[11px] font-bold">
                              {v.voucher_wallet.slice(0, 6)}…{v.voucher_wallet.slice(-4)}
                            </p>
                            <p className="text-[9px] text-[#8C8C8C] font-black uppercase tracking-widest">
                              Stake: ${v.stake_amount}
                            </p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                          style={{ color: s.color, background: s.bg, borderColor: s.border }}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* score impact summary */}
            <div className="bg-[#111827] border border-[#1E2A3A] rounded-2xl p-6 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Score Impact</p>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C] text-sm">Current Score</span>
                <span className="font-black font-cabinet text-[#FAFAF8]">{user?.trust_score ?? 30}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C] text-sm">Active Vouches</span>
                <span className="font-black font-cabinet text-[#1D9E75]">
                  {vouches.filter(v => v.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8C8C] text-sm">Pending Invites</span>
                <span className="font-black font-cabinet text-[#F59E0B]">
                  {vouches.filter(v => v.status === 'pending').length}
                </span>
              </div>
              <div className="pt-3 border-t border-[#1E2A3A] flex justify-between">
                <span className="text-[#8C8C8C] text-sm font-bold">Potential Score</span>
                <span className="font-black font-cabinet text-[#F5A623]">
                  {Math.min((user?.trust_score ?? 30) + vouches.filter(v => v.status === 'pending').length * 10, 100)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
