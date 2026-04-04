import React from 'react';
import AppShell from '../components/AppShell';
import TrustScoreMeter from '../components/TrustScoreMeter';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ScoreBreakdown() {
  const { isDarkMode } = useTheme();

  const factors = [
    { label: "Repayment Fidelity", value: 98, weight: 40, icon: "lucide:check-circle", color: "#10B981" },
    { label: "Syndicate Vouching", value: 85, weight: 30, icon: "lucide:users-2", color: "#D4AF37" },
    { label: "Asset Under Sovereign Control", value: 72, weight: 20, icon: "lucide:landmark", color: "#6366F1" },
    { label: "Historical Stability", value: 92, weight: 10, icon: "lucide:calendar", color: "#A855F7" }
  ];

  return (
    <AppShell title="Sovereign Audit" subtitle="Reputation Synthesis & Breakdown">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Core Hero Section */}
        <div className={`p-16 rounded-[4rem] border transition-all duration-500 relative overflow-hidden group
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center">
              <TrustScoreMeter score={842} />
              <div className="mt-10 text-center">
                <span className="px-6 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">
                  Noir Level Verified
                </span>
                <p className="mt-8 text-sm font-medium text-[#8C8C8C] max-w-sm leading-relaxed px-4">
                  "Your score represents the 98th percentile of the TrustLend network. Access to institutional liquidity is now unlocked."
                </p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h2 className={`text-4xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  Reputation Synthesis
                </h2>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mt-3">Factor-Based Scoring Algorithm</p>
              </div>
              
              <div className="space-y-8">
                {factors.map((factor, idx) => (
                  <motion.div 
                    key={factor.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <iconify-icon icon={factor.icon} className={`text-xl ${isDarkMode ? 'text-white' : 'text-[#D4AF37]'}`}></iconify-icon>
                        <span className={`text-[12px] font-black uppercase tracking-[0.1em] ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{factor.label}</span>
                      </div>
                      <span className="text-[12px] font-black text-[#D4AF37]">{factor.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8E8E8] dark:bg-[#333] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.value}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + 0.1 * idx }}
                        style={{ backgroundColor: factor.color }}
                        className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h4 className={`text-xl font-black font-cabinet tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Reputation Velocity</h4>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                <iconify-icon icon="lucide:arrow-up-right" className="text-3xl"></iconify-icon>
              </div>
              <div>
                <p className={`text-2xl font-black font-cabinet ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>+42 Points</p>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-1">Growth in last 30 days</p>
              </div>
            </div>
            <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
              Your recent early repayments of the **"Tier II Circle"** loan have triggered a significant velocity boost, signaling to the protocol that your credit ceiling should be expanded.
            </p>
          </div>

          <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h4 className={`text-xl font-black font-cabinet tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Risk Frontier Mapping</h4>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <iconify-icon icon="lucide:shield-check" className="text-3xl"></iconify-icon>
              </div>
              <div>
                <p className={`text-2xl font-black font-cabinet ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Sovereign Tier</p>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-1">Verified Protocol Stability</p>
              </div>
            </div>
            <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
              The AI risk oracle has calculated your liquidation boundary at 40%. Given your current 92% solvency rating, your risk frontier is within the **Institutional Safety Corridor**.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
