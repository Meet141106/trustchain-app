import React from 'react';
import AppShell from '../components/AppShell';

export default function Settings() {
  return (
    <AppShell pageTitle="Identity & Security" pageSubtitle="Biometric binding & social graph command">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto flex flex-col md:flex-row gap-10 lg:gap-16">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="space-y-4 sticky top-[120px] flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar scroll-smooth">
            {[
              { label: 'Profile Identity', icon: 'lucide:user', active: true },
              { label: 'Biometric Trust', icon: 'lucide:fingerprint' },
              { label: 'Social Graph', icon: 'lucide:share-2' },
              { label: 'Security & KYC', icon: 'lucide:shield-check' },
              { label: 'Privacy Tiers', icon: 'lucide:eye-off' },
              { label: 'DAO Governance', icon: 'lucide:landmark' }
            ].map((item) => (
              <a 
                key={item.label}
                href="#" 
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap md:whitespace-normal group ${
                  item.active 
                  ? 'bg-[#1A1A1A] text-white luxury-shadow scale-105' 
                  : 'text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-[#FAFAF8] border border-transparent hover:border-[#E8E8E8]'
                }`}
              >
                <iconify-icon icon={item.icon} className={`text-lg ${item.active ? 'text-[#D4AF37]' : 'group-hover:text-[#1A1A1A]'}`}></iconify-icon>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full max-w-4xl space-y-12 pb-32">
          
          {/* Identity Header */}
          <div className="bg-[#1A1A1A] text-white p-10 md:p-14 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8 luxury-shadow relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#D4AF37]/20 to-transparent group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37] to-[#C9A961] p-1 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full rounded-[2.2rem] bg-[#1A1A1A] flex items-center justify-center border-4 border-[#1A1A1A] overflow-hidden">
                    <img src="https://api.placeholder.com/150/150" alt="Avatar" className="w-full h-full object-cover grayscale" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#1A1A1A] flex items-center justify-center">
                  <iconify-icon icon="lucide:check" className="text-white text-xs"></iconify-icon>
                </div>
              </div>
              <div className="text-center md:text-left space-y-2">
                <h2 className="text-4xl font-black font-cabinet tracking-tighter leading-none">A. Karanja</h2>
                <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">Sovereign ID: 0x71C...3D2E</p>
              </div>
            </div>
            <div className="relative z-10 text-center md:text-right">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">On-Chain Trust</p>
              <h3 className="text-5xl md:text-6xl font-black font-cabinet tracking-tighter text-[#D4AF37]">942<span className="text-sm font-bold text-white/20 ml-2">QP</span></h3>
            </div>
          </div>
          
          {/* Information Grid */}
          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow space-y-12">
            <div className="flex justify-between items-center border-b border-[#F5F3F0] pb-8">
              <h4 className="text-3xl font-black font-cabinet tracking-tight text-[#1A1A1A]">Sovereign Metadata</h4>
              <button className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] hover:underline decoration-2 underline-offset-8">Request Audit</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4 group">
                <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] ml-2 group-focus-within:text-[#D4AF37] transition-colors">On-Chain Alias</label>
                <div className="relative">
                  <input type="text" className="w-full px-8 py-5 rounded-[2rem] font-bold text-[#1A1A1A] bg-[#FAFAF8] border border-[#E8E8E8] focus:border-[#D4AF37] focus:bg-white outline-none transition-all" defaultValue="Karanja Node #2941" />
                  <iconify-icon icon="lucide:edit-3" className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8C8C8C]"></iconify-icon>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] ml-2">Verified Locale</label>
                <input type="text" className="w-full px-8 py-5 rounded-[2rem] font-bold text-[#1A1A1A] bg-[#FAFAF8] border border-[#E8E8E8] cursor-not-allowed" defaultValue="Nairobi, Kenya" readOnly />
              </div>
              <div className="space-y-4 md:col-span-2">
                <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] ml-2">Encrypted Communication Vector</label>
                <input type="email" className="w-full px-8 py-5 rounded-[2rem] font-bold text-[#1A1A1A] bg-[#FAFAF8] border border-[#E8E8E8]" defaultValue="karanja.node@trustlend.io" />
              </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row gap-6">
              <button className="flex-1 py-6 rounded-full bg-[#1A1A1A] text-white font-black text-xs uppercase tracking-[0.3em] luxury-shadow hover:bg-[#D4AF37] hover:scale-[1.02] transition-all active:scale-95">Update Identity Ledger</button>
              <button className="px-10 py-6 rounded-full border border-[#E8E8E8] text-[#8C8C8C] font-black text-xs uppercase tracking-[0.3em] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all">Reset Biometrics</button>
            </div>
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="bg-white p-12 rounded-[4rem] border-2 border-[#D4AF37] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 luxury-shadow">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#D4AF37] opacity-10 blur-[50px] group-hover:scale-150 duration-700"></div>
                <iconify-icon icon="lucide:award" className="text-6xl text-[#D4AF37] mb-8"></iconify-icon>
                <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-2">Protocol Status</h5>
                <h4 className="text-3xl font-black font-cabinet tracking-tight text-[#1A1A1A] mb-6">Noir Sovereign</h4>
                <ul className="space-y-4">
                  {['0.5% DAO Fee Discount', 'Priority Vouch Slots', 'Early Access: Asset Vault'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-xs font-medium text-[#8C8C8C]">
                      <iconify-icon icon="lucide:check-circle-2" className="text-emerald-500 text-lg"></iconify-icon> {item}
                    </li>
                  ))}
                </ul>
             </div>

             <div className="bg-[#FAFAF8] p-12 rounded-[4rem] border border-[#E8E8E8] relative overflow-hidden group hover:bg-white transition-all duration-500 border-dashed">
                <iconify-icon icon="lucide:lock" className="text-6xl text-[#1A1A1A] mb-8 opacity-20"></iconify-icon>
                <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-2">Next Milestone</h5>
                <h4 className="text-3xl font-black font-cabinet tracking-tight text-[#1A1A1A]/40 mb-6 font-mono tracking-tighter">1,000 QP</h4>
                <p className="text-xs text-[#8C8C8C] font-medium leading-relaxed">Achieve 1,000 Reputation Quotient to unlock <span className="text-[#1A1A1A] font-bold underline">Institutional Tier</span> liquidity pools.</p>
             </div>
          </div>
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer { animation: shimmer 3s infinite linear; }
      `}</style>
    </AppShell>
  );
}
