import React, { useState } from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import Skeleton, { SkeletonRow } from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

export default function TransactionHistory() {
  const { isDarkMode } = useTheme();
  const { transactions, globalActivity, isLoading } = useTransactionHistory();
  const [activeTab, setActiveTab] = useState('Personal');

  const displayData = activeTab === 'Personal' ? transactions : globalActivity;

  return (
    <AppShell pageTitle="Transaction History" pageSubtitle="Protocol Ledger Log">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Tab Selection */}
        <div className="flex gap-4 p-1.5 bg-white dark:bg-[#111827] rounded-[16px] w-fit border border-[#E8E8E8] dark:border-[#1E2A3A]">
           {[
             { id: 'Personal', label: 'Your Activity' },
             { id: 'Global',   label: 'Platform Feed' }
           ].map((tab) => (
             <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-[12px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#F5A623] text-black shadow-lg shadow-[#F5A623]/20' : 'text-[#8C8C8C] hover:text-[#FAFAF8]'}`}>
                {tab.label}
             </button>
           ))}
        </div>

        {/* Transaction Table */}
        <div className="bg-white dark:bg-[#111827] rounded-[32px] border border-[#E8E8E8] dark:border-[#1E2A3A] overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-[#E8E8E8] dark:border-[#1E2A3A] bg-[#FAFAF8]/5 dark:bg-[#0A0F1E]/50">
                       <th className="px-10 py-8 text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Transaction Type</th>
                       <th className="px-10 py-8 text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Counterparty Node</th>
                       <th className="px-10 py-8 text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Magnitude</th>
                       <th className="px-10 py-8 text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Protocol Status</th>
                       <th className="px-10 py-8 text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] text-right">Execution Block</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {isLoading ? (
                      <tr><td colSpan={5} className="p-10"><SkeletonRow count={4} /></td></tr>
                    ) : displayData.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-24 text-center">
                            <div className="w-16 h-16 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-6">
                                <iconify-icon icon="lucide:scroll" className="text-2xl text-[#8C8C8C]"></iconify-icon>
                            </div>
                            <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">No protocol events recorded in this sector.</p>
                        </td>
                      </tr>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {displayData.map((tx, i) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                key={tx.id || i} className="hover:bg-[#F5A623]/5 transition-all group">
                                <td className="px-10 py-8 flex items-center gap-5">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.positive ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 'bg-[#EF4444]/10 text-[#EF4444]'} border border-white/5 shadow-inner`}>
                                        <iconify-icon icon={tx.icon} className="text-xl"></iconify-icon>
                                    </div>
                                    <span className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">{tx.type}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className="text-[10px] font-mono font-bold text-[#8C8C8C] uppercase tracking-widest">{shortAddr(tx.user)}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`text-sm font-black font-cabinet ${tx.positive ? 'text-[#FAFAF8]' : 'text-[#8C8C8C]'}`}>{tx.value}</span>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${tx.status === 'Executed' || tx.status === 'Settled' || tx.status === 'Verified' ? 'bg-[#1D9E75]/10 text-[#1D9E75] border-[#1D9E75]/20' : 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20'}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-10 py-8 text-right font-mono text-[10px] text-[#8C8C8C] group-hover:text-[#F5A623] transition-colors">
                                    {tx.hash.slice(0, 12)}...
                                </td>
                            </motion.tr>
                            ))}
                        </AnimatePresence>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
