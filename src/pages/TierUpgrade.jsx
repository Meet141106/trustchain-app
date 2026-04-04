import { Link } from 'react-router-dom';

export default function TierUpgrade() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-satoshi flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
      {/* Decorative luxury elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37] opacity-[0.1] blur-[150px] animate-pulse"></div>
      
      <div className="relative z-10 space-y-12 max-w-lg w-full">
         <div className="relative inline-block mx-auto animate-fade-in">
           {/* Tier iconography */}
           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-[#D4AF37]/30 flex items-center justify-center relative shadow-2xl bg-white/5 backdrop-blur-2xl">
              <div className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-10 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-tr from-[#D4AF37]/20 to-transparent">
                 <iconify-icon icon="lucide:award" className="text-8xl text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"></iconify-icon>
              </div>
           </div>
           
           <div className="absolute -top-4 -right-10 px-8 py-2.5 bg-[#D4AF37] text-[#1A1A1A] rounded-full border border-white/20 shadow-xl animate-bounce">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Tier Advancement</span>
           </div>
         </div>

         <div className="space-y-6">
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-4">Protocol Milestone Reached</p>
            <h2 className="font-cabinet text-7xl md:text-8xl font-black tracking-tighter leading-none animate-fade-in-up">
               Midnight <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF] to-[#D4AF37]">Sovereign.</span>
            </h2>
            <p className="text-white/50 font-black text-[10px] leading-relaxed uppercase tracking-[0.4em] max-w-sm mx-auto animate-fade-in-up animate-delay-1">
               Your Soulbound NFT has been upgraded to <span className="text-white font-black underline decoration-[#D4AF37]">Elite Tier III</span>. New protocol privileges are now active.
            </p>
         </div>

         {/* Benefits list */}
         <div className="space-y-4 animate-fade-in-up animate-delay-2 pt-8">
            {[
               { icon: 'lucide:arrow-up-right', label: 'Borrowing Facility', val: '+$2,500 Limit' },
               { icon: 'lucide:percent', label: 'Adaptive Yield', val: '-1.5% APY Reduction' },
               { icon: 'lucide:shield-check', label: 'Collateral Mechanism', val: 'Zero Sovereign Stake' }
            ].map((b, i) => (
               <div key={i} className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md group hover:border-[#D4AF37]/50 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shadow-xl group-hover:scale-110 transition-transform">
                     <iconify-icon icon={b.icon} className="text-xl"></iconify-icon>
                  </div>
                  <div className="text-left flex-1">
                     <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{b.label}</p>
                     <p className="text-lg font-black text-white tracking-tight">{b.val}</p>
                  </div>
               </div>
            ))}
         </div>

         <div className="flex flex-col gap-6 w-full animate-fade-in-up animate-delay-3 pt-8">
            <Link to="/credit" className="w-full py-6 rounded-full gold-gradient text-white font-black uppercase text-[12px] tracking-[0.3em] luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
               Mint Upgraded Identity <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
            </Link>
            <Link to="/dashboard" className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-colors">Audit New Privileges Later</Link>
         </div>
      </div>
    </div>
  );
}
