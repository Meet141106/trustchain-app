import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import Skeleton from '../components/Skeleton';
import { motion } from 'framer-motion';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

export default function LenderPortfolio() {
  const { isDarkMode } = useTheme();
  const { walletAddress: address } = useWallet();
  const navigate = useNavigate();
  const { poolStats, lenderLoans, isLoading } = useLendingPool();

  const totalDeployed = useMemo(() => 
    lenderLoans.reduce((sum, l) => sum + Number(l.amount), 0),
    [lenderLoans]
  );

  const activeInterest = useMemo(() => 
    lenderLoans.reduce((sum, l) => sum + (Number(l.amount) * Number(l.interestRate) / 100), 0),
    [lenderLoans]
  );

  return (
    <AppShell pageTitle="Lender Portfolio" pageSubtitle="Capital Performance Monitor">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Portfolio Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: 'Deployed Principal', val: isLoading ? '...' : `${totalDeployed.toLocaleString()} TRUST`, sub: 'Active P2P Capital', color: 'text-[#FAFAF8]' },
             { label: 'Projected Yield', val: isLoading ? '...' : `${activeInterest.toFixed(1)} TRUST`, sub: `At ${poolStats?.avgInterestRate || 0}% avg APR`, color: 'text-[#1D9E75]' },
             { label: 'Network Standing', val: 'VOUCHER', sub: 'Mining Reputation NFT', color: 'text-[#F5A623]' }
           ].map((p, i) => (
             <div key={i} className="bg-white dark:bg-[#111827] p-10 rounded-[24px] border border-[#E8E8E8] dark:border-[#1E2A3A] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5A623] opacity-[0.02] blur-3xl group-hover:opacity-[0.05] transition-opacity"></div>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">{p.label}</p>
                <p className={`text-4xl font-black font-cabinet ${p.color}`}>{p.val}</p>
                <p className="text-[10px] font-bold text-[#8C8C8C] mt-2 uppercase tracking-widest">{p.sub}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Deployments List (P2P) */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-[32px] border border-[#E8E8E8] dark:border-[#1E2A3A] overflow-hidden">
             <div className="p-10 border-b border-[#E8E8E8] dark:border-[#1E2A3A] flex justify-between items-center">
                <div>
                   <h3 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">Active P2P Deployments</h3>
                   <p className="text-[9px] text-[#8C8C8C] uppercase font-bold tracking-[0.2em] mt-1">Direct peer-to-peer lending contracts</p>
                </div>
                <span className="px-4 py-2 rounded-lg bg-[#1D9E75]/10 text-[#1D9E75] text-[9px] font-black uppercase tracking-widest border border-[#1D9E75]/20">Protocol Secured</span>
             </div>
             
             {isLoading ? <div className="p-10 space-y-4"><Skeleton h="80px" count={3} /></div> : lenderLoans.length === 0 ? (
                  <div className="p-24 text-center">
                      <div className="w-16 h-16 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-6">
                        <iconify-icon icon="lucide:briefcase" className="text-2xl text-[#8C8C8C]"></iconify-icon>
                      </div>
                      <p className="text-sm font-black text-[#FAFAF8] uppercase tracking-widest mb-2">Portfolio Empty</p>
                      <p className="text-[10px] text-[#8C8C8C] max-w-xs mx-auto uppercase font-bold leading-relaxed mb-10">You have no active capital deployments. Provide liquidity in the marketplace to earn protocol yield.</p>
                      <button onClick={() => navigate('/marketplace')} className="px-8 py-3 bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">Go to Marketplace →</button>
                  </div>
             ) : (
                <div className="divide-y divide-white/5">
                   {lenderLoans.map((loan, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                        key={idx} className="p-10 hover:bg-white/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-full bg-[#1E2A3A] flex items-center justify-center font-black text-xs text-[#FAFAF8] border border-[#F5A623]/20 shadow-[0_0_15px_rgba(245,166,35,0.1)]">
                             {loan.borrower.slice(2, 4).toUpperCase()}
                          </div>
                          <div>
                             <p className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">{shortAddr(loan.borrower)}</p>
                             <div className="flex items-center gap-2 mt-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${loan.status === 1 ? 'bg-[#1D9E75]' : 'bg-[#8C8C8C]'}`}></span>
                                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">
                                    {loan.status === 1 ? 'Active Drawdown' : 'Fulfilled'} • {loan.path === 1 ? 'Collateralized' : 'Social-Backed'}
                                </p>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center justify-between md:justify-end gap-12">
                          <div className="text-right">
                             <p className="text-lg font-black text-[#FAFAF8] font-cabinet">{loan.amount} TRUST</p>
                             <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest mt-1">{loan.interestRate}% Interest</p>
                          </div>
                          <button className="px-6 py-4 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] group-hover:text-[#F5A623] group-hover:border-[#F5A623]/30 transition-all">View TX Ledger</button>
                       </div>
                    </motion.div>
                   ))}
                </div>
             )}
          </div>

          {/* Reputation Gains / QP Mined */}
          <div className="space-y-8">
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
        </div>
      </div>
    </AppShell>
  );
}
