import React, { useState } from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import Skeleton, { SkeletonRow } from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

const TX_ICONS = {
  'Loan Requested': { icon: 'lucide:file-plus',      color: '#F5A623', bg: 'rgba(245,166,35,0.08)' },
  'Loan Funded':    { icon: 'lucide:zap',             color: '#1D9E75', bg: 'rgba(29,158,117,0.08)' },
  'Repayment Made': { icon: 'lucide:refresh-ccw',     color: '#627EEA', bg: 'rgba(98,126,234,0.08)' },
  'Loan Defaulted': { icon: 'lucide:alert-octagon',   color: '#EF4444', bg: 'rgba(239,68,68,0.08)'  },
};

export default function TransactionHistory() {
  const { isDarkMode } = useTheme();
  const { transactions, globalActivity, isLoading } = useTransactionHistory();
  const [activeTab, setActiveTab] = useState('Personal');

  const displayData = activeTab === 'Personal' ? transactions : globalActivity;

  const getMeta = (type) => TX_ICONS[type] || { icon: 'lucide:activity', color: '#8C8C8C', bg: 'rgba(140,140,140,0.08)' };

  return (
    <AppShell pageTitle="Transaction History" pageSubtitle="Protocol Ledger Log">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: 'Total Events',    value: isLoading ? '...' : globalActivity.length, color: '#FAFAF8' },
            { label: 'Loans Requested', value: isLoading ? '...' : globalActivity.filter(t => t.type === 'Loan Requested').length, color: '#F5A623' },
            { label: 'Loans Funded',    value: isLoading ? '...' : globalActivity.filter(t => t.type === 'Loan Funded').length,    color: '#1D9E75' },
            { label: 'Repayments',      value: isLoading ? '...' : globalActivity.filter(t => t.type === 'Repayment Made').length,  color: '#627EEA' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] p-8 rounded-[20px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-3xl font-black font-cabinet" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

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
          <div className="p-10 border-b border-[#E8E8E8] dark:border-[#1E2A3A] flex justify-between items-center">
            <div>
              <h3 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter">
                {activeTab === 'Personal' ? 'Your Protocol Activity' : 'Live Platform Feed'}
              </h3>
              <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-[0.2em] mt-1">
                {activeTab === 'Personal' ? 'Events tied to your wallet address' : 'Real-time ledger of all protocol credit events'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse"></span>
              <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Live</span>
            </div>
          </div>

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
                  <tr><td colSpan={5} className="p-10"><SkeletonRow count={5} /></td></tr>
                ) : displayData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-24 text-center">
                      <div className="w-16 h-16 bg-[#1E2A3A] rounded-full flex items-center justify-center mx-auto mb-6">
                        <iconify-icon icon="lucide:scroll" className="text-2xl text-[#8C8C8C]"></iconify-icon>
                      </div>
                      <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">
                        {activeTab === 'Personal' ? 'No activity tied to your wallet yet.' : 'No protocol events recorded yet.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {displayData.map((tx, i) => {
                      const meta = getMeta(tx.type);
                      return (
                        <motion.tr
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          key={tx.id || i}
                          className="hover:bg-[#F5A623]/5 transition-all group border-l-2 border-transparent hover:border-l-[#F5A623]"
                        >
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-5">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 shadow-inner flex-shrink-0"
                                style={{ background: meta.bg, color: meta.color }}
                              >
                                <iconify-icon icon={meta.icon} className="text-xl"></iconify-icon>
                              </div>
                              <span className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">{tx.type}</span>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className="text-[10px] font-mono font-bold text-[#8C8C8C] uppercase tracking-widest">{shortAddr(tx.user)}</span>
                          </td>
                          <td className="px-10 py-8">
                            <span className="text-sm font-black font-cabinet text-[#FAFAF8]">{tx.value}</span>
                          </td>
                          <td className="px-10 py-8">
                            <span
                              className="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border"
                              style={{
                                background: `${meta.bg}`,
                                color: meta.color,
                                borderColor: `${meta.color}33`
                              }}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right font-mono text-[10px] text-[#8C8C8C] group-hover:text-[#F5A623] transition-colors">
                            {tx.hash ? tx.hash.slice(0, 12) + '...' : '—'}
                          </td>
                        </motion.tr>
                      );
                    })}
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
