import React from 'react';
import AppShell from '../components/AppShell';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Marketplace() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Liquidity Archway" pageSubtitle="Capital Deployment Interface">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Marketplace Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Pool Liquidity', val: '$1.2M+', trend: '+12%', color: 'text-[#1D9E75]' },
            { label: 'Avg. Protocol Yield', val: '4.8%', trend: 'Stable', color: 'text-[#F5A623]' },
            { label: 'Active Requests', val: '142', trend: 'High Demand', color: 'text-[#F5A623]' },
            { label: 'Default Rate', val: '0.12%', trend: '-0.04%', color: 'text-[#1D9E75]' }
          ].map((m, i) => (
            <div key={i} className="bg-[#111827] p-6 rounded-[12px] border border-[#1E2A3A]">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">{m.label}</p>
              <p className={`text-2xl font-black font-cabinet ${m.color}`}>{m.val}</p>
              <p className="text-[8px] font-bold text-[#8C8C8C] mt-2 uppercase tracking-widest">{m.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filter Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#111827] p-8 rounded-[12px] border border-[#1E2A3A]">
              <h4 className="text-[10px] font-black text-[#F5A623] uppercase tracking-[0.3em] mb-8">Refine Search</h4>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-[#FAFAF8] uppercase tracking-widest">Yield Range</p>
                  <div className="flex gap-2 flex-wrap">
                    {['<3%', '3-5%', '5-8%', '8%+'].map(y => (
                      <button key={y} className="px-3 py-1 rounded bg-[#0A0F1E] border border-[#1E2A3A] text-[9px] font-black text-[#8C8C8C] hover:border-[#F5A623] transition-all">{y}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[9px] font-black text-[#FAFAF8] uppercase tracking-widest">Risk Frontier</p>
                  <div className="space-y-2">
                    {['Sovereign (Low)', 'Syndicate (Mid)', 'Emergent (High)'].map(r => (
                      <label key={r} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border border-[#1E2A3A] bg-[#0A0F1E] group-hover:border-[#F5A623]"></div>
                        <span className="text-[10px] font-black text-[#8C8C8C] uppercase group-hover:text-[#FAFAF8]">{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1E2A3A]">
                  <button className="w-full py-4 bg-[#1E2A3A] text-white rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-[#F59E0B] hover:text-black transition-all">
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/10 text-[#F59E0B]">
               <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  Tip: Loans with 3+ vouchers have a 99.8% historical repayment rate.
               </p>
            </div>
          </div>

          {/* Opportunity Grid */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-widest">Vouching Opportunities</h3>
               <div className="flex bg-[#111827] p-1 rounded-lg border border-[#1E2A3A]">
                  <button className="px-4 py-2 bg-[#F5A623] text-black text-[9px] font-black uppercase rounded-md tracking-widest">Live</button>
                  <button className="px-4 py-2 text-[#8C8C8C] text-[9px] font-black uppercase rounded-md tracking-widest">Funded</button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Siddharth M.', score: 68, amount: '$75.00', yield: '4.2%', vouched: '1/3', tags: ['Education', 'Tech'] },
                { name: 'Priyanjali K.', score: 82, amount: '$200.00', yield: '3.1%', vouched: '3/3', tags: ['Agri', 'Safe'] },
                { name: 'Rahul V.', score: 54, amount: '$40.00', yield: '6.8%', vouched: '0/3', tags: ['Retail'] },
                { name: 'Zoya A.', score: 71, amount: '$120.00', yield: '3.9%', vouched: '2/3', tags: ['Gig Work'] }
              ].map((loan, i) => (
                <div key={i} className="bg-[#111827] p-8 rounded-[12px] border border-[#1E2A3A] hover:border-[#F5A623]/40 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="text-[8px] font-black text-[#F5A623] uppercase tracking-widest">{loan.vouched} Vouched</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#1E2A3A] flex items-center justify-center font-black text-xs text-[#FAFAF8] border border-[#F5A623]/20">
                      {loan.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#FAFAF8]">{loan.name}</p>
                      <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">Score: {loan.score}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Requesting</p>
                        <p className="text-xl font-black text-[#FAFAF8] font-cabinet">{loan.amount}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Target Yield</p>
                        <p className="text-xl font-black text-[#1D9E75] font-cabinet">{loan.yield}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                       {loan.tags.map(t => (
                         <span key={t} className="px-2 py-0.5 rounded bg-[#0A0F1E] border border-[#1E2A3A] text-[8px] font-black text-[#8C8C8C] uppercase">{t}</span>
                       ))}
                    </div>

                    <Link to="/loan-request-detail" className="block w-full py-4 border border-[#F5A623] text-[#F5A623] rounded-[8px] text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#F5A623] hover:text-black transition-all">
                      Audit Request
                    </Link>
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
