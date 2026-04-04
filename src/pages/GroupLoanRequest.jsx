import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function GroupLoanRequest() {
  return (
    <AppShell pageTitle="Syndicate Audit" pageSubtitle="Action required for collective capital finality" showNav={false}>
      <div className="p-4 md:p-8 lg:p-12 max-w-[900px] mx-auto space-y-12">
        
        {/* Circle Notification Header */}
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow text-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37] opacity-[0.02] blur-[100px] transition-transform duration-700 group-hover:scale-125"></div>
           <div className="w-20 h-20 rounded-3xl bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#D4AF37] mx-auto mb-8 shadow-xl group-hover:rotate-12 transition-transform duration-500">
              <iconify-icon icon="lucide:users-2" className="text-4xl"></iconify-icon>
           </div>
           <h2 className="font-cabinet text-3xl font-black text-[#1A1A1A] tracking-tight mb-4">Sovereign Entrepreneurs Circle</h2>
           <p className="text-sm font-medium text-[#8C8C8C] max-w-md mx-auto leading-relaxed">
              A peer node within your trust circle has requested a syndicated facility and requires <span className="text-[#1A1A1A] font-bold underline decoration-[#D4AF37] decoration-2">Protocol Authorization</span>.
           </p>
        </div>

        {/* Request Details Detail */}
        <div className="bg-[#1A1A1A] p-10 md:p-14 rounded-[3.5rem] border border-white/5 luxury-shadow relative overflow-hidden group">
           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D4AF37] opacity-[0.1] blur-[80px] group-hover:scale-150 duration-700"></div>
           
           <div className="flex items-center gap-10 mb-12 relative z-10">
              <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 p-1 luxury-shadow">
                 <div className="w-full h-full rounded-[2.5rem] bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Priya" alt="Priya" className="w-full h-full object-cover opacity-80" />
                 </div>
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">Peer Node: Priya Sovereign</p>
                 <div className="flex items-baseline gap-4">
                    <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Requesting</span>
                    <h3 className="text-5xl font-black font-cabinet tracking-tighter text-[#D4AF37] leading-none">$250.00</h3>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/5 relative z-10">
              <div className="space-y-6">
                 <div className="flex justify-between items-center group/item hover:px-2 transition-all">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Purpose</span>
                    <span className="text-sm font-black text-white tracking-tight">Equipment Liquidity</span>
                 </div>
                 <div className="flex justify-between items-center group/item hover:px-2 transition-all">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Duration</span>
                    <span className="text-sm font-black text-white tracking-tight">12 Cycle Maturity</span>
                 </div>
              </div>
              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center">
                 <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-3">Protocol Quorum</p>
                 <div className="text-3xl font-black font-cabinet tracking-tighter text-white">3 / 4 <span className="text-xs text-white/40 ml-1">AUDITS</span></div>
                 <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]" style={{ width: '75%' }}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Action Infrastructure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
           <button className="py-6 rounded-full border border-[#E8E8E8] text-[#8C8C8C] font-black uppercase text-[12px] tracking-[0.3em] text-center hover:bg-[#FAFAF8] transition-all">
              Withhold Support
           </button>
           <Link to="/vouch" className="py-6 rounded-full gold-gradient text-white font-black uppercase text-[12px] tracking-[0.3em] text-center luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
              Audit & Authorize <iconify-icon icon="lucide:check-circle" className="text-lg group-hover:scale-125 transition-transform ml-2"></iconify-icon>
           </Link>
        </div>

        {/* Global Warning */}
        <div className="bg-[#FAFAF8] p-8 rounded-[3rem] border border-[#E8E8E8] flex items-center gap-8 luxury-shadow-sm opacity-60 hover:opacity-100 transition-opacity">
           <iconify-icon icon="lucide:info" className="text-2xl text-[#8C8C8C]"></iconify-icon>
           <p className="text-[9px] font-bold text-[#8C8C8C] leading-relaxed uppercase tracking-widest">
              Authorizing this facility binds your <span className="text-[#1A1A1A]">Reputation Quotient</span> to the settlement finality of the requester. Audit carefully.
           </p>
        </div>
      </div>
    </AppShell>
  );
}
