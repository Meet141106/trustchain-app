import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import { useTrustToken } from '../hooks/useTrustToken';
import Skeleton from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

const PATH_LABELS = { 0: 'Social-Backed', 1: 'Collateralized', 2: 'Reputation-Only' };
const PATH_COLORS = { 0: '#1D9E75', 1: '#627EEA', 2: '#F5A623' };

export default function LenderPortfolio() {
  const { isDarkMode } = useTheme();
  const { walletAddress: address } = useWallet();
  const navigate = useNavigate();
  const { poolStats, lenderLoans, openRequests, fundLoanRequest, isLoading } = useLendingPool();
  const { trustBalance, isApproved, approvePool } = useTrustToken();

  const [activeTab, setActiveTab] = useState('myLoans');
  const [isFunding, setIsFunding] = useState(null); // stores requestId being funded

  const totalDeployed = useMemo(() =>
    lenderLoans.reduce((sum, l) => sum + Number(l.amount), 0),
    [lenderLoans]
  );

  const activeInterest = useMemo(() =>
    lenderLoans.reduce((sum, l) => sum + (Number(l.amount) * Number(l.interestRate) / 100), 0),
    [lenderLoans]
  );

  const handleFund = async (req) => {
    if (!address) { toast.error("Please connect your wallet first."); return; }
    if (req.borrower.toLowerCase() === address.toLowerCase()) { toast.error("You cannot fund your own request."); return; }
    if (Number(trustBalance) < Number(req.amount)) {
      toast.error(`Insufficient TRUST. You have ${trustBalance}, need ${req.amount}.`);
      return;
    }

    setIsFunding(req.id);
    try {
      const approved = await isApproved(req.amount);
      if (!approved) {
        const ok = await approvePool(req.amount);
        if (!ok) { setIsFunding(null); return; }
      }
      await fundLoanRequest(req.id);
      toast.success(`Loan funded! You'll earn ${((Number(req.amount) * Number(req.interestRate)) / 100).toFixed(2)} TRUST interest.`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFunding(null);
    }
  };

  return (
    <AppShell pageTitle="My Loans" pageSubtitle="Capital Performance Monitor">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">

        {/* Portfolio Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Deployed Principal', val: isLoading ? '...' : `${totalDeployed.toLocaleString()} TRUST`, sub: 'Active P2P Capital', color: 'text-[#FAFAF8]' },
            { label: 'Projected Yield',    val: isLoading ? '...' : `${activeInterest.toFixed(1)} TRUST`,       sub: `At ${poolStats?.avgInterestRate || 0}% avg APR`, color: 'text-[#1D9E75]' },
            { label: 'Open Requests',      val: isLoading ? '...' : openRequests.length,                         sub: 'Available to fund', color: 'text-[#F5A623]' },
          ].map((p, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] p-10 rounded-[24px] border border-[#E8E8E8] dark:border-[#1E2A3A] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5A623] opacity-[0.02] blur-3xl group-hover:opacity-[0.05] transition-opacity"></div>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">{p.label}</p>
              <p className={`text-4xl font-black font-cabinet ${p.color}`}>{p.val}</p>
              <p className="text-[10px] font-bold text-[#8C8C8C] mt-2 uppercase tracking-widest">{p.sub}</p>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 p-1.5 bg-white dark:bg-[#111827] rounded-[16px] w-fit border border-[#E8E8E8] dark:border-[#1E2A3A]">
          {[
            { id: 'myLoans',    label: 'My Funded Loans' },
            { id: 'openLoans',  label: 'Open Marketplace' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-[12px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#F5A623] text-black shadow-lg shadow-[#F5A623]/20' : 'text-[#8C8C8C] hover:text-[#FAFAF8]'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── MY FUNDED LOANS TAB ── */}
        {activeTab === 'myLoans' && (
          <div className="bg-white dark:bg-[#111827] rounded-[32px] border border-[#E8E8E8] dark:border-[#1E2A3A] overflow-hidden">
            <div className="p-10 border-b border-[#E8E8E8] dark:border-[#1E2A3A] flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Active P2P Deployments</h3>
                <p className="text-[9px] text-[#8C8C8C] uppercase font-bold tracking-[0.2em] mt-1">Direct peer-to-peer lending contracts you have funded</p>
              </div>
              <span className="px-4 py-2 rounded-lg bg-[#1D9E75]/10 text-[#1D9E75] text-[9px] font-black uppercase tracking-widest border border-[#1D9E75]/20">Protocol Secured</span>
            </div>

            {isLoading ? (
              <div className="p-10 space-y-4"><Skeleton h="80px" count={3} /></div>
            ) : lenderLoans.length === 0 ? (
              <div className="p-24 text-center">
                <div className="w-16 h-16 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <iconify-icon icon="lucide:briefcase" className="text-2xl text-[#8C8C8C]"></iconify-icon>
                </div>
                <p className="text-sm font-black text-[#FAFAF8] uppercase tracking-widest mb-2">Portfolio Empty</p>
                <p className="text-[10px] text-[#8C8C8C] max-w-xs mx-auto uppercase font-bold leading-relaxed mb-10">No active capital deployments. Fund a loan from the Open Marketplace tab to start earning yield.</p>
                <button onClick={() => setActiveTab('openLoans')} className="px-8 py-3 bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">View Open Loans →</button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {lenderLoans.map((loan, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="p-10 hover:bg-white/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-[#1E2A3A] flex items-center justify-center font-black text-xs text-[#FAFAF8] border border-[#F5A623]/20 shadow-[0_0_15px_rgba(245,166,35,0.1)]">
                        {loan.borrower.slice(2, 4).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">{shortAddr(loan.borrower)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${loan.status === 1 ? 'bg-[#1D9E75]' : 'bg-[#8C8C8C]'}`}></span>
                          <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">
                            {loan.status === 1 ? 'Active Drawdown' : 'Fulfilled'} • {PATH_LABELS[loan.path] || 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <div className="text-right">
                        <p className="text-lg font-black text-[#FAFAF8] font-cabinet">{loan.amount} TRUST</p>
                        <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest mt-1">{loan.interestRate}% Interest</p>
                      </div>
                      <button
                        onClick={() => navigate('/ledger')}
                        className="px-6 py-4 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] group-hover:text-[#F5A623] group-hover:border-[#F5A623]/30 transition-all"
                      >
                        View TX Ledger
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── OPEN MARKETPLACE TAB ── */}
        {activeTab === 'openLoans' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Open Loan Requests</h3>
                <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest mt-1">Fund a peer's loan request and earn direct interest</p>
              </div>
              <button onClick={() => navigate('/marketplace')} className="text-[10px] font-black text-[#F5A623] border border-[#F5A623]/30 px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
                Full Marketplace
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton h="220px" rounded="24px" />
                <Skeleton h="220px" rounded="24px" />
              </div>
            ) : openRequests.length === 0 ? (
              <div className="bg-[#111827] border-2 border-dashed border-[#1E2A3A] p-32 rounded-[32px] text-center">
                <div className="w-24 h-24 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                  <iconify-icon icon="lucide:search-x" className="text-4xl text-[#8C8C8C]"></iconify-icon>
                </div>
                <h4 className="text-2xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tight mb-3">No Open Requests</h4>
                <p className="text-sm text-[#8C8C8C] max-w-sm mx-auto leading-relaxed">All active requests have been funded. Check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence>
                  {openRequests.map((req) => {
                    const isOwn = req.borrower.toLowerCase() === address?.toLowerCase();
                    const pathColor = PATH_COLORS[req.path] || '#8C8C8C';
                    const returnAmount = (Number(req.amount) * (1 + Number(req.interestRate) / 100)).toFixed(2);

                    return (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111827] rounded-[24px] border border-[#1E2A3A] p-8 relative overflow-hidden hover:shadow-2xl hover:border-[#F5A623]/30 transition-all"
                        style={{ borderLeft: `6px solid ${pathColor}` }}
                      >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#1E2A3A] flex items-center justify-center text-xs font-black text-[#F5A623] border border-white/5">
                              {req.borrower.slice(2, 4).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-black text-[#FAFAF8] font-mono">{shortAddr(req.borrower)}</p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: pathColor }}></span>
                                <span className="text-[8px] font-black uppercase tracking-widest text-[#8C8C8C]">{PATH_LABELS[req.path]}</span>
                              </div>
                            </div>
                          </div>
                          {isOwn && (
                            <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-white/5 text-[#8C8C8C] border border-white/10">Your Request</span>
                          )}
                        </div>

                        {/* Amount */}
                        <div className="mb-6">
                          <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Requesting</p>
                          <p className="text-3xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">{req.amount} TRUST</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 py-5 border-y border-[#1E2A3A] mb-6">
                          <div>
                            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Duration</p>
                            <p className="text-xs font-black text-[#FAFAF8]">{req.duration}d</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">APR</p>
                            <p className="text-xs font-black text-[#1D9E75]">{req.interestRate}%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Return</p>
                            <p className="text-xs font-black text-[#F5A623]">{returnAmount}</p>
                          </div>
                        </div>

                        {/* CTA */}
                        {isOwn ? (
                          <div className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Your Active Request</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleFund(req)}
                            disabled={isFunding === req.id}
                            className="w-full py-5 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(245,166,35,0.15)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                          >
                            {isFunding === req.id ? (
                              <>
                                <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Funding...
                              </>
                            ) : (
                              <>
                                Lend / Participate
                                <iconify-icon icon="lucide:arrow-right" className="text-lg"></iconify-icon>
                              </>
                            )}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* Reputation Growth Widget (only on My Loans tab) */}
        {activeTab === 'myLoans' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white dark:bg-[#111827] p-10 rounded-[32px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
              <h4 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.4em] mb-10">Lender Identity Growth</h4>
              <div className="space-y-8">
                <div className="flex justify-between items-end h-32 gap-2 px-1">
                  {[30, 45, 25, 78, 60, 90, 100].map((v, i) => (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.1 }}
                      key={i} className="flex-1 bg-[#F5A623]/10 hover:bg-[#F5A623] transition-all rounded-t-lg" style={{ height: `${v}%` }}
                    ></motion.div>
                  ))}
                </div>
                <div className="pt-8 border-t border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Reputation Score</span>
                    <span className="text-sm font-black text-[#FAFAF8]">{totalDeployed > 0 ? "75 / 100" : "30 / 100"}</span>
                  </div>
                  <div className="w-full bg-[#1E2A3A] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#F5A623] h-full transition-all" style={{ width: totalDeployed > 0 ? '75%' : '30%' }}></div>
                  </div>
                  <p className="text-[8px] font-bold text-[#8C8C8C] mt-4 uppercase text-center tracking-widest leading-relaxed">
                    {totalDeployed > 0 ? "You are earning reputation as a reliable liquidity provider." : "Initialize capital to build on-chain history."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1D9E75]/5 p-10 rounded-[32px] border border-[#1D9E75]/10 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#1D9E75] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <h5 className="text-[10px] font-black text-[#1D9E75] uppercase tracking-[0.2em] mb-4">Yield Multiplier Active</h5>
              <p className="text-xs text-[#FAFAF8] font-bold leading-relaxed mb-4">Your "Silver Tier" status grants you a <span className="text-[#1D9E75]">+0.5%</span> yield bonus on all active deployments.</p>
              <div className="flex items-center gap-2">
                <iconify-icon icon="lucide:check-circle" className="text-[#1D9E75]"></iconify-icon>
                <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Applied to all funded loans</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
