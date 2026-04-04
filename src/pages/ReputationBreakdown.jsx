import React from 'react';
import AppShell from '../components/AppShell';
import TrustScoreMeter from '../components/TrustScoreMeter';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ReputationBreakdown() {
  const { isDarkMode } = useTheme();

  const factors = [
    { label: "Execution Fidelity", value: 98, weight: 40, icon: "lucide:check-circle", color: "#10B981" },
    { label: "Circle Endorsements", value: 85, weight: 30, icon: "lucide:users-2", color: "#D4AF37" },
    { label: "Solvency Quotient", value: 72, weight: 20, icon: "lucide:landmark", color: "#6366F1" },
    { label: "Temporal Stability", value: 92, weight: 10, icon: "lucide:calendar", color: "#A855F7" }
  ];

  return (
    <AppShell pageTitle="Reputation Breakdown" pageSubtitle="Quotient Points & Factor Synthesis">
      <div className="max-w-6xl mx-auto space-y-16 pb-24">
        
        {/* Core Hero Section */}
        <div className={`p-16 rounded-[4rem] border transition-all duration-500 relative overflow-hidden group
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-72 h-72">
                <TrustScoreMeter score={842} />
              </div>
              <div className="mt-10 text-center">
                <span className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.4em]
                  ${isDarkMode ? 'bg-black border-[#333] text-[#D4AF37]' : 'bg-[#D4AF37]/5 border-[#D4AF37]/20 text-[#D4AF37]'}`}>
                  Noir Level Verified
                </span>
                <p className="mt-8 text-sm font-medium text-[#8C8C8C] max-w-sm leading-relaxed px-4 italic font-cabinet">
                  "Your reputation quotient is within the top 2.4% of the global trust network. Tier III capital access is now optimized."
                </p>
              </div>
            </div>
            
            <div className="space-y-10">
              <div>
                <h2 className={`text-4xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  Synthesized Factors
                </h2>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mt-3 font-cabinet">Quotient Calibration Algorithm</p>
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
                        <iconify-icon icon={factor.icon} className={`text-xl ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}></iconify-icon>
                        <span className={`text-[12px] font-black uppercase tracking-[0.1em] font-cabinet ${isDarkMode ? 'text-[#FAFAFA]' : 'text-[#1A1A1A]'}`}>{factor.label}</span>
                      </div>
                      <span className="text-[12px] font-black text-[#D4AF37] font-mono">{factor.value}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-[#333]' : 'bg-[#E8E8E8]'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.value}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + 0.1 * idx }}
                        style={{ backgroundColor: factor.color }}
                        className="h-full rounded-full shadow-lg"
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
          <div className={`p-10 rounded-[3rem] border transition-all duration-500
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h4 className={`text-xl font-black font-cabinet tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>QP Velocity</h4>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                <iconify-icon icon="lucide:arrow-up-right" className="text-3xl"></iconify-icon>
              </div>
              <div>
                <p className={`text-3xl font-black font-cabinet ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>+42 QP</p>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-1 font-cabinet">30 Day Appreciation</p>
              </div>
            </div>
            <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
              Early settlement of the **Syndicate Drawdown #402** triggered a high velocity multiplier. Your Trust Score boundary is expanding.
            </p>
          </div>

          <div className={`p-10 rounded-[3rem] border transition-all duration-500
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h4 className={`text-xl font-black font-cabinet tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Social Multiplier</h4>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <iconify-icon icon="lucide:users" className="text-3xl"></iconify-icon>
              </div>
              <div>
                <p className={`text-3xl font-black font-cabinet ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>1.4x</p>
                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-1 font-cabinet">Circle Vouch Multiplier</p>
              </div>
            </div>
            <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
              Verification by **Noir Node 84** (950+ score) provides a sovereign multiplier to your core points. Your reputation is highly liquid.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
