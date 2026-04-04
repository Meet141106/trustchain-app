import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function YieldWithdrawal() {
  return (
    <AppShell pageTitle="Yield Realization" pageSubtitle="Crystalize your earned protocol incentives into your active vault">
       <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-12">
          
          {/* Realization Hero */}
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden group text-center">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 opacity-[0.02] blur-[120px] transition-transform group-hover:scale-110 -z-10"></div>
             
             <div className="flex flex-col items-center space-y-8">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 luxury-shadow-sm group-hover:rotate-12 transition-transform duration-500">
                   <iconify-icon icon="lucide:coins" className="text-4xl"></iconify-icon>
                </div>
                
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em]">Accrued Protocol Yield</p>
                   <h2 className="font-cabinet text-7xl md:text-8xl font-black text-emerald-600 tracking-tighter leading-none">$142.50</h2>
                   <p className="text-xs font-black text-[#8C8C8C] uppercase tracking-widest px-4 py-1.5 bg-[#FAFAF8] rounded-full border border-[#E8E8E8] w-fit mx-auto mt-6">Sovereign USDC</p>
                </div>
             </div>
          </div>

          {/* Transfer Infra */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             
             {/* Execution Details */}
             <div className="lg:col-span-12 xl:col-span-7 bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow">
                <h3 className="font-cabinet text-3xl font-black mb-10 tracking-tight text-[#1A1A1A]">Realization Node</h3>
                <div className="space-y-8">
                   {[
                     { label: 'Destination Vault', value: '0x71...3d8f', mono: true },
                     { label: 'Settlement Network', value: 'Polygon Sovereign' },
                     { label: 'AI Optimization Fee', value: 'None (Tier Applied)', color: 'text-emerald-600' },
                     { label: 'Estimated Propagation', value: '< 60 Seconds' }
                   ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-6 border-b border-[#F5F3F0] hover:px-4 transition-all duration-300">
                         <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">{item.label}</span>
                         <span className={`text-xl font-black tracking-tight ${item.mono ? 'font-mono' : ''} ${item.color || 'text-[#1A1A1A]'}`}>{item.value}</span>
                      </div>
                   ))}
                </div>

                <div className="mt-12 flex justify-between items-center p-8 bg-[#FAFAF8] rounded-[2.5rem] border border-[#E8E8E8] luxury-shadow-sm">
                   <span className="font-black text-sm uppercase tracking-widest text-[#1A1A1A]">Total Realized Value</span>
                   <span className="text-3xl font-black text-emerald-600 tracking-tighter">$142.50</span>
                </div>
             </div>

             {/* Logic Sidebar */}
             <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                <div className="bg-[#1A1A1A] text-white p-10 rounded-[3.5rem] luxury-shadow relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[60px] group-hover:scale-150 duration-700"></div>
                   <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:rotate-12 transition-transform">
                      <iconify-icon icon="lucide:zap" className="text-3xl animate-pulse"></iconify-icon>
                   </div>
                   <h4 className="font-cabinet text-2xl font-black tracking-tight mb-4">Compound Logic</h4>
                   <p className="text-sm text-white/50 leading-relaxed font-medium mb-10">Compounding this yield back into the <span className="text-white font-black underline decoration-[#D4AF37]">Noir Opportunity Pool</span> increases your reputation velocity by 1.2x.</p>
                   <button className="w-full py-5 rounded-full border border-white/10 text-white/40 font-black uppercase text-[10px] tracking-[0.3em] hover:text-white hover:border-white transition-all">
                      Relock for 1.2x Multiplier
                   </button>
                </div>

                <div className="bg-[#FAFAF8] p-10 rounded-[3.5rem] border border-[#E8E8E8] group">
                   <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-4">Security Protocol</p>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-[#E8E8E8] flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                         <iconify-icon icon="lucide:lock" className="text-3xl"></iconify-icon>
                      </div>
                      <div>
                         <h5 className="font-black text-xl tracking-tight text-[#1A1A1A]">Cold Storage Verified</h5>
                         <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-widest">Signed via Sovereign Key</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Global Action */}
          <div className="sticky bottom-10 z-20 max-w-lg mx-auto">
             <button className="w-full py-6 rounded-full bg-emerald-600 text-white font-black uppercase text-[12px] tracking-[0.4em] luxury-shadow hover:bg-emerald-500 hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
                Execute Realization <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
             </button>
          </div>
       </div>
    </AppShell>
  );
}
