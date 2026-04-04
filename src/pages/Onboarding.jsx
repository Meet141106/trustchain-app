import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function Onboarding() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen font-satoshi transition-colors duration-500 relative overflow-hidden flex flex-col
      ${isDarkMode ? 'bg-[#0A0A0A] text-white' : 'bg-[#FAFAF8] text-[#1A1A1A]'}`}>
      
      {/* Dynamic background elements */}
      <div className={`absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-40
        ${isDarkMode ? 'bg-gradient-to-b from-[#1A1A1A] to-transparent' : 'bg-gradient-to-b from-[#F5F3F0] to-transparent'}`}></div>
      <div className={`absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-[0.05]
        ${isDarkMode ? 'bg-white' : 'bg-[#D4AF37]'}`}></div>
      <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-[#D4AF37] opacity-[0.03] blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-10 md:p-16 flex justify-between items-center z-50">
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-700 dark:bg-[#D4AF37]">
            <iconify-icon icon="lucide:crown" className={`text-2xl animate-pulse ${isDarkMode ? 'text-black' : 'text-[#D4AF37]'}`}></iconify-icon>
          </div>
          <div>
            <span className={`text-2xl font-black tracking-tighter font-cabinet block leading-none ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              AETHERFI
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#D4AF37] uppercase leading-none mt-2 block">
              TRUSTLEND PROTOCOL
            </span>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-[#D4AF37] transition-all hover:scale-105 active:scale-95">The Manifesto</a>
            <a href="#" className="hover:text-[#D4AF37] transition-all hover:scale-105 active:scale-95">Risk Engine</a>
            <a href="#" className="hover:text-[#D4AF37] transition-all hover:scale-105 active:scale-95">DAO Governance</a>
          </div>
          <div className="h-6 w-[1px] bg-[#E8E8E8] dark:bg-[#333] hidden md:block"></div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-10 md:px-20 z-10 pt-48 md:pt-0 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-12 luxury-shadow">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#D4AF37]">Universal Sovereign Credit Access</span>
          </div>
          
          <h1 className={`font-cabinet text-[4rem] md:text-[8rem] lg:text-[10rem] font-black mb-12 tracking-tighter leading-[0.85] 
            ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
            Decentralized <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#8A6E2F] to-[#D4AF37]">Identity.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-[#8C8C8C] mb-20 max-w-4xl mx-auto leading-relaxed font-medium">
            Replacing predatory lending with <span className={`font-black ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>AI-governed trust</span>. Access unsecured micro-credit through your social graph and on-chain merit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/wallet" className="w-full sm:w-auto px-16 py-8 rounded-full bg-[#1A1A1A] text-white font-black text-[12px] uppercase tracking-[0.3em] luxury-shadow hover:bg-[#D4AF37] hover:text-black hover:scale-105 transition-all flex items-center justify-center gap-6 group dark:bg-[#D4AF37] dark:text-black dark:hover:bg-white">
              Initialize Node <iconify-icon icon="lucide:arrow-right" className="text-xl group-hover:translate-x-3 transition-transform"></iconify-icon>
            </Link>
            <button className={`w-full sm:w-auto px-16 py-8 rounded-full font-black text-[12px] uppercase tracking-[0.3em] border transition-all luxury-shadow active:scale-95
              ${isDarkMode ? 'bg-transparent text-white border-[#333] hover:border-[#D4AF37]' : 'bg-white text-[#1A1A1A] border-[#E8E8E8] hover:border-[#D4AF37]'}`}>
              Protocol Audit
            </button>
          </div>
        </motion.div>

        {/* Floating Intelligence Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-20 flex items-center gap-5 px-8 py-4 rounded-full bg-[#1A1A1A]/5 dark:bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-[#E8E8E8] dark:bg-[#333] border-2 border-white dark:border-[#1A1A1A] overflow-hidden flex items-center justify-center text-[10px] font-black text-[#8C8C8C]">
                {i}
              </div>
            ))}
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8C8C8C]">
            <span className={isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}>142k+ Nodes</span> Active in Protocol
          </span>
        </motion.div>
      </main>
    </div>
  );
}
