import { Link } from 'react-router-dom';

export default function RepaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-satoshi flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      {/* Decorative luxury elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37] opacity-[0.05] blur-[150px] animate-pulse"></div>
      
      <div className="relative z-10 space-y-12 max-w-lg w-full">
         <div className="relative inline-block mx-auto animate-fade-in">
           {/* Success iconography */}
           <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#D4AF37]/20 flex items-center justify-center relative shadow-2xl bg-white/50 backdrop-blur-xl">
              <div className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-8 rounded-full border border-[#D4AF37]/10 flex items-center justify-center">
                 <iconify-icon icon="lucide:party-popper" className="text-7xl text-[#D4AF37]"></iconify-icon>
              </div>
           </div>
           
           <div className="absolute -top-4 -right-10 px-8 py-2.5 bg-[#1A1A1A] text-white rounded-full border border-white/10 shadow-xl animate-bounce">
              <div className="flex items-center gap-3">
                 <iconify-icon icon="lucide:zap" className="text-[#D4AF37] text-xl"></iconify-icon>
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">+15 Reputation QP</span>
              </div>
           </div>
         </div>

         <div className="space-y-6">
            <h2 className="font-cabinet text-6xl md:text-8xl font-black tracking-tighter leading-none animate-fade-in-up">
               Facility <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] via-[#444] to-[#1A1A1A]">Synthesized.</span>
            </h2>
            <p className="text-[#8C8C8C] font-black text-[10px] leading-relaxed uppercase tracking-[0.4em] max-w-sm mx-auto animate-fade-in-up animate-delay-1">
               Your protocol settlement of <span className="text-[#1A1A1A] font-black">$254.50</span> has been verified across all accountability nodes.
            </p>
         </div>

         {/* Reward Loop & Streak */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up animate-delay-2 pt-8">
            <div className="bg-white p-8 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow flex flex-col items-center">
               <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-[#D4AF37] mb-6 shadow-xl">
                  <iconify-icon icon="lucide:flame" className="text-2xl animate-pulse"></iconify-icon>
               </div>
               <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2 font-cabinet">Reputation Momentum</p>
               <h4 className="text-2xl font-black text-[#1A1A1A] tracking-tighter leading-none">4x Period Streak</h4>
            </div>
            
            <div className="bg-white p-8 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow flex flex-col items-center">
               <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#D4AF37] mb-6 shadow-xl">
                  <iconify-icon icon="lucide:trending-up" className="text-2xl"></iconify-icon>
               </div>
               <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2 font-cabinet">Expansion Buffer</p>
               <h4 className="text-2xl font-black text-[#1A1A1A] tracking-tighter leading-none">+$250 Limit</h4>
            </div>
         </div>

         <div className="flex flex-col gap-6 w-full animate-fade-in-up animate-delay-3 pt-8">
            <Link to="/credit" className="w-full py-6 rounded-full bg-[#1A1A1A] text-white font-black uppercase text-[12px] tracking-[0.3em] luxury-shadow hover:bg-[#D4AF37] hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
               Analyze Reputation Quotient <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
            </Link>
            <Link to="/dashboard" className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] hover:text-[#1A1A1A] transition-colors">Return to Central Hub</Link>
         </div>
      </div>
    </div>
  );
}
