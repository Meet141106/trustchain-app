import { Link } from 'react-router-dom';

export default function LoanSuccess() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-satoshi flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      {/* Decorative luxury elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500 opacity-[0.05] blur-[150px] animate-pulse"></div>
      
      <div className="relative z-10 space-y-12 max-w-lg w-full">
         <div className="relative inline-block mx-auto animate-fade-in">
           {/* Success iconography */}
           <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-emerald-100 flex items-center justify-center relative shadow-2xl bg-white/50 backdrop-blur-xl">
              <div className="absolute inset-0 rounded-full border-2 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-8 rounded-full border border-emerald-50 flex items-center justify-center">
                 <iconify-icon icon="lucide:check-circle-2" className="text-7xl text-emerald-500"></iconify-icon>
              </div>
           </div>
           
           <div className="absolute -top-4 -right-10 px-8 py-2.5 bg-emerald-500 text-white rounded-full border border-emerald-400 shadow-xl animate-bounce">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Capital Secured</span>
           </div>
         </div>

         <div className="space-y-6">
            <h2 className="font-cabinet text-6xl md:text-8xl font-black tracking-tighter leading-none animate-fade-in-up">
               Protocol <br/>
               <span className="text-emerald-500">Fluidity.</span>
            </h2>
            <p className="text-[#8C8C8C] font-black text-[10px] leading-relaxed uppercase tracking-[0.4em] max-w-sm mx-auto animate-fade-in-up animate-delay-1">
               Your decentralized facility has been initialized and <span className="text-[#1A1A1A]">$2,500.00</span> has been propagate to your sovereign vault.
            </p>
         </div>

         <div className="bg-white p-8 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow animate-fade-in-up animate-delay-2">
            <div className="flex flex-col gap-2">
               <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest leading-none mb-2">Immutable Protocol Event</p>
               <p className="font-mono text-[10px] text-emerald-600 break-all leading-relaxed">0x8fB274d...98cE77a1</p>
               <a href="#" className="text-[9px] font-black uppercase text-[#D4AF37] tracking-widest flex items-center justify-center gap-1 hover:underline mt-2">
                  Verify Proof of Settlement <iconify-icon icon="lucide:external-link" className="text-[10px]"></iconify-icon>
               </a>
            </div>
         </div>

         <div className="flex flex-col gap-6 w-full animate-fade-in-up animate-delay-3 pt-8">
            <Link to="/active-loan" className="w-full py-6 rounded-full bg-[#1A1A1A] text-white font-black uppercase text-[12px] tracking-[0.3em] luxury-shadow hover:bg-[#D4AF37] hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
               Audit Facility Lifecycle <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
            </Link>
            <Link to="/dashboard" className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] hover:text-[#1A1A1A] transition-colors">Return to Sovereign Home</Link>
         </div>
      </div>
    </div>
  );
}
