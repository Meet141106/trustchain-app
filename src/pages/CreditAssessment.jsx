import { useState } from 'react';
import AppShell from '../components/AppShell';

export default function CreditAssessment() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('0x71C7656EC7ab88b098defb751B7401B5f6d8976F');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell pageTitle="AI Risk Evaluation" pageSubtitle="Autonomous behavioral analysis & interest rate adaptation">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-12">
        
        {/* Profile Identity Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#333] p-0.5 luxury-shadow">
               <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Aether" alt="Identity" className="w-full h-full object-cover opacity-80" />
               </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Decentralized ID Node</p>
              <div className="flex items-center gap-3">
                <h3 className="font-mono text-lg font-bold text-[#1A1A1A]">0x71C7...3d8f</h3>
                <button onClick={handleCopy} className="text-[#8C8C8C] hover:text-[#D4AF37] transition-colors">
                  <iconify-icon icon={copied ? 'lucide:check' : 'lucide:copy'} className="text-sm"></iconify-icon>
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-3 rounded-full bg-[#FAFAF8] border border-[#E8E8E8] flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-widest">Noir Sovereign Status</span>
          </div>
        </div>

        {/* Audit Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Main Score Center */}
          <div className="lg:col-span-12 xl:col-span-7 bg-white p-10 md:p-16 rounded-[3rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-[0.03] blur-[100px]"></div>
            
            <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-12">Reputation Quotient (784 QP)</p>
            
            <div className="relative">
              <svg className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F5F3F0" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="8" strokeDasharray="283" strokeDashoffset="75" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <h2 className="text-7xl md:text-8xl font-black font-cabinet tracking-tighter text-[#1A1A1A]">12%</h2>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mt-2">Dynamic Interest Rate</p>
              </div>
            </div>

            <div className="mt-16 w-full max-w-md space-y-6">
              <div className="flex justify-between items-end mb-2">
                 <div>
                    <h4 className="font-bold text-sm">Adaptive Repayment Bonus</h4>
                    <p className="text-[10px] text-[#8C8C8C] font-bold uppercase tracking-widest">Target: Noir II Elite (-2.0% APR)</p>
                 </div>
                 <span className="text-xs font-black text-[#D4AF37] uppercase tracking-widest">42 PTS to Goal</span>
              </div>
              <div className="w-full h-2 bg-[#F5F3F0] rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#A3832B]" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-12 xl:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#E8E8E8] luxury-shadow flex items-center gap-6 group hover:border-[#D4AF37]/30 transition-all">
               <div className="w-16 h-16 rounded-2xl bg-[#FAFAF8] flex items-center justify-center text-[#10B981] group-hover:scale-105 transition-transform">
                  <iconify-icon icon="lucide:check-circle" className="text-3xl"></iconify-icon>
               </div>
               <div>
                  <h4 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">100%</h4>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">On-Time Settlement Rate</p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-[#E8E8E8] luxury-shadow flex items-center gap-6 group hover:border-[#D4AF37]/30 transition-all">
               <div className="w-16 h-16 rounded-2xl bg-[#FAFAF8] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                  <iconify-icon icon="lucide:gauge" className="text-3xl"></iconify-icon>
               </div>
               <div>
                  <h4 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">Low</h4>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">AI Behavioral Risk Rating</p>
               </div>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/5 luxury-shadow flex items-center gap-6 group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.05] blur-[40px]"></div>
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C9A961] flex items-center justify-center text-white relative z-10 transition-transform group-hover:scale-110">
                  <iconify-icon icon="lucide:brain-circuit" className="text-3xl"></iconify-icon>
               </div>
               <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white tracking-tight">Adaptive Logic</h4>
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Real-time Interest Calibrated</p>
               </div>
            </div>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="bg-[#FAFAF8] p-10 rounded-[3.5rem] border border-[#E8E8E8] flex flex-col md:flex-row items-center gap-12 luxury-shadow">
           <div className="w-24 h-24 rounded-3xl bg-white luxury-shadow flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#E8E8E8]">
              <iconify-icon icon="lucide:sparkles" className="text-4xl animate-pulse"></iconify-icon>
           </div>
           <div className="flex-1 space-y-3">
              <h4 className="font-cabinet text-2xl font-black tracking-tight text-[#1A1A1A]">AI Risk Assessment Audit</h4>
              <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
                Your consistent repayment patterns have triggered a <span className="text-[#1A1A1A] font-bold">Reward Cycle</span>. The AI engine forecasts a reduction to <span className="text-emerald-600 font-bold">10.5% APR</span> if your next 2 cycles are settled before the T+12h window. This is micro-lending optimized for your specific behavior.
              </p>
           </div>
           <div className="flex flex-col gap-4 w-full md:w-auto">
              <button className="px-10 py-5 rounded-full gold-gradient text-white font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all luxury-shadow">
                 Accept Potential Reduction
              </button>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
