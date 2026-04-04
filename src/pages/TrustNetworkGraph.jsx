import React from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';

export default function TrustNetworkGraph() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Trust Network" pageSubtitle="Social Vouch Hub">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Hub Header */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col md:flex-row justify-between items-center gap-8">
           <div>
              <h3 className="text-xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">Syndicate Connectivity</h3>
              <p className="text-[10px] text-[#8C8C8C] uppercase tracking-[0.2em] mt-2">Active reputation links within the TrustLend ecosystem</p>
           </div>
           <div className="bg-[#1E2A3A] px-6 py-4 rounded-[10px] flex gap-8">
              <div className="text-center">
                 <p className="text-[9px] font-black text-[#8C8C8C] mb-1 uppercase">Nodes</p>
                 <p className="text-lg font-black text-[#1A1A1A] dark:text-[#FAFAF8]">24</p>
              </div>
              <div className="text-center">
                 <p className="text-[9px] font-black text-[#8C8C8C] mb-1 uppercase">Circles</p>
                 <p className="text-lg font-black text-[#F5A623]">4</p>
              </div>
           </div>
        </div>

        {/* Syndicate Circles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { name: 'Agri-Credit Syndicate', nodes: 12, health: '98%', icon: 'lucide:sprout' },
             { name: 'Tech Hub Expansion', nodes: 6, health: '94%', icon: 'lucide:cpu' },
             { name: 'Emerging Markets', nodes: 2, health: '82%', icon: 'lucide:globe' },
             { name: 'Public Goods Circular', nodes: 4, health: '100%', icon: 'lucide:heart' }
           ].map((c, i) => (
             <div key={i} className="bg-white dark:bg-[#111827] p-8 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] group hover:border-[#F5A623] transition-all">
                <div className="w-12 h-12 bg-[#FAFAF8] dark:bg-[#0A0F1E] rounded-lg flex items-center justify-center text-[#F5A623] mb-6 group-hover:bg-[#F5A623] group-hover:text-black transition-all">
                   <iconify-icon icon={c.icon} className="text-2xl"></iconify-icon>
                </div>
                <h4 className="text-sm font-black text-[#1A1A1A] dark:text-[#FAFAF8] mb-2">{c.name}</h4>
                <div className="flex justify-between items-center mt-6">
                   <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">{c.nodes} Active Nodes</span>
                   <span className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">{c.health} Health</span>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Detailed Connectivity Feed */}
           <div className="bg-white dark:bg-[#111827] rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] overflow-hidden">
              <div className="p-8 border-b border-[#E8E8E8] dark:border-[#1E2A3A]">
                 <h3 className="text-sm font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">Active Vouch Stream</h3>
              </div>
              <div className="p-8 space-y-6">
                 {[
                   { from: 'Noir Node 84', status: 'Verifying...', date: 'Just now' },
                   { from: 'Syndicate Tech 01', status: 'Attested', date: '2 hours ago' },
                   { from: 'Reserve Pool Alpha', status: 'Attested', date: '1 day ago' }
                 ].map((v, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-[#F5A623]"></div>
                         <span className="text-[10px] font-bold text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">{v.from}</span>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest">{v.status}</p>
                         <p className="text-[8px] text-[#8C8C8C] uppercase tracking-tighter">{v.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Network Expansion UI */}
           <div className="bg-[#F5A623]/5 p-10 rounded-[12px] border border-[#F5A623]/10 flex flex-col justify-center items-center text-center">
              <iconify-icon icon="lucide:user-plus" className="text-5xl text-[#F5A623] mb-6"></iconify-icon>
              <h4 className="text-lg font-black text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet mb-2">Request Social Attestation</h4>
              <p className="text-[11px] text-[#8C8C8C] max-w-sm mb-8">Extend your Trust Network by requesting endorsements from verified nodes. Higher network density reduces interest rates.</p>
              <button className="px-10 py-4 bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-widest rounded-[8px] hover:scale-105 transition-all">
                 Generate Invite Hash
              </button>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
