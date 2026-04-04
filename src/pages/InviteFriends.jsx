import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function InviteFriends() {
  return (
    <AppShell pageTitle="Expansion Hub" pageSubtitle="Curate the network & earn reputation rewards">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1000px] mx-auto space-y-12">
        
        {/* Referral Status Hero */}
        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37] opacity-[0.03] blur-[100px]"></div>
           
           <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
              <div className="text-center lg:text-left space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#D4AF37]/20">
                    <iconify-icon icon="lucide:star" className="text-[#D4AF37] text-xs"></iconify-icon>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Legacy Reward Active</span>
                 </div>
                 <h1 className="font-cabinet text-4xl font-black text-[#1A1A1A] tracking-tight">Expand the Circle</h1>
                 <p className="text-[#8C8C8C] font-medium max-w-[450px]">
                    Invite individuals of high integrity. Earn <span className="text-[#D4AF37] font-bold">+25 Reputation Points</span> for every verified onboarding.
                 </p>
              </div>

              <div className="bg-[#FAFAF8] p-8 rounded-[2.5rem] border border-[#E8E8E8] text-center">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Your Expansion Quotient</p>
                 <h3 className="text-4xl font-black text-[#D4AF37]">12 <span className="text-sm text-[#8C8C8C] ml-1">Referrals</span></h3>
                 <div className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Top 5% of Growth Leaders
                 </div>
              </div>
           </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Referral Link */}
           <div className="bg-[#1A1A1A] p-10 rounded-[3rem] text-white luxury-shadow space-y-8 flex flex-col justify-between">
              <div>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Unique Expansion Link</p>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group">
                    <span className="text-xs font-mono text-white/50 truncate mr-4">trustlend.fi/gate/usr_8xj...</span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors">Copy Link</button>
                 </div>
              </div>
              
              <div className="flex gap-4">
                 <button className="flex-1 py-4 rounded-xl gold-gradient text-white text-[10px] font-black uppercase tracking-widest luxury-shadow">
                    Share via Signal
                 </button>
                 <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Whitelisted Emails
                 </button>
              </div>
           </div>

           {/* QR Core */}
           <div className="bg-white p-10 rounded-[3rem] border border-[#E8E8E8] luxury-shadow flex flex-col items-center text-center space-y-6">
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">In-Person Onboarding</p>
              <div className="w-40 h-40 bg-[#FAFAF8] p-4 rounded-2xl border border-[#E8E8E8] transition-transform hover:scale-105 duration-300">
                 <img 
                    src="https://api.dicebear.com/7.x/identicon/svg?seed=inviteCode" 
                    alt="Invite QR" 
                    className="w-full h-full opacity-80"
                 />
              </div>
              <p className="text-[10px] font-medium text-[#8C8C8C] leading-relaxed">
                 Have your peer scan this unique code to automatically link their reputation profile to your network lineage.
              </p>
           </div>
        </div>

        {/* Network Growth Policy */}
        <div className="bg-[#FFF8F8] border border-rose-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0 border border-rose-100">
              <iconify-icon icon="lucide:shield-check" className="text-3xl"></iconify-icon>
           </div>
           <div>
              <h4 className="font-black text-[#1A1A1A] uppercase tracking-widest text-xs mb-1">Integrity Threshold</h4>
              <p className="text-rose-900/60 text-[10px] font-medium leading-relaxed">
                 You are accountable for the initial conduct of your referrals. If a first-level referral attempts a Sybil attack or defaults within 30 days, your reputation score will be adjusted proportionally.
              </p>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
