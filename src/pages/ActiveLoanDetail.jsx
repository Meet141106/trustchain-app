import React from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ActiveLoanDetail() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Active Lifecycle" pageSubtitle="Real-time Capital Monitoring">
      <div className="max-w-7xl mx-auto space-y-10 pb-24">
        
        {/* TOP SECTION: Loan Identity Card */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#1D9E75]"></div>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[#8C8C8C] tracking-widest uppercase">ID: TL-2024-00847</span>
              <span className="px-3 py-1 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[9px] font-bold uppercase text-[#1D9E75] tracking-widest">Active — On Track</span>
            </div>
            <h2 className="text-5xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] tracking-tighter mb-2">$75.00</h2>
            <div className="flex gap-6 mt-4">
               <div>
                  <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Disbursed</p>
                  <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">Oct 01, 2024</p>
               </div>
               <div>
                  <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Due Date</p>
                  <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">Dec 01, 2024</p>
               </div>
               <div>
                  <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Remains</p>
                  <p className="text-xs font-black text-[#F5A623]">58 Days</p>
               </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-4 py-2 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[10px] font-black uppercase text-[#1D9E75] tracking-widest mb-4">Weekly Earner Archetype</span>
            <div className="text-right">
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Next Settlement</p>
              <p className="text-xl font-black text-[#1A1A1A] dark:text-[#FAFAF8] font-mono">$13.12</p>
            </div>
          </div>
        </div>

        {/* CAPITAL HEALTH MONITOR */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
          <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest mb-10 text-center">Capital Health Monitor</h4>
          <div className="space-y-8">
            <div className="relative h-4 w-full bg-[#1E2A3A] rounded-full overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-[#1D9E75] via-[#F5A623] to-[#EF4444] opacity-20"></div>
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-[#1D9E75] relative shadow-[0_0_15px_rgba(29,158,117,0.5)]"
               />
               <div className="absolute top-0 left-[75%] bottom-0 w-0.5 bg-white/50 z-20"></div>
               <div className="absolute top-[120%] left-[75%] transform -translate-x-1/2 text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest">Liquidation Threshold</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Collateral Ratio</p>
                 <p className="text-2xl font-black text-[#1D9E75] font-cabinet">142% <span className="text-xs text-[#8C8C8C] font-black tracking-widest ml-2 uppercase">— SECURED</span></p>
                 <p className="text-[9px] font-bold text-[#8C8C8C] mt-2 uppercase">Protocol target: 120% min.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Social Backing</p>
                 <p className="text-2xl font-black text-[#F5A623] font-cabinet">3 Vouchers <span className="text-xs text-[#8C8C8C] font-black tracking-widest ml-2 uppercase">— ACTIVE</span></p>
                 <p className="text-[9px] font-bold text-[#8C8C8C] mt-2 uppercase">Combined Stake: $90.00 equivalent</p>
              </div>
            </div>
          </div>
        </div>

        {/* REPAYMENT TIMELINE */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
          <div className="flex justify-between items-center mb-12">
            <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">Repayment Timeline</h4>
            <div className="flex items-center gap-2 text-[#F5A623]">
              <span className="text-2xl">🔥</span>
              <p className="text-[10px] font-black uppercase tracking-widest">3 consecutive on-time payments</p>
            </div>
          </div>
          
          <div className="relative flex justify-between items-start pt-8 pb-12 px-4 md:px-12">
            <div className="absolute top-12 left-0 right-0 h-1 bg-[#1E2A3A] z-0"></div>
            {[
              { id: 1, status: 'Paid', date: 'Oct 07', amount: '$13.12' },
              { id: 2, status: 'Paid', date: 'Oct 14', amount: '$13.12' },
              { id: 3, status: 'Paid', date: 'Oct 21', amount: '$13.12' },
              { id: 4, status: 'Current', date: 'Oct 28', amount: '$13.12' },
              { id: 5, status: 'Upcoming', date: 'Nov 04', amount: '$13.12' },
              { id: 6, status: 'Upcoming', date: 'Nov 11', amount: '$13.12' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-500
                  ${step.status === 'Paid' ? 'bg-[#1D9E75] border-[#111827] shadow-[0_0_10px_rgba(29,158,117,1)] text-white' : 
                    step.status === 'Current' ? 'bg-[#F5A623] border-[#111827] shadow-[0_0_10px_rgba(245,166,35,1)] animate-pulse' : 
                    'bg-[#1E2A3A] border-[#111827]'}`}>
                  {step.status === 'Paid' && <iconify-icon icon="lucide:check" className="text-xs"></iconify-icon>}
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest mb-1">{step.status}</p>
                  <p className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest">{step.date}</p>
                  <p className="text-[8px] font-mono text-[#8C8C8C] mt-1">{step.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI RISK FRONTIER */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest mb-10">AI Risk Frontier</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                  <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">Current Risk</p>
                  <p className="text-2xl font-black text-[#1D9E75] uppercase font-cabinet">Low</p>
               </div>
               <div className="text-center p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                  <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">Score Projection</p>
                  <p className="text-2xl font-black text-[#F5A623] font-mono">74 (+6)</p>
                  <p className="text-[8px] font-bold text-[#8C8C8C] mt-1 uppercase tracking-widest">After full repayment</p>
               </div>
               <div className="text-center p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                  <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">Next Limit</p>
                  <p className="text-2xl font-black text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet">$200</p>
                  <p className="text-[8px] font-bold text-[#8C8C8C] mt-1 uppercase tracking-widest">Tier Expansion Ready</p>
               </div>
            </div>
            <div className="mt-10 flex gap-4">
              <button className="flex-1 py-4 bg-[#F5A623] text-black rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-[0.98]">
                Make Repayment
              </button>
              <button className="flex-1 py-4 border border-[#F5A623] text-[#F5A623] rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
                View Vouchers
              </button>
              <button disabled className="px-6 py-4 border border-[#E8E8E8] dark:border-[#1E2A3A] text-[#8C8C8C] rounded-[8px] text-[10px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed">
                Restructure
              </button>
            </div>
          </div>

          {/* VOUCHER STATUS MINI PANEL */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <h4 className="text-[10px] font-black font-cabinet tracking-tight text-[#F5A623] uppercase tracking-[0.3em] mb-8">Voucher Performance</h4>
            <div className="space-y-6">
              {[
                { name: 'Arnab G.', amount: '$30.00', yield: '$0.47', avatar: 'A' },
                { name: 'Megha S.', amount: '$30.00', yield: '$0.47', avatar: 'M' },
                { name: 'Ravi D.', amount: '$30.00', yield: '$0.47', avatar: 'R' },
              ].map((v, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8]/50 dark:border-[#1E2A3A]/50">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1E2A3A] flex items-center justify-center font-black text-xs text-[#1A1A1A] dark:text-[#FAFAF8] border border-[#F5A623]/20">{v.avatar}</div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A1A] dark:text-[#FAFAF8]">{v.name}</p>
                        <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest">Staking {v.amount}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-[#1D9E75] font-mono">{v.yield}</p>
                      <p className="text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest">Earned</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
