import React, { useState } from 'react';
import AppShell from '../components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Borrow() {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState(5000);
  const [pathway, setPathway] = useState('trust');

  const pathways = [
    { id: 'trust', label: "Sovereign Trust Line", desc: "No collateral, no vouches. Purely reputation-based.", icon: "lucide:crown", rate: "4.2%", limit: "$5,000" },
    { id: 'vouch', label: "Syndicate Vouching", desc: "Backed by 3+ circle members with 800+ score.", icon: "lucide:users-2", rate: "2.8%", limit: "$25,000" },
    { id: 'collateral', label: "Asset-Backed Line", desc: "Instantly unlock liquidity against real assets.", icon: "lucide:landmark", rate: "1.5%", limit: "$150,000" }
  ];

  return (
    <AppShell title="Credit Drawdown" subtitle="Initialize Capital Request">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Column: Request Configuration */}
        <div className="col-span-12 lg:col-span-7 space-y-12">
          
          <div className={`p-12 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden group
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h4 className={`text-2xl font-black font-cabinet tracking-tighter mb-12 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Configure Drawdown</h4>
            
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Requested Amount</label>
                  <span className={`text-4xl font-black font-cabinet tracking-tight ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>${amount.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="50000" 
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#E8E8E8] dark:bg-[#333] rounded-full appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-4 block">Select Verification Pathway</label>
                <div className="grid grid-cols-1 gap-6">
                  {pathways.map((p) => (
                    <motion.div 
                      key={p.id}
                      onClick={() => setPathway(p.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between gap-6
                        ${pathway === p.id 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                          : isDarkMode ? 'border-[#333] bg-black/10 hover:border-[#444]' : 'border-[#E8E8E8] bg-white hover:border-[#D4AF37]/20'}
                      `}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                          ${pathway === p.id 
                            ? 'bg-[#D4AF37] text-black' 
                            : isDarkMode ? 'bg-[#333] text-[#8C8C8C]' : 'bg-[#FAFAF8] text-[#D4AF37]'}`}>
                          <iconify-icon icon={p.icon} className="text-2xl"></iconify-icon>
                        </div>
                        <div>
                          <p className={`text-lg font-black font-cabinet tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{p.label}</p>
                          <p className="text-[11px] font-medium text-[#8C8C8C] mt-1">{p.desc}</p>
                        </div>
                      </div>
                      <iconify-icon icon={pathway === p.id ? "lucide:check-circle-2" : "lucide:circle"} className={`text-2xl ${pathway === p.id ? 'text-[#D4AF37]' : 'text-[#8C8C8C]'}`}></iconify-icon>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Intelligence & Summary */}
        <div className="col-span-12 lg:col-span-5 space-y-10 lg:pt-16">
          <div className={`p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden group
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h5 className={`text-xl font-black font-cabinet tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Risk Frontier Audit</h5>
            
            <div className="space-y-6">
              {[
                { label: "Target Yield", val: pathways.find(p => p.id === pathway)?.rate },
                { label: "Archway Limit", val: pathways.find(p => p.id === pathway)?.limit },
                { label: "Reputation Impact", val: "+24 Points (QP)" },
                { label: "Settlement Buffer", val: "7 Days" }
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-4 border-b border-[#F5F3F0] dark:border-[#333] last:border-none">
                  <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">{item.label}</span>
                  <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{item.val}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-4">
              <p className="text-[11px] text-[#8C8C8C] font-medium italic leading-relaxed text-center px-6">
                "By initializing this drawdown, you are committing your on-chain reputation. Timely repayment is critical for tier progression."
              </p>
              <button className="w-full py-6 rounded-full bg-[#1A1A1A] text-white hover:bg-[#D4AF37] hover:text-black transition-all font-black text-[12px] tracking-[0.3em] uppercase luxury-shadow dark:bg-[#D4AF37] dark:text-black active:scale-95 group">
                Initialize Drawdown <iconify-icon icon="lucide:arrow-right" className="ml-3 group-hover:translate-x-2 transition-transform"></iconify-icon>
              </button>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-[#10B981]/5 border border-[#10B981]/10 flex items-center gap-6">
            <iconify-icon icon="lucide:shield-check" className="text-3xl text-[#10B981]"></iconify-icon>
            <p className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em] leading-relaxed">
              Your score is sufficient for the **Sovereign Trust Line**. Instant approval is guaranteed.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
