import React from 'react';
import AppShell from '../components/AppShell';
import TrustScoreMeter from '../components/TrustScoreMeter';
import LoanCard from '../components/LoanCard';
import HealthIndicator from '../components/HealthIndicator';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function BorrowerDashboard() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell title="Solvent Terminal" subtitle="Sovereign Credit Control">
      <div className="grid grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Column: Reputation & Health */}
        <div className="col-span-12 lg:col-span-5 space-y-12">
          
          {/* Trust Score Header */}
          <div className={`p-12 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden group
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <div className="relative z-10 flex flex-col items-center">
              <TrustScoreMeter score={842} />
              
              <div className="mt-12 text-center">
                <h2 className={`text-4xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  ELITE REPUTATION
                </h2>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Fidelity Level: Exceptional</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-10 w-full mt-16 pt-16 border-t border-[#F5F3F0] dark:border-[#333]">
                <div className="text-center">
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-3">Credit Peak</p>
                  <p className={`text-2xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>
                    $45,000
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-3">Active Vouching</p>
                  <p className={`text-2xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>
                    14 Members
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <HealthIndicator healthValue={92} label="Reputation Solvency" />
          
        </div>

        {/* Right Column: Active Facilities & Intelligence */}
        <div className="col-span-12 lg:col-span-7 space-y-12">
          
          <div className="flex items-center justify-between px-4">
            <div>
              <h4 className={`text-2xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                Active Capital Facilities
              </h4>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mt-2">
                Real-time Lifecycle Status
              </p>
            </div>
            <button className="px-8 py-4 rounded-full border border-[#D4AF37] text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[#D4AF37] hover:text-white active:scale-95">
              Drawdown Request
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LoanCard amount="$12,500" label="Tier II Liquidity Circle" status="Active" reputationGain="+18 QP" dueDate="Dec 12, 2026" />
            <LoanCard amount="$4,200" label="Sovereign Merit Loan" status="Active" reputationGain="+8 QP" dueDate="Jan 05, 2027" />
          </div>

          {/* Protocol Intelligence Row */}
          <div className={`p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden group
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37]">
                  <iconify-icon icon="lucide:brain" className="text-2xl"></iconify-icon>
                </div>
                <div>
                  <h5 className={`text-lg font-black font-cabinet tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    Protocol Intelligence
                  </h5>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">AI-Powered Insights</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-[9px] font-bold uppercase rounded-full">Optimal Risk Zone</span>
            </div>
            
            <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed mb-10 italic">
              "Your current repayment fidelity is at the 98th percentile. Maintaining this trajectory for the next 45 days will unlock the **NOIR ELITE** credit archway."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#F5F3F0] dark:border-[#333] pt-10">
              <div className="space-y-4">
                <h6 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">Next Growth Signal</h6>
                <div className="flex items-center justify-between">
                  <span className={`text-[12px] font-black ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Noir Archetype Status</span>
                  <span className="text-[12px] font-black text-[#10B981]">Reached in 12 days</span>
                </div>
              </div>
              <div className="space-y-4">
                <h6 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">Liquidity Prediction</h6>
                <div className="flex items-center justify-between">
                  <span className={`text-[12px] font-black ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Market APR Prediction</span>
                  <span className="text-[12px] font-black text-[#D4AF37]">4.2% (Historical Low)</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </AppShell>
  );
}
