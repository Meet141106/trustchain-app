import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function VouchForMember() {
  return (
    <AppShell pageTitle="Reputation Endorsement" pageSubtitle="Direct vouching & capital staking">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1000px] mx-auto space-y-12">
        <div className="flex flex-col items-center text-center space-y-6">
           <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#A3832B] shadow-2xl">
              <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" 
                 alt="Priya" 
                 className="w-full h-full rounded-full bg-[#1A1A1A] border-4 border-white"
              />
           </div>
           <div>
              <h2 className="font-cabinet text-3xl font-black text-[#1A1A1A] tracking-tight">Endorse: Priya Roy</h2>
              <p className="text-[#8C8C8C] text-sm font-medium">Digital Identity: #PR-8821-X</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Loan Overview */}
           <div className="bg-white p-10 rounded-[3rem] border border-[#E8E8E8] luxury-shadow space-y-8">
              <div>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Proposed Facility</p>
                 <div className="flex justify-between items-end">
                    <h3 className="text-4xl font-black font-cabinet tracking-tighter text-[#1A1A1A]">$1,250.00</h3>
                    <span className="text-xs font-bold text-[#8C8C8C]">12 Week Horizon</span>
                 </div>
              </div>
              
              <div className="space-y-4 pt-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8C8C8C] font-medium">Reputation Score</span>
                    <span className="font-bold text-emerald-500">784 (Elite)</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-[#8C8C8C] font-medium">Historical Settlement</span>
                    <span className="font-bold text-[#1A1A1A]">100% On-time</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-t border-[#F5F3F0] pt-4">
                    <span className="text-[#8C8C8C] font-medium">Syndicate Backing</span>
                    <span className="font-bold text-[#1A1A1A]">4/5 Vouchers</span>
                 </div>
              </div>
           </div>

           {/* Staking & Rewards */}
           <div className="bg-[#1A1A1A] p-10 rounded-[3rem] text-white luxury-shadow space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37] opacity-[0.1] blur-[50px]"></div>
              <div>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Market Incentive</p>
                 <h3 className="text-3xl font-black font-cabinet tracking-tight">Endorsement Yield</h3>
                 <p className="text-white/60 text-xs mt-2 font-medium">Earn interest for providing trust-based collateral.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-white/70 text-xs uppercase font-black tracking-widest">Required Stake</span>
                    <span className="text-white font-bold">$250.00</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-white/70 text-xs uppercase font-black tracking-widest">Expected Reward</span>
                    <span className="text-[#D4AF37] font-bold">+ $8.40</span>
                 </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                 <iconify-icon icon="lucide:info" className="text-[#D4AF37] shrink-0"></iconify-icon>
                 <p className="text-[10px] text-white/50 leading-relaxed italic">Your stake is locked for the duration of the loan. In case of default, stakes are liquidated proportionally.</p>
              </div>
           </div>
        </div>

        {/* Accountability Warning */}
        <div className="bg-[#FFF8F8] border border-rose-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <iconify-icon icon="lucide:alert-triangle" className="text-3xl"></iconify-icon>
           </div>
           <div className="flex-1 space-y-1">
              <h4 className="font-black text-[#1A1A1A] uppercase tracking-widest text-xs">Trust Accountability Protocol</h4>
              <p className="text-rose-900/60 text-xs font-medium leading-relaxed">
                 By endorsing Priya Roy, you assume mutual accountability. A default will result in a <span className="font-bold">-50 Point</span> drop in your own Reputation Quotient and forfeiture of your stake.
              </p>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
           <Link to="/group" className="flex-1 py-5 rounded-full border border-[#E8E8E8] text-[#8C8C8C] font-black uppercase text-[10px] tracking-widest text-center hover:bg-[#FAFAF8] transition-all">
              Decline Request
           </Link>
           <Link to="/loan-success" className="flex-[2] py-5 rounded-full gold-gradient text-white font-black uppercase text-[10px] tracking-widest text-center luxury-shadow hover:scale-105 transition-all">
              Vouch & Finalize Stake
           </Link>
        </div>
      </div>
    </AppShell>
  );
}
