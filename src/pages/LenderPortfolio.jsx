import React from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function LenderPortfolio() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Lender Portfolio" pageSubtitle="Capital Performance Monitor">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Portfolio Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: 'Deployed Principal', val: '$4,250.00', sub: 'Across 14 Facilities', color: 'text-[#1A1A1A] dark:text-[#FAFAF8]' },
             { label: 'Yield Accrued', val: '$184.22', sub: '+12.4% APY Avg.', color: 'text-[#1D9E75]' },
             { label: 'Reputation Mined', val: '142 QP', sub: 'Silver Tier Progress', color: 'text-[#F5A623]' }
           ].map((p, i) => (
             <div key={i} className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5A623] opacity-[0.02] blur-3xl group-hover:opacity-[0.05] transition-opacity"></div>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">{p.label}</p>
                <p className={`text-4xl font-black font-cabinet ${p.color}`}>{p.val}</p>
                <p className="text-[10px] font-bold text-[#8C8C8C] mt-2 uppercase tracking-widest">{p.sub}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Deployments List */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] overflow-hidden">
             <div className="p-8 border-b border-[#E8E8E8] dark:border-[#1E2A3A] flex justify-between items-center">
                <h3 className="text-sm font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">Active Deployments</h3>
                <span className="px-3 py-1 rounded bg-[#1D9E75]/10 text-[#1D9E75] text-[8px] font-black uppercase tracking-widest">All Health Good</span>
             </div>
             <div className="divide-y divide-[#1E2A3A]">
                {[
                  { name: 'Siddharth M.', amount: '$75.00', yield: '4.2%', maturity: '22 Days', risk: 'Low' },
                  { name: 'Priyanjali K.', amount: '$200.00', yield: '3.1%', maturity: '45 Days', risk: 'Minimal' },
                  { name: 'Reputation Pool Beta', amount: '$1,200.00', yield: '5.8%', maturity: '12 Days', risk: 'Moderate' },
                  { name: 'Node Facility 09', amount: '$450.00', yield: '4.1%', maturity: '82 Days', risk: 'Low' }
                ].map((d, i) => (
                  <div key={i} className="p-8 hover:bg-[#FAFAF8] dark:bg-[#0A0F1E] transition-all flex items-center justify-between group">
                     <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full bg-[#1E2A3A] flex items-center justify-center font-black text-xs text-[#1A1A1A] dark:text-[#FAFAF8] border border-[#F5A623]/20">
                           {d.name[0]}
                        </div>
                        <div>
                           <p className="text-sm font-black text-[#1A1A1A] dark:text-[#FAFAF8]">{d.name}</p>
                           <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Due in {d.maturity}</p>
                        </div>
                     </div>
                     <div className="text-right flex items-center gap-12">
                        <div>
                           <p className="text-sm font-black text-[#1A1A1A] dark:text-[#FAFAF8]">{d.amount}</p>
                           <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest mt-1">{d.yield} Yield</p>
                        </div>
                        <div className="hidden md:block">
                           <button className="px-6 py-3 rounded border border-[#E8E8E8] dark:border-[#1E2A3A] text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] group-hover:text-[#F5A623] group-hover:border-[#F5A623] transition-all">Audit</button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Reputation Gains / QP Mined */}
          <div className="space-y-8">
             <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                <h4 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.3em] mb-8">Reputation Mining (QP)</h4>
                <div className="space-y-6">
                   <div className="flex justify-between items-end h-32 gap-2">
                      {[30, 45, 25, 78, 60, 90, 100].map((v, i) => (
                        <div key={i} className="flex-1 bg-[#F5A623]/10 hover:bg-[#F5A623] transition-all rounded-t-sm" style={{ height: `${v}%` }}></div>
                      ))}
                   </div>
                   <div className="pt-6 border-t border-[#E8E8E8] dark:border-[#1E2A3A]">
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Total QP Mined</span>
                         <span className="text-sm font-black text-[#1A1A1A] dark:text-[#FAFAF8]">1,420 QP</span>
                      </div>
                      <div className="w-full bg-[#1E2A3A] h-1 rounded-full overflow-hidden">
                         <div className="bg-[#F5A623] h-full" style={{ width: '68%' }}></div>
                      </div>
                      <p className="text-[8px] font-bold text-[#8C8C8C] mt-4 uppercase text-center tracking-widest">142 QP until Silver Tier upgrade</p>
                   </div>
                </div>
             </div>

             <div className="bg-[#F5A623]/5 p-8 rounded-[12px] border border-[#F5A623]/10 relative overflow-hidden">
                <iconify-icon icon="lucide:zap" className="absolute -right-4 -top-4 text-6xl text-[#F5A623] opacity-10"></iconify-icon>
                <h5 className="text-[10px] font-black text-[#F5A623] uppercase tracking-widest mb-2">Yield Booster Active</h5>
                <p className="text-[10px] text-[#1A1A1A] dark:text-[#FAFAF8] leading-relaxed">Your "Social Voucher" status grants you a **+0.4%** yield bonus on all active deployments.</p>
             </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
