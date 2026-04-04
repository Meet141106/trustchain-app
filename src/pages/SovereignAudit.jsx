import React from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function SovereignAudit() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Sovereign Audit" pageSubtitle="Credit Identity Verification">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Profile Identity Header */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#FAFAF8] dark:bg-[#0A0F1E] border-2 border-[#F5A623] flex items-center justify-center font-black text-2xl text-[#1A1A1A] dark:text-[#FAFAF8]">M</div>
              <div>
                 <h2 className="text-2xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8]">Meet_Projects</h2>
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1 font-mono">ID: 0x71C...4f2a</p>
              </div>
           </div>
           <div className="flex gap-12">
              <div className="text-center">
                 <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Current Limit</p>
                 <p className="text-2xl font-black text-[#1A1A1A] dark:text-[#FAFAF8]">$200.00</p>
              </div>
              <div className="text-center">
                 <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Global Rank</p>
                 <p className="text-2xl font-black text-[#F5A623]">#1,242</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Trust Score DNA (Radar Concept) */}
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col items-center">
             <h4 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.3em] mb-12 self-start">Reputation DNA Synthesis</h4>
             
             <div className="relative w-64 h-64 border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-full flex items-center justify-center">
                {/* Simulated Radar Chart */}
                <div className="absolute inset-0 border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-full scale-75 opacity-50"></div>
                <div className="absolute inset-0 border border-[#E8E8E8] dark:border-[#1E2A3A] rounded-full scale-50 opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[8px] font-black text-[#8C8C8C] uppercase">Identity</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-[8px] font-black text-[#8C8C8C] uppercase">Capital</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 text-[8px] font-black text-[#8C8C8C] uppercase">Social</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 text-[8px] font-black text-[#8C8C8C] uppercase">History</div>
                
                <div className="w-32 h-32 bg-[#F5A623]/20 border border-[#F5A623] clip-path-polygon absolute rotate-45 transform"></div>
                <p className="text-5xl font-black text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet z-10">68</p>
             </div>
             
             <div className="mt-12 grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Identity Proof', val: '92%' },
                  { label: 'Social Density', val: '71%' },
                  { label: 'Capital Health', val: '45%' },
                  { label: 'Settlement History', val: '100%' }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                     <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">{s.label}</span>
                     <span className="text-xs font-black text-[#1A1A1A] dark:text-[#FAFAF8]">{s.val}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-8">
             <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                <h4 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.3em] mb-8">Verification Matrix</h4>
                <div className="space-y-6">
                   {[
                     { label: 'Biometric KYC Verification', status: 'Completed', icon: 'lucide:badge-check', active: true },
                     { label: 'Secondary Social Linking', status: '80% Synced', icon: 'lucide:link', active: true },
                     { label: 'On-chain Governance History', status: 'Insufficient', icon: 'lucide:clock', active: false },
                     { label: 'Global AML Clearance', status: 'Verified', icon: 'lucide:shield-check', active: true }
                   ].map((v, i) => (
                     <div key={i} className={`flex items-center justify-between p-6 rounded-xl border transition-all ${v.active ? 'bg-[#1D9E75]/5 border-[#1D9E75]/20' : 'bg-[#FAFAF8] dark:bg-[#0A0F1E] border-[#E8E8E8] dark:border-[#1E2A3A]'}`}>
                        <div className="flex items-center gap-4">
                           <iconify-icon icon={v.icon} className={`text-xl ${v.active ? 'text-[#1D9E75]' : 'text-[#8C8C8C]'}`}></iconify-icon>
                           <p className="text-[10px] font-black text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">{v.label}</p>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${v.active ? 'text-[#1D9E75]' : 'text-[#8C8C8C]'}`}>{v.status}</span>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 py-5 border border-[#F5A623] text-[#F5A623] rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-[#F5A623] hover:text-black transition-all">
                   Upgrade Verification Tier
                </button>
             </div>

             <div className="p-8 rounded-[12px] bg-[#F59E0B]/5 border border-[#F59E0B]/10">
                <p className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest mb-2">Insight</p>
                <p className="text-[10px] text-[#1A1A1A] dark:text-[#FAFAF8] leading-relaxed">Completing the **"On-chain Governance"** module will likely boost your trust score by **+12 pts** and unlock a **$500.00** borrow limit.</p>
             </div>
          </div>
        </div>
        
        {/* Credit Limit Evolution */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
           <div className="flex justify-between items-center mb-10">
              <h4 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.3em]">Credit Limit Evolution</h4>
              <div className="flex gap-4">
                 <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">3 Month History</span>
              </div>
           </div>
           
           <div className="h-40 flex items-end gap-1 px-4">
              {[20, 20, 20, 35, 35, 35, 60, 60, 68, 68, 68, 68].map((h, i) => (
                <div key={i} className="flex-1 bg-[#1E2A3A] group relative cursor-help" style={{ height: `${h}%` }}>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#F5A623] text-black text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h*3}
                   </div>
                   <div className={`w-full h-full ${i > 7 ? 'bg-[#F5A623]' : 'bg-[#1E2A3A]'}`}></div>
                </div>
              ))}
           </div>
           
           <div className="flex justify-between items-center mt-6 text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest">
              <span>Aug 24</span>
              <span>Sept 24</span>
              <span>Oct 24</span>
              <span className="text-[#F5A623]">Present</span>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
