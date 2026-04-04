import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const circleMembers = [
  { name: 'Karanja Node #2941', seed: 'Karanja', borrower: true, status: 'Active Cycle', score: 784, amount: '$850.00' },
  { name: 'Aditi Peer #1082', seed: 'Aditi', borrower: false, status: 'Staked', contribution: '$250' },
  { name: 'Muthu Sovereign #8821', seed: 'Muthu', borrower: false, status: 'Staked', contribution: '$300' },
  { name: 'Bwana #9941', seed: 'Bwana', borrower: false, status: 'Awaiting', contribution: '-' },
];

export default function GroupLending() {
  return (
    <AppShell pageTitle="Syndicated Trust Circles" pageSubtitle="Collaborative auditing & collective capital deployment">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-12">
        
        {/* Syndicate Hero Command */}
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] opacity-[0.02] blur-[150px] transition-transform group-hover:scale-110 -z-10"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#FAFAF8] border border-[#D4AF37]/30 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A3832B]">Verified Circle #442</span>
              </div>
              <h1 className="font-cabinet text-5xl md:text-6xl font-black tracking-tight text-[#1A1A1A] leading-none">Dharavi Entrepreneurs</h1>
              <p className="text-[#8C8C8C] text-lg font-medium max-w-[600px] leading-relaxed">
                A high-fidelity social network circle enabling micro-lending through decentralized trust & collective accountability.
              </p>
            </div>
            
            <div className="flex items-center gap-12 p-10 bg-[#FAFAF8] rounded-[3rem] border border-[#E8E8E8] luxury-shadow-sm group/stats">
               <div className="group-hover/stats:scale-105 transition-transform duration-500">
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2">Aggregate QP</p>
                  <h3 className="text-5xl font-black text-[#1A1A1A] font-cabinet tracking-tighter">984<span className="text-sm font-bold text-[#D4AF37] ml-2">Elite</span></h3>
               </div>
               <div className="h-16 w-px bg-[#E8E8E8]"></div>
               <div className="group-hover/stats:scale-105 transition-transform duration-500 delay-75">
                  <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2">Total Stake</p>
                  <h3 className="text-4xl font-black text-[#1A1A1A] font-cabinet tracking-tighter">$2,450</h3>
               </div>
            </div>
          </div>
        </div>

        {/* Accountability Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Member Matrix */}
           <div className="lg:col-span-8 space-y-10">
              <div className="flex justify-between items-end px-4">
                 <div>
                    <h3 className="font-cabinet text-3xl font-black text-[#1A1A1A] tracking-tight">Vouching Network</h3>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-2">Active nodes within this Syndicate Circle</p>
                 </div>
                 <div className="flex items-center gap-3 bg-[#FAFAF8] px-5 py-2 rounded-full border border-[#E8E8E8]">
                    <iconify-icon icon="lucide:shield-check" className="text-[#D4AF37]"></iconify-icon>
                    <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest leading-none">Integrity 100%</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {circleMembers.map((m) => (
                    <div key={m.name} className="bg-white p-10 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow group hover:border-[#D4AF37]/40 transition-all duration-500 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAF8] rounded-full group-hover:scale-150 transition-transform duration-1000 -z-10"></div>
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-3xl bg-[#FAFAF8] p-0.5 border border-[#E8E8E8] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-xl overflow-hidden relative">
                             <img 
                                src={`https://api.placeholder.com/150/150`} 
                                alt={m.name} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                             />
                             <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-white ${m.borrower ? 'bg-[#D4AF37]' : 'bg-emerald-500 animate-pulse'}`}></div>
                          </div>
                          <div className="flex-1">
                             <h4 className="font-black text-xl text-[#1A1A1A] tracking-tight group-hover:text-[#D4AF37] transition-colors">{m.name}</h4>
                             <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">{m.borrower ? 'Principal' : 'Auditor'}</span>
                                <span className="w-1 h-1 rounded-full bg-[#E8E8E8]"></span>
                                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">{m.score} QP</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="mt-10 pt-10 border-t border-[#F5F3F0] flex justify-between items-center">
                          <div>
                             <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-1">{m.borrower ? 'Liquidity Goal' : 'Circle Stake'}</p>
                             <p className="font-black text-2xl text-[#1A1A1A] tracking-tighter leading-none">{m.borrower ? m.amount : m.contribution}</p>
                          </div>
                          <Link to="/vouch" className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${m.borrower ? 'bg-[#1A1A1A] text-white hover:bg-[#D4AF37] luxury-shadow' : 'bg-[#FAFAF8] text-[#8C8C8C] hover:text-[#1A1A1A] border border-[#E8E8E8]'}`}>
                             {m.borrower ? 'Audit Request' : 'Node Details'}
                          </Link>
                       </div>
                    </div>
                 ))}
                 
                 {/* Open Slot */}
                 <div className="bg-[#FAFAF8] border-3 border-dashed border-[#E8E8E8] rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#D4AF37]/60 hover:bg-white transition-all duration-500">
                    <div className="w-16 h-16 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#1A1A1A] mb-6 group-hover:scale-110 group-hover:rotate-90 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500 shadow-sm">
                       <iconify-icon icon="lucide:plus" className="text-3xl"></iconify-icon>
                    </div>
                    <p className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-[0.3em]">Invite Trust Peer</p>
                    <p className="text-[10px] font-medium text-[#8C8C8C] mt-2 max-w-[200px] leading-relaxed">Expand the circle to increase collective lending capacity & rewards.</p>
                 </div>
              </div>
           </div>

           {/* AI Oracle & Governance */}
           <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#1A1A1A] text-white p-12 rounded-[4rem] luxury-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37] opacity-[0.2] blur-[60px] group-hover:scale-150 duration-700"></div>
                 <h4 className="font-cabinet text-2xl font-black tracking-tight mb-10 text-white">Circle Governance</h4>
                 
                 <div className="space-y-10">
                    <div className="bg-white/5 border border-white/10 p-7 rounded-[2rem] backdrop-blur-md relative group/box">
                       <div className="flex items-center gap-4 mb-3">
                          <iconify-icon icon="lucide:cpu" className="text-[#D4AF37] text-xl animate-pulse"></iconify-icon>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Risk Oracle</span>
                       </div>
                       <p className="text-xs text-white/50 leading-relaxed font-medium">Sybil-proof verification active. Cluster health: <span className="text-emerald-400 font-black">99.8%</span>. Default correlation risk: <span className="text-[#D4AF37] font-black">Negligible</span>.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-7 rounded-[2rem] backdrop-blur-md relative group/box">
                       <div className="flex items-center gap-4 mb-3">
                          <iconify-icon icon="lucide:activity" className="text-[#D4AF37] text-xl"></iconify-icon>
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Streak</span>
                       </div>
                       <p className="text-xs text-white/50 leading-relaxed font-medium">Collective on-time repayment: <span className="text-white font-black underline decoration-[#D4AF37]">42 Cycles</span>. Bonus yield multiplier: <span className="text-white font-black">1.4x</span>.</p>
                    </div>
                 </div>

                 <button className="w-full mt-12 py-6 rounded-full gold-gradient text-white font-black uppercase text-[11px] tracking-[0.3em] luxury-shadow hover:scale-105 transition-all active:scale-95 relative z-10">
                    Request Peer Vouch
                 </button>
              </div>

              <div className="bg-white p-12 rounded-[4rem] border border-[#E8E8E8] luxury-shadow group">
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-10">Circle Statutes</p>
                 <ul className="space-y-8">
                    {[
                       'Minimum Reputation Quotient > 50',
                       'Stake slashing on principal protocol default',
                       'Governance participation rewards yield',
                       'Proportional peer auditing requirements'
                    ].map((rule, i) => (
                       <li key={i} className="flex gap-6 items-start group/item">
                          <span className="text-[#D4AF37] font-black font-cabinet text-xl leading-none transition-transform group-hover/item:scale-125">0{i+1}</span>
                          <span className="text-xs font-medium text-[#8C8C8C] leading-relaxed group-hover/item:text-[#1A1A1A] transition-colors">{rule}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
