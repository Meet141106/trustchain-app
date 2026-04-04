import React from 'react';
import AppShell from '../components/AppShell';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Marketplace() {
  const { isDarkMode } = useTheme();

  const requests = [
    { id: 1, borrower: "Sovereign Node 452", amount: "$5,000", score: 842, rate: "2.4% APR", term: "90 Days", status: "Open", vouchers: 12 },
    { id: 2, borrower: "Reputation Circle Beta", amount: "$12,400", score: 790, rate: "3.1% APR", term: "180 Days", status: "Open", vouchers: 8 },
    { id: 3, borrower: "Archway Verified Individual", amount: "$2,800", score: 620, rate: "4.5% APR", term: "30 Days", status: "Open", vouchers: 5 },
    { id: 4, borrower: "Syndicate Genesis Pool", amount: "$45,000", score: 910, rate: "1.9% APR", term: "365 Days", status: "Open", vouchers: 24 }
  ];

  return (
    <AppShell pageTitle="Liquidity Archway" pageSubtitle="Marketplace">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Marketplace Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: "Archway Liquidity", val: "$1.4M", icon: "lucide:droplets" },
            { label: "Deployment Yield", val: "3.42%", icon: "lucide:trending-up" },
            { label: "Protocol Fidelity", val: "99.2%", icon: "lucide:shield-check" }
          ].map((stat, idx) => (
            <div key={stat.label} className={`p-10 rounded-[2.5rem] border ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37]">
                  <iconify-icon icon={stat.icon} className="text-2xl"></iconify-icon>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-1 font-cabinet">{stat.label}</p>
                  <p className={`text-2xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{stat.val}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Request List Table */}
        <div className={`rounded-[3rem] border overflow-hidden ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${isDarkMode ? 'bg-black/20' : 'bg-[#FAFAF8]'} border-b border-[#E8E8E8] dark:border-[#333]`}>
                <th className="px-12 py-8 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Archway Member</th>
                <th className="px-8 py-8 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Capital Request</th>
                <th className="px-8 py-8 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Trust Level</th>
                <th className="px-8 py-8 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Social Vouch</th>
                <th className="px-12 py-8 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] text-right">Audit</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-[#333]' : 'divide-[#F5F3F0]'}`}>
              {requests.map((req, idx) => (
                <motion.tr 
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-[#FAFAF8] dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A6E2F] flex items-center justify-center text-white text-xs font-black shadow-xl">
                          {req.borrower.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full border-2 border-white dark:border-[#1A1A1A] flex items-center justify-center">
                          <iconify-icon icon="lucide:check" className="text-[10px] text-white"></iconify-icon>
                        </div>
                      </div>
                      <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        {req.borrower}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <p className={`text-lg font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>{req.amount}</p>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-1">{req.term} @ {req.rate}</p>
                  </td>
                  <td className="px-8 py-10">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${req.score > 800 ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#D4AF37]/10 text-[#D4AF37]'}`}>
                        {req.score} QP
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <div className="flex items-center gap-2">
                      <iconify-icon icon="lucide:users-2" className="text-[#8C8C8C]"></iconify-icon>
                      <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">{req.vouchers} Vouchers</span>
                    </div>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <button className="px-8 py-4 rounded-full bg-[#1A1A1A] text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all font-black text-[10px] tracking-[0.2em] uppercase dark:bg-[#D4AF37] dark:text-black dark:group-hover:bg-white active:scale-95">
                      Fund Facility
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
