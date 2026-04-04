import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function Repayment() {
  const [method, setMethod] = useState('full');

  return (
    <AppShell pageTitle="Settlement Portal" pageSubtitle="Finalize facility installments & elevate your reputation">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Settlement Timer & Meta */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8 md:space-y-12">
          {/* Performance Timer */}
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF4444] opacity-[0.03] blur-[100px] transition-transform duration-700 group-hover:scale-110"></div>
            
            <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-12">Settlement Horizon</p>
            
            <div className="relative inline-block mx-auto mb-12">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-[#F5F3F0] flex items-center justify-center relative shadow-sm">
                 <div className="absolute inset-0 rounded-full border-4 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '6s' }}></div>
                 <div className="text-center group-hover:scale-110 transition-transform duration-500">
                    <h2 className="text-6xl md:text-7xl font-black text-[#1A1A1A] tracking-tighter mb-1 font-cabinet leading-none">01:04</h2>
                    <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest mt-2">Days : Hours</p>
                 </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="px-6 py-2.5 bg-[#FEF2F2] rounded-full border border-rose-100 flex items-center gap-2">
                 <iconify-icon icon="lucide:alert-triangle" className="text-[#EF4444] text-sm"></iconify-icon>
                 <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Optimized Settlement Window</span>
              </div>
              <p className="text-[11px] text-[#8C8C8C] font-medium max-w-[280px] leading-relaxed">Early settlement within T-24h triggers a <span className="text-[#D4AF37] font-bold">Noir Multiplier bonus</span>.</p>
            </div>
          </div>

          {/* Reputation Progress */}
          <div className="bg-[#1A1A1A] p-10 rounded-[3rem] border border-white/5 luxury-shadow relative overflow-hidden group transition-all duration-500 hover:border-[#D4AF37]/30">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D4AF37] opacity-[0.1] blur-[60px] group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#A3832B] flex items-center justify-center text-white luxury-shadow rotate-3 group-hover:rotate-0 transition-transform">
                 <iconify-icon icon="lucide:flame" className="text-3xl"></iconify-icon>
              </div>
              <div className="flex-1">
                 <h4 className="text-white font-cabinet text-xl font-black mb-2 tracking-tight">Trust Integrity Streak: 3/5</h4>
                 <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-[#D4AF37]" style={{ width: '60%' }}></div>
                 </div>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-3">2 More Settlements to Tier Upgrade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financials & Settlement */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow group">
            <h3 className="font-cabinet text-3xl font-black mb-10 tracking-tight text-[#1A1A1A]">Financial Amortization</h3>
            
            <div className="space-y-8 transition-all">
              <div className="flex justify-between items-center py-6 border-b border-[#F5F3F0] group-hover:px-2 duration-300">
                 <span className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">Principal Facility</span>
                 <span className="font-black text-2xl text-[#1A1A1A] tracking-tighter leading-none">$1,250.00</span>
              </div>
              <div className="flex justify-between items-center py-6 border-b border-[#F5F3F0] group-hover:px-2 duration-300">
                 <span className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">Yield Encumbrance</span>
                 <span className="font-black text-2xl text-[#1A1A1A] tracking-tighter leading-none">$45.00</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-8">
                 <div className="text-center md:text-left transition-transform duration-500 group-hover:scale-105">
                    <h4 className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-3">Aggregate Settlement</h4>
                    <span className="text-5xl md:text-6xl font-black text-[#D4AF37] tracking-tighter leading-none font-cabinet">$1,295.00</span>
                 </div>
                 <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 text-center md:text-right luxury-shadow-sm min-w-[180px]">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Reputation Gain</p>
                    <span className="text-3xl font-black text-emerald-600 tracking-tighter">+45 QP</span>
                 </div>
              </div>
            </div>

            <div className="mt-14 space-y-6">
              <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] text-center">Execution Modality</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setMethod('full')}
                  className={`p-8 rounded-[2.5rem] border transition-all duration-500 text-left relative overflow-hidden group ${
                    method === 'full' 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] luxury-shadow scale-[1.03]' 
                    : 'bg-[#FAFAF8] border-[#E8E8E8] text-[#1A1A1A] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mb-4 flex items-center justify-center transition-colors ${method === 'full' ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'bg-white border border-[#E8E8E8] text-transparent'}`}>
                     <iconify-icon icon="lucide:check" className="text-sm font-bold"></iconify-icon>
                  </div>
                  <h5 className="font-black text-sm mb-2 uppercase tracking-wide">Full Settlement</h5>
                  <p className={`text-[10px] font-medium leading-relaxed ${method === 'full' ? 'text-white/60' : 'text-[#8C8C8C]'}`}>Complete liquidation of the current facility cycle.</p>
                </button>

                <button 
                  onClick={() => setMethod('partial')}
                  className={`p-8 rounded-[2.5rem] border transition-all duration-500 text-left relative overflow-hidden group ${
                    method === 'partial' 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] luxury-shadow scale-[1.03]' 
                    : 'bg-[#FAFAF8] border-[#E8E8E8] text-[#1A1A1A] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mb-4 flex items-center justify-center transition-colors ${method === 'partial' ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'bg-white border border-[#E8E8E8] text-transparent'}`}>
                     <iconify-icon icon="lucide:check" className="text-sm font-bold"></iconify-icon>
                  </div>
                  <h5 className="font-black text-sm mb-2 uppercase tracking-wide">Dynamic Extension</h5>
                  <p className="text-[10px] font-medium leading-relaxed text-[#8C8C8C]">AI-optimized partial payment with maturity restructuring.</p>
                </button>
              </div>
            </div>

            <div className="mt-14">
               <button 
                 className="w-full py-7 rounded-full gold-gradient text-white font-black uppercase text-[12px] tracking-[0.3em] luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-4 group"
               >
                 Authorize Global Settlement <iconify-icon icon="lucide:shield-check" className="text-xl transition-transform group-hover:scale-125"></iconify-icon>
               </button>
               <div className="flex flex-col items-center mt-8 gap-2">
                  <div className="flex items-center gap-2">
                     <iconify-icon icon="lucide:lock" className="text-[#8C8C8C] text-[10px]"></iconify-icon>
                     <p className="text-[10px] text-[#8C8C8C] font-black uppercase tracking-[0.2em]">Execution via AI Smart Settlement Node</p>
                  </div>
                  <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">Immutable & Cryptographically Signed</p>
               </div>
            </div>
          </div>

          {/* Arbitrage Insight */}
          <div className="bg-[#FFF8F8] p-8 rounded-[2.5rem] border border-rose-100 flex items-center gap-8 luxury-shadow-sm group hover:border-[#EF4444]/20 transition-all">
             <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-rose-500 luxury-shadow shrink-0 border border-rose-50 group-hover:rotate-12 duration-500">
                <iconify-icon icon="lucide:trending-up" className="text-3xl"></iconify-icon>
             </div>
             <div>
                <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-widest mb-1">Reputation Arbitrage</p>
                <p className="text-sm font-medium text-rose-900/60 leading-relaxed tracking-tight">
                  Early settlement by the <span className="text-[#1A1A1A] font-black underline">12th of April</span> will trigger a <span className="text-[#D4AF37] font-black">+25% Reputation Multiplier</span> across all connected circles.
                </p>
             </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
