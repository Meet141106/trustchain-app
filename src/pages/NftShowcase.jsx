import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function NftShowcase() {
  return (
    <AppShell pageTitle="Soulbound Identity" pageSubtitle="Your cryptographically unique credit reputation NFT">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-12">
        
        {/* NFT Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center">
          
          {/* The NFT Card itself */}
          <div className="w-full max-w-[450px] aspect-[3/4] relative group perspective-1000">
             <div className="absolute inset-0 bg-[#1A1A1A] rounded-[3.5rem] luxury-shadow overflow-hidden border border-white/10 group-hover:rotate-y-12 group-hover:scale-105 transition-all duration-700">
                {/* Patterns & Gradients */}
                <div className="absolute inset-0 opacity-20 gold-glow blur-[100px] animate-pulse"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/20 blur-[80px]"></div>
                
                <div className="relative z-10 h-full flex flex-col p-12">
                   {/* Top Detail */}
                   <div className="flex justify-between items-start mb-16">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                         <iconify-icon icon="lucide:fingerprint" className="text-3xl text-[#D4AF37]"></iconify-icon>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Issue #8492</p>
                         <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Noir Alpha</p>
                      </div>
                   </div>

                   {/* Centerpiece: The Score */}
                   <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                         <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="6" strokeDasharray="283" strokeDashoffset="60" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                         </svg>
                         <div className="text-center">
                            <h2 className="text-6xl font-black text-white font-cabinet tracking-tighter leading-none">784</h2>
                            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mt-2">Rep Score (QP)</p>
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-white font-cabinet tracking-tight mb-2">Sovereign Silver</h3>
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Status: High Integrity</p>
                   </div>

                   {/* Footer Info */}
                   <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-end">
                      <div>
                         <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Settlement Count</p>
                         <p className="text-xl font-bold text-white tracking-tight">18 Cycles</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Verified Since</p>
                         <p className="text-lg font-bold text-white tracking-tight">Q1 2024</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Details Pane */}
          <div className="flex-1 max-w-[600px] space-y-8">
             <div className="bg-white p-10 rounded-[3rem] border border-[#E8E8E8] luxury-shadow">
                <h4 className="font-cabinet text-3xl font-black mb-8 tracking-tight text-[#1A1A1A]">Reputation Audit</h4>
                <div className="space-y-6">
                   {[
                      { label: 'Settlement Regularity', val: '98%', color: '#10B981' },
                      { label: 'Social Graph Trust', val: 'Low Risk', color: '#D4AF37' },
                      { label: 'Syndicate Contribution', val: 'Noir Tier', color: '#1A1A1A' }
                   ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center py-4 border-b border-[#F5F3F0]">
                         <span className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">{stat.label}</span>
                         <span className="font-black text-lg tracking-tighter" style={{ color: stat.color }}>{stat.val}</span>
                      </div>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="py-6 rounded-full bg-[#1A1A1A] text-white font-black uppercase text-[10px] tracking-widest luxury-shadow hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-4">
                   Share Identity <iconify-icon icon="lucide:share-2"></iconify-icon>
                </button>
                <button className="py-6 rounded-full bg-white text-[#1A1A1A] border border-[#E8E8E8] font-black uppercase text-[10px] tracking-widest luxury-shadow hover:bg-[#FAFAF8] transition-all flex items-center justify-center gap-4">
                   Download Protocol <iconify-icon icon="lucide:download"></iconify-icon>
                </button>
             </div>

             <div className="bg-[#FAFAF8] p-8 rounded-[2.5rem] border border-[#E8E8E8] flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#D4AF37] luxury-shadow shrink-0">
                   <iconify-icon icon="lucide:shield-check" className="text-3xl"></iconify-icon>
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Soulbound Token</p>
                   <p className="text-sm font-medium text-[#1A1A1A] leading-relaxed">This identity is immutable and non-transferable. It serves as your global passport to interest rate reductions.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
