import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  
  return (
    <AppShell pageTitle="Syndicate Genesis" pageSubtitle="Form a high-fidelity trust circle & pool collective reputation">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1000px] mx-auto space-y-12 pb-32">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-[#F5F3F0] pb-10">
           <h1 className="font-cabinet text-5xl font-black text-[#1A1A1A] tracking-tight">Initialize Syndicate</h1>
           <p className="text-[#8C8C8C] text-lg font-medium max-w-2xl leading-relaxed">
             Create a decentralized lending circle. Pool your social capital to unlock <span className="text-[#1A1A1A] font-bold">Noir Tier</span> limits and collective yield buffers.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-12 xl:col-span-7 space-y-10">
              {/* Circle Identity */}
              <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.02] blur-[40px]"></div>
                 <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-6 block">Circle Designation</label>
                 <input 
                   type="text" 
                   placeholder="e.g. Sovereign Entrepreneurs Circle"
                   value={groupName}
                   onChange={(e) => setGroupName(e.target.value)}
                   className="w-full bg-[#FAFAF8] border border-[#E8E8E8] rounded-[2rem] px-8 py-6 text-xl font-black tracking-tight text-[#1A1A1A] placeholder:text-[#8C8C8C]/50 focus:border-[#D4AF37] focus:bg-white transition-all outline-none"
                 />
              </div>

              {/* Member Infrastructure */}
              <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow">
                 <div className="flex justify-between items-center mb-10">
                    <h4 className="font-cabinet text-2xl font-black tracking-tight text-[#1A1A1A]">Peer Synchronization</h4>
                    <button className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/5 px-6 py-2 rounded-full border border-[#D4AF37]/20 hover:bg-[#1A1A1A] hover:text-white transition-all">+ Add Peer</button>
                 </div>
                 
                 <div className="bg-[#FAFAF8] border-2 border-dashed border-[#E8E8E8] rounded-[2.5rem] p-12 text-center group cursor-pointer hover:border-[#D4AF37]/40 hover:bg-white transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-white luxury-shadow-sm flex items-center justify-center text-[#8C8C8C] mb-6 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-transform">
                       <iconify-icon icon="lucide:user-plus" className="text-3xl"></iconify-icon>
                    </div>
                    <p className="text-sm font-medium text-[#8C8C8C] max-w-[280px] mx-auto leading-relaxed mb-8">
                       Invite nodes via wallet address or secure protocol handshake to expand your trust circle.
                    </p>
                    <div className="flex justify-center gap-4">
                       <button className="px-8 py-3.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all luxury-shadow">Paste Address</button>
                       <button className="w-12 h-12 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#1A1A1A] hover:border-[#D4AF37] transition-colors"><iconify-icon icon="lucide:qr-code" className="text-lg"></iconify-icon></button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              {/* Accountability Warning */}
              <div className="bg-amber-50 p-10 rounded-[3.5rem] border border-amber-100 luxury-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500 opacity-[0.05] blur-[40px]"></div>
                 <div className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-amber-500 shrink-0 shadow-sm transition-transform group-hover:scale-110 duration-500">
                       <iconify-icon icon="lucide:shield-alert" className="text-2xl"></iconify-icon>
                    </div>
                    <div>
                       <h4 className="text-amber-600 font-cabinet text-xl font-black mb-3 tracking-tight leading-none pt-1">Shared Finality</h4>
                       <p className="text-amber-800/60 text-xs font-medium leading-relaxed">
                          Syndicate participation links all Reputation Quotients. Default at any node triggers protocol-wide rebalancing and potential credit contraction for the entire circle.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Benefits Tracker */}
              <div className="bg-[#1A1A1A] p-10 rounded-[3.5rem] text-white luxury-shadow group">
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-8">Syndicate Buffers</p>
                 <ul className="space-y-6">
                    {[
                      { label: 'Unsecured Limit', val: '+$500.00' },
                      { label: 'Yield Multiplier', val: '1.2x Boost' },
                      { label: 'Governance Weight', val: '+24 Votes' }
                    ].map((b, i) => (
                       <li key={i} className="flex justify-between items-center py-4 border-b border-white/5 group/li">
                          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover/li:text-white transition-colors">{b.label}</span>
                          <span className="font-black text-lg text-[#D4AF37] tracking-tighter">{b.val}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>

        {/* Action Vector */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-8">
           <button 
             className={`w-full py-7 rounded-full text-white font-black uppercase text-[12px] tracking-[0.4em] transition-all luxury-shadow flex items-center justify-center gap-4 group active:scale-95 shadow-2xl ${
               groupName ? 'bg-[#1A1A1A] hover:bg-[#D4AF37] opacity-100' : 'bg-[#E8E8E8] text-[#8C8C8C] cursor-not-allowed'
             }`}
             disabled={!groupName}
           >
              Deploy Circle Protocol <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
           </button>
        </div>
      </div>
    </AppShell>
  );
}
