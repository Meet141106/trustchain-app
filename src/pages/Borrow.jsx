import React, { useState } from 'react';
import AppShell from '../components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Borrow() {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState(5000);
  const [pathway, setPathway] = useState('trust');

  const pathways = [
    { id: 'trust', label: "Sovereign Trust Line", desc: "No collateral, no vouches. Purely reputation-based.", icon: "lucide:crown", rate: "4.2%", limit: "$5,000", vouchers: 0 },
    { id: 'vouch', label: "Syndicate Vouching", desc: "Backed by 3+ circle members with 800+ score.", icon: "lucide:users-2", rate: "2.8%", limit: "$25,000", vouchers: 14 },
    { id: 'collateral', label: "Asset-Backed Line", desc: "Instantly unlock liquidity against real assets.", icon: "lucide:landmark", rate: "1.5%", limit: "$150,000", vouchers: 0 }
  ];

  return (
    <AppShell pageTitle="Credit Drawdown" pageSubtitle="Capital Access Architecture">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Pathway Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Vouch Pathway */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border-2 border-[#F5A623] flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-[#F5A623] text-black text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Recommended</span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623] mb-8">
              <iconify-icon icon="lucide:users-2" className="text-2xl"></iconify-icon>
            </div>
            <h3 className="text-xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] mb-3 uppercase tracking-widest">Community Vouching</h3>
            <p className="text-xs text-[#8C8C8C] leading-relaxed mb-8">3 trusted contacts stake tokens on your behalf. No personal crypto needed.</p>
            
            <div className="space-y-6 mb-10 flex-1">
              <div>
                <p className="text-[9px] font-black text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-[0.2em] mb-4">Voucher Status (1/3)</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1D9E75] border-2 border-[#111827] flex items-center justify-center text-[10px] font-black text-white relative">
                    A <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#1D9E75] border-2 border-[#111827]"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1E2A3A] border-2 border-[#111827] flex items-center justify-center text-[10px] font-black text-[#8C8C8C] relative">
                    ? <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] border-2 border-[#111827]"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1E2A3A] border-2 border-[#111827] flex items-center justify-center text-[10px] font-black text-[#8C8C8C] relative">
                    ? <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] border-2 border-[#111827]"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-[#E8E8E8] dark:border-[#1E2A3A] pt-6">
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Interest Rate</p>
                <p className="text-xl font-black text-[#1D9E75] font-cabinet">4.2% APR</p>
              </div>
            </div>

            <button className="w-full py-4 bg-[#F5A623] text-black rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-[0.98]">
              Request Vouches
            </button>
          </div>

          {/* Card 2: Collateral Pathway */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col group hover:border-[#F5A623]/30 transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#1E2A3A] border border-[#E8E8E8] dark:border-[#1E2A3A] flex items-center justify-center text-[#8C8C8C] mb-8 group-hover:text-[#F5A623]">
              <iconify-icon icon="lucide:shield-check" className="text-2xl"></iconify-icon>
            </div>
            <h3 className="text-xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] mb-3 uppercase tracking-widest">Digital Collateral</h3>
            <p className="text-xs text-[#8C8C8C] leading-relaxed mb-8">Lock crypto into escrow. Auto-released on full repayment.</p>
            
            <div className="space-y-6 mb-10 flex-1">
              <div className="p-4 rounded-lg bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Required Base</p>
                <p className="text-sm font-black text-[#1A1A1A] dark:text-[#FAFAF8]">0.045 ETH ($112.50)</p>
              </div>
              <div className="flex justify-between items-end border-t border-[#E8E8E8] dark:border-[#1E2A3A] pt-6">
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Interest Rate</p>
                <div className="text-right">
                  <p className="text-xl font-black text-[#1D9E75] font-cabinet">2.8% APR</p>
                  <p className="text-[8px] font-black text-[#1D9E75] uppercase tracking-widest">Lower Risk</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 border border-[#F5A623] text-[#F5A623] rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all active:scale-[0.98]">
              Lock Collateral
            </button>
          </div>

          {/* Card 3: Trust-Only Pathway */}
          <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col group hover:border-[#F5A623]/30 transition-all opacity-80 cursor-not-allowed">
            <div className="w-14 h-14 rounded-xl bg-[#1E2A3A] border border-[#E8E8E8] dark:border-[#1E2A3A] flex items-center justify-center text-[#8C8C8C] mb-8">
              <iconify-icon icon="lucide:trending-up" className="text-2xl"></iconify-icon>
            </div>
            <h3 className="text-xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] mb-3 uppercase tracking-widest">Reputation Only</h3>
            <p className="text-xs text-[#8C8C8C] leading-relaxed mb-8">No vouchers. No collateral. Score-based limit only.</p>
            
            <div className="space-y-6 mb-10 flex-1">
              <div className="p-4 rounded-lg bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                 <div className="flex justify-between items-center mb-2">
                    <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Current Limit</p>
                    <span className="px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-[8px] font-black uppercase">$10 Max</span>
                 </div>
                 <div className="h-1 w-full bg-[#1E2A3A] rounded-full">
                    <div className="h-full bg-[#F59E0B] w-1/4"></div>
                 </div>
                 <p className="text-[8px] font-bold text-[#8C8C8C] mt-2 uppercase">Next milestone at score 40</p>
              </div>
              <div className="flex justify-between items-end border-t border-[#E8E8E8] dark:border-[#1E2A3A] pt-6">
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Interest Rate</p>
                <p className="text-xl font-black text-[#8C8C8C] font-cabinet">7.1% APR</p>
              </div>
            </div>

            <button disabled className="w-full py-4 border border-[#E8E8E8] dark:border-[#1E2A3A] text-[#8C8C8C] rounded-[8px] text-[10px] font-black uppercase tracking-widest">
              Limit $10
            </button>
          </div>
        </div>

        {/* Loan Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
            <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest mb-10">Loan Infrastructure</h4>
            
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">Drawdown Amount</p>
                  <p className="text-3xl font-black text-[#F5A623] font-cabinet">$75.00</p>
                </div>
                <input type="range" min="5" max="200" defaultValue="75" className="w-full accent-[#F5A623]" />
                <div className="flex justify-between text-[9px] font-black text-[#8C8C8C] uppercase">
                  <span>Min $5</span>
                  <span>Max $200 (Score 68)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {['Daily', 'Weekly', 'Seasonal'].map(type => (
                   <button key={type} className={`py-4 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all
                    ${type === 'Weekly' ? 'bg-[#F5A623] text-black border-[#F5A623]' : 'bg-[#FAFAF8] dark:bg-[#0A0F1E] text-[#8C8C8C] border-[#E8E8E8] dark:border-[#1E2A3A] hover:border-[#F5A623]'}`}>
                      {type} Cycle
                   </button>
                 ))}
              </div>

              <div className="p-8 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-6">AI Repayment Schedule (Weekly Earner)</p>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="flex justify-between items-center text-[11px]">
                      <span className="text-[#8C8C8C] font-black uppercase tracking-widest">Installment 0{i}</span>
                      <span className="text-[#1A1A1A] dark:text-[#FAFAF8] font-mono">$13.12</span>
                      <span className="text-[#8C8C8C] text-[9px] uppercase">Due Nov {0 + i * 7}</span>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-[#E8E8E8] dark:border-[#1E2A3A] flex justify-between items-center text-xl font-black font-cabinet">
                    <span className="text-[#1A1A1A] dark:text-[#FAFAF8] tracking-tight uppercase text-sm">Total Repayment</span>
                    <span className="text-[#F5A623] font-mono">$78.72</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
              <h5 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.3em] mb-6">AI Trust Assessment</h5>
              <div className="text-center py-6">
                <p className="text-5xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8]">68</p>
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mt-2">Network Quotient</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#1D9E75] text-center text-[10px] font-black uppercase tracking-widest mb-6">
                Approved up to $200
              </div>
              <div className="space-y-3">
                 {[
                   { label: 'Repayment History', pass: true },
                   { label: 'Vouch Quality', pass: true },
                   { label: 'Loan Ratio', pass: true },
                   { label: 'Network Density', pass: false },
                 ].map((pill, i) => (
                   <div key={i} className={`flex items-center justify-between p-3 rounded-lg border text-[9px] font-black uppercase tracking-widest
                    ${pill.pass ? 'bg-[#1D9E75]/5 border-[#1D9E75]/10 text-[#1D9E75]' : 'bg-[#F59E0B]/5 border-[#F59E0B]/10 text-[#F59E0B]'}`}>
                      {pill.label} <span>{pill.pass ? '✓' : '⚠'}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
