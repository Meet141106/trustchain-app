import React from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function SovereignAudit() {
  const { isDarkMode } = useTheme();

  const factors = [
    { label: "Identity Protocol", val: "Verified", status: "Success", icon: "lucide:fingerprint" },
    { label: "Social Capital", val: "Tier 1", status: "Success", icon: "lucide:users" },
    { label: "Behavioral Fidelity", val: "99.2%", status: "Success", icon: "lucide:activity" },
    { label: "Financial Solvency", val: "$14.2k", status: "Success", icon: "lucide:wallet" }
  ];

  return (
    <AppShell pageTitle="Sovereign Audit" pageSubtitle="Credit Profile & Reputation Synthesis">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Main Score Header */}
        <div className={`p-12 md:p-16 rounded-[4rem] border transition-all duration-500 relative overflow-hidden group
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[100px] -z-10"></div>
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Score Radial */}
            <div className="relative w-64 h-64 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[-90deg]">
                <circle cx="18" cy="18" r="15.8" fill="transparent" stroke={isDarkMode ? "#333" : "#F5F3F0"} strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="15.8" 
                  fill="transparent" 
                  stroke="#D4AF37" 
                  strokeWidth="3" 
                  strokeDasharray="81 100" 
                  strokeDashoffset="0"
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: "81 100" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-black font-cabinet tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>812</span>
                <span className="text-[10px] text-[#8C8C8C] font-black uppercase tracking-[0.3em] mt-1">Trust Score</span>
              </div>
            </div>

            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                  <span className="px-5 py-2 rounded-full bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20">Noir Elite Tier</span>
                  <span className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest
                    ${isDarkMode ? 'bg-black border-[#333] text-[#8C8C8C]' : 'bg-[#FAFAF8] border-[#E8E8E8] text-[#8C8C8C]'}`}>Top 2.1% Global</span>
                </div>
                <h2 className={`text-4xl md:text-5xl font-black font-cabinet tracking-tighter mb-4 ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  Reputation Synthesis Verified
                </h2>
                <p className="text-[#8C8C8C] text-lg font-medium leading-relaxed max-w-2xl">
                  Your on-chain behavior over the last 12 months reflects high liquidity fidelity and consistent circle-based social validation.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-12">
                <div>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Circle Verification</p>
                  <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>24 Nodes</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Fidelity Proofs</p>
                  <p className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Immutable</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reputation Multi-Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {factors.map((f, idx) => (
            <div key={idx} className={`p-10 rounded-[3rem] border group transition-all duration-500
              ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500
                ${isDarkMode ? 'bg-black text-[#D4AF37] border border-[#333]' : 'bg-[#FAFAF8] text-[#1A1A1A] border border-[#E8E8E8] group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
                <iconify-icon icon={f.icon} className="text-2xl"></iconify-icon>
              </div>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2 font-cabinet">{f.label}</p>
              <h4 className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{f.val}</h4>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                <span className="text-[9px] font-black text-[#10B981] uppercase tracking-[0.2em]">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Human trust layer - Verification Nodes */}
        <div className={`p-12 md:p-14 rounded-[3.5rem] border transition-all duration-500 luxury-shadow
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] shadow-2xl shadow-[#D4AF37]/5'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
            <div>
              <h3 className={`text-3xl font-black font-cabinet tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Verification Syndicate</h3>
              <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-2">Active nodes validating your reputation quotient</p>
            </div>
            <button className={`px-8 py-4 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#D4AF37] hover:text-black active:scale-95
              ${isDarkMode ? 'border-[#333] text-[#8C8C8C]' : 'border-[#1A1A1A] text-[#1A1A1A]'}`}>
              Request Endorsement
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`p-6 rounded-[2rem] border text-center transition-all group
                ${isDarkMode ? 'bg-black border-[#333] hover:border-[#D4AF37]' : 'bg-[#FAFAF8] border-[#E8E8E8] hover:border-[#D4AF37]'}`}>
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] mx-auto mb-4 flex items-center justify-center text-black font-black text-xs shadow-lg">
                  {String.fromCharCode(64 + i)}
                </div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Node 0{i}</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-[#10B981]">
                  <iconify-icon icon="lucide:check-circle" className="text-[8px]"></iconify-icon>
                  <span className="text-[8px] font-black uppercase tracking-tighter">Attested</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
