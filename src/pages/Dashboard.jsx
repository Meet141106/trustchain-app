import React from 'react';
import AppShell from '../components/AppShell';
import TrustScoreMeter from '../components/TrustScoreMeter';
import LoanCard from '../components/LoanCard';
import HealthIndicator from '../components/HealthIndicator';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Dashboard() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Solvent Terminal" pageSubtitle="Real-time Capital & Trust Synthesis">
      <div className="max-w-7xl mx-auto space-y-10 pb-24">
        
        {/* TOP ROW: Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Trust Score Radial */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col items-center group transition-all hover:border-[#F5A623]/50">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.8" fill="transparent" stroke="#1E2A3A" strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="15.8" fill="transparent" stroke="#F5A623" strokeWidth="3" 
                  strokeDasharray="68 100" 
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: "68 100" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8]">68</span>
                <span className="text-[10px] text-[#8C8C8C] font-black uppercase tracking-widest mt-1">/ 100</span>
              </div>
            </div>
            <div className="text-center mt-6">
              <h4 className="text-sm font-black text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest font-cabinet">Silver Tier</h4>
              <p className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-widest mt-1">+6 pts this month</p>
            </div>
          </div>

          {/* Borrow Limit */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col justify-center group transition-all hover:border-[#F5A623]/50">
            <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest mb-4">Borrow Limit</p>
            <div className="flex items-center gap-4">
              <h3 className="text-4xl font-black tracking-tighter text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet">$200.00</h3>
              <iconify-icon icon="lucide:arrow-up-right" className="text-2xl text-[#1D9E75] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></iconify-icon>
            </div>
            <p className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest mt-4">Unlocked at score 60+</p>
          </div>

          {/* Active Loan */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col justify-center group transition-all hover:border-[#F5A623]/50">
            <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest mb-4">Active Drawdown</p>
            <h3 className="text-4xl font-black tracking-tighter text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet">$47.50</h3>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></div>
              <p className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest">Due in 8 days</p>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: 2 Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vouch Network Health */}
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] mb-8 uppercase tracking-widest">Vouch Network Health</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 h-48 items-center justify-center relative">
               {/* Visual placeholder for connection graph */}
               <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <svg className="w-full h-full">
                    <line x1="30%" y1="50%" x2="70%" y2="50%" stroke="#F5A623" strokeWidth="1" strokeDasharray="4" />
                    <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="#F5A623" strokeWidth="1" strokeDasharray="4" />
                  </svg>
               </div>
               
               <div className="space-y-6 relative z-10 w-full col-span-2">
                {[
                  { name: 'Arnab G.', score: 82, status: 'Active Voucher', color: '#1D9E75' },
                  { name: 'Megha S.', score: 71, status: 'Active Voucher', color: '#1D9E75' },
                  { name: 'Priya K.', score: 0, status: 'Pending Verification', color: '#F59E0B' }
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#FAFAF8]/50 dark:bg-[#0A0F1E]/50 p-3 rounded-lg border border-[#E8E8E8]/50 dark:border-[#1E2A3A]/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#F5A623]/20 flex items-center justify-center text-[10px] font-bold text-[#F5A623]">
                        {node.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#1A1A1A] dark:text-[#FAFAF8]">{node.name}</p>
                        <p className={`text-[9px] font-black uppercase tracking-widest`} style={{ color: node.color }}>{node.status}</p>
                      </div>
                    </div>
                    {node.score > 0 && <span className="text-[11px] font-black text-[#F5A623] font-mono">{node.score}/100</span>}
                  </div>
                ))}
               </div>
            </div>
            <button className="w-full py-4 border border-[#F5A623] text-[#F5A623] rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all active:scale-[0.98]">
              Add Voucher Node
            </button>
          </div>

          {/* Repayment Rhythm */}
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">Repayment Rhythm</h4>
              <span className="px-3 py-1 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[9px] font-black uppercase text-[#1D9E75] tracking-widest">
                Weekly Earner
              </span>
            </div>
            
            <div className="space-y-10">
              <div className="p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                 <div className="flex justify-between mb-4">
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Next Installment</p>
                    <p className="text-[12px] font-black text-[#1A1A1A] dark:text-[#FAFAF8]">$15.80 • Oct 12</p>
                 </div>
                 <div className="h-2 w-full bg-[#1E2A3A] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-[#F5A623] rounded-full"
                    />
                 </div>
                 <p className="text-[9px] font-bold text-[#8C8C8C] mt-3 uppercase tracking-widest text-right">3 of 6 installments paid</p>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-xl bg-[#1D9E75]/5 border border-[#1D9E75]/10">
                <div className="w-16 h-16 rounded-full bg-[#1D9E75]/10 flex items-center justify-center text-3xl">🔥</div>
                <div>
                  <p className="text-xl font-black text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet tracking-tight">3 On-Time Streak</p>
                  <p className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest mt-1">Maintaining Rhythm Velocity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Activity */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
          <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest mb-10">Recent On-Chain Activity</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#E8E8E8] dark:border-[#1E2A3A]">
                <tr className="text-left">
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Transaction</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Amount</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Date</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Status</th>
                  <th className="pb-6 text-right text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2A3A]">
                {[
                  { type: 'Capital Repayment', amount: '+$15.80', date: 'Oct 04, 2024', status: 'Confirmed', statusColor: 'text-[#1D9E75]', icon: 'lucide:arrow-up', color: 'text-[#1D9E75]' },
                  { type: 'Capital Drawdown', amount: '-$75.00', date: 'Sep 28, 2024', status: 'Confirmed', statusColor: 'text-[#1D9E75]', icon: 'lucide:arrow-down', color: 'text-[#EF4444]' },
                  { type: 'Vouch Handshake', amount: '—', date: 'Sep 25, 2024', status: 'Confirmed', statusColor: 'text-[#1D9E75]', icon: 'lucide:users', color: 'text-[#F5A623]' },
                  { type: 'Yield Inflow', amount: '+$0.40', date: 'Sep 21, 2024', status: 'Pending', statusColor: 'text-[#F59E0B]', icon: 'lucide:star', color: 'text-[#F59E0B]' }
                ].map((tx, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] group transition-all duration-300">
                    <td className="py-6 flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A] transition-colors group-hover:border-[#F5A623]/30 ${tx.color}`}>
                        <iconify-icon icon={tx.icon}></iconify-icon>
                      </div>
                      <span className="font-bold text-sm text-[#1A1A1A] dark:text-[#FAFAF8]">{tx.type}</span>
                    </td>
                    <td className={`py-6 font-mono font-black text-sm ${tx.color}`}>{tx.amount}</td>
                    <td className="py-6 text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">{tx.date}</td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                        ${tx.status === 'Confirmed' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <a href="#" className="text-[10px] font-mono text-[#8C8C8C] hover:text-[#F5A623] transition-colors flex items-center justify-end gap-1">
                        0x2a1b...9f3c <iconify-icon icon="lucide:external-link" className="text-[8px]"></iconify-icon>
                      </a>
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
