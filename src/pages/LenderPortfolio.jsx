import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function LenderPortfolio() {
  return (
    <AppShell pageTitle="Liquidity Inventory" pageSubtitle="Real-time audit of your decentralized capital deployment">
      <div className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Summary Pane */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-[#D4AF37]/20 transition-all hover:border-[#D4AF37]/50 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.03] blur-[60px] group-hover:scale-150 duration-700"></div>
              <p className="text-[#8C8C8C] text-[10px] font-black uppercase tracking-[0.2em] mb-6">Total Capital Commitment</p>
              <h3 className="text-5xl font-black text-[#1A1A1A] mb-2 tracking-tighter font-cabinet">$12,450.00</h3>
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 w-fit">
                <iconify-icon icon="lucide:trending-up"></iconify-icon><span>+12.4% Est. Yield</span>
              </div>
            </div>
            
            <div className="bg-[#1A1A1A] p-10 rounded-[3rem] border border-white/5 luxury-shadow group overflow-hidden relative">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[50px] transition-transform group-hover:scale-125"></div>
              <h4 className="text-white font-cabinet text-xl font-black mb-8 tracking-tight relative z-10">Risk Intelligence</h4>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center group-hover:px-2 duration-300">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Stake Factor</span>
                  <span className="text-emerald-400 font-black text-lg tracking-tighter">0.92</span>
                </div>
                <div className="flex justify-between items-center group-hover:px-2 duration-300">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Slashing Probability</span>
                  <span className="text-[#D4AF37] font-black text-lg tracking-tighter">&lt;0.01%</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-[10px] text-white/30 leading-relaxed font-medium">Your current allocation is <span className="text-white">AI-Optimized</span> for unbanked micro-lending cycles.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Allocation Pane */}
          <div className="lg:col-span-8 bg-white p-10 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FAFAF8] opacity-50 blur-[100px] -z-10"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 relative z-10">
              <div>
                <h4 className="text-3xl font-black font-cabinet tracking-tight text-[#1A1A1A]">Liquidity Distribution</h4>
                <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-2">Global Allocation Strategy</p>
              </div>
              <button className="px-8 py-4 rounded-full border border-[#D4AF37] text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-white transition-all luxury-shadow active:scale-95">Rebalance Hierarchy</button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 flex-1 relative z-10">
              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 transition-transform duration-700 group-hover:scale-105">
                <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[-90deg] drop-shadow-2xl">
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#F5F3F0" strokeWidth="4.5" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#1A1A1A" strokeWidth="4.5" strokeDasharray="45 100" strokeDashoffset="0" className="transition-all duration-1000" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#D4AF37" strokeWidth="4.5" strokeDasharray="30 100" strokeDashoffset="-45" className="transition-all duration-1000" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#8C8C8C" strokeWidth="4.5" strokeDasharray="15 100" strokeDashoffset="-75" className="transition-all duration-1000" />
                  <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#E8E8E8" strokeWidth="4.5" strokeDasharray="10 100" strokeDashoffset="-90" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#1A1A1A]">100%</span>
                  <span className="text-[9px] text-[#8C8C8C] font-black uppercase tracking-[0.2em] mt-1">Staked</span>
                </div>
              </div>

              <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-10 md:gap-y-12">
                <div className="flex items-center gap-5 group/item">
                  <span className="w-4 h-4 rounded-full bg-[#1A1A1A] shrink-0 outline outline-4 outline-[#1A1A1A]/5"></span>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-1 group-hover/item:text-[#1A1A1A] transition-colors">Syndicate Stake</p>
                    <p className="text-2xl font-black tracking-tighter">45.0%</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group/item">
                  <span className="w-4 h-4 rounded-full bg-[#D4AF37] shrink-0 outline outline-4 outline-[#D4AF37]/5"></span>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-1 group-hover/item:text-[#D4AF37] transition-colors">Direct Peer Line</p>
                    <p className="text-2xl font-black tracking-tighter">30.0%</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group/item">
                  <span className="w-4 h-4 rounded-full bg-[#8C8C8C] shrink-0 outline outline-4 outline-[#8C8C8C]/5"></span>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-1 group-hover/item:text-[#1A1A1A] transition-colors">Governance Stake</p>
                    <p className="text-2xl font-black tracking-tighter">15.0%</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 group/item">
                  <span className="w-4 h-4 rounded-full bg-[#E8E8E8] shrink-0 outline outline-4 outline-[#E8E8E8]/5"></span>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-1 group-hover/item:text-[#1A1A1A] transition-colors">Security Buffer</p>
                    <p className="text-2xl font-black tracking-tighter">10.0%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Asset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { tag: 'Micro-Lending', title: 'Agri-Credit Node #12', amount: '$4,250', eth: '34.1%', icon: 'lucide:sprout', color: '#10B981' },
            { tag: 'Syndicate', title: 'Tech Hub Expansion', amount: '$3,800', eth: '30.5%', icon: 'lucide:cpu', color: '#D4AF37' },
            { tag: 'Social', title: 'Community Trust Fund', amount: '$2,500', eth: '20.1%', icon: 'lucide:users-2', color: '#1A1A1A' },
            { tag: 'Safety', title: 'Auto-Settle Buffer', amount: '$1,900', eth: '15.3%', icon: 'lucide:shield-check', color: '#8C8C8C' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[3rem] border border-[#E8E8E8] luxury-shadow hover:border-[#D4AF37]/50 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FAFAF8] rounded-full transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500`}>
                  <iconify-icon icon={item.icon} className="text-2xl"></iconify-icon>
                </div>
                <span className="text-[9px] font-black px-3 py-1 bg-[#FAFAF8] text-[#8C8C8C] rounded-full border border-[#E8E8E8] uppercase tracking-widest">{item.tag}</span>
              </div>
              
              <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2">{item.title}</h5>
              <div className="flex justify-between items-end mb-8 relative z-10">
                <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tighter leading-none">{item.amount}</h3>
                <span className="text-[11px] font-black text-[#D4AF37] uppercase tracking-widest">Active</span>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#8C8C8C]">
                  <span>Capital Weight</span><span>{item.eth}</span>
                </div>
                <div className="w-full h-1.5 bg-[#F5F3F0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1A1A1A] group-hover:bg-[#D4AF37] transition-all duration-700" style={{ width: item.eth }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Settlement Ledger */}
        <div className="bg-white rounded-[3.5rem] border border-[#E8E8E8] overflow-hidden luxury-shadow mb-20 w-full group">
          <div className="px-10 md:px-14 py-10 md:py-12 border-b border-[#F5F3F0] flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h4 className="text-3xl font-black font-cabinet tracking-tight text-[#1A1A1A]">Liquidity Audit Ledger</h4>
              <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-2">Immutable on-chain verification logs</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#E8E8E8] text-[10px] font-black uppercase tracking-[0.2em] text-[#8C8C8C] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all">
                <iconify-icon icon="lucide:filter" className="text-sm"></iconify-icon> Analysis
              </button>
              <button className="flex items-center gap-3 px-8 py-3 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-[0.2em] luxury-shadow hover:bg-[#D4AF37] transition-all active:scale-95">
                <iconify-icon icon="lucide:download" className="text-sm"></iconify-icon> Export Audit
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-[#FAFAF8]">
                <tr>
                  <th className="px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b border-[#F5F3F0]">Execution Event</th>
                  <th className="px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b border-[#F5F3F0]">Node/Circle</th>
                  <th className="px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b border-[#F5F3F0]">Commitment</th>
                  <th className="px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b border-[#F5F3F0]">Finality Agent</th>
                  <th className="px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest text-right border-b border-[#F5F3F0]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F3F0]">
                {[
                  { event: 'Capital Allocation', asset: 'Agri-Credit Node #12', amount: '+ $1,250.00', time: 'Nov 15, 2023', status: 'On-Chain Success' },
                  { event: 'Yield Recognition', asset: 'Tech Hub Syndicate', amount: '+ $240.00', time: 'Nov 14, 2023', status: 'Verified' },
                  { event: 'Node Rebalancing', asset: 'Direct Peer Line #04', amount: '- $500.00', time: 'Nov 13, 2023', status: 'Immutable' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAF8] transition-all group/row duration-300">
                    <td className="px-14 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E8E8] flex items-center justify-center text-[#1A1A1A] group-hover/row:scale-110 group-hover/row:border-[#D4AF37] transition-all">
                          <iconify-icon icon="lucide:activity" className="text-xl"></iconify-icon>
                        </div>
                        <div>
                           <p className="font-black text-sm text-[#1A1A1A] uppercase tracking-tight">{row.event}</p>
                           <p className="text-[10px] text-[#8C8C8C] font-medium mt-1">{row.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-14 py-10 font-black text-[#1A1A1A] tracking-tight">{row.asset}</td>
                    <td className="px-14 py-10 font-black text-emerald-600 font-mono tracking-tighter text-lg">{row.amount}</td>
                    <td className="px-14 py-10 text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">AI Validator Node #92</td>
                    <td className="px-14 py-10 text-right">
                      <span className="text-[9px] px-4 py-1.5 bg-white border border-[#E8E8E8] text-[#1A1A1A] rounded-full uppercase font-black tracking-widest group-hover/row:bg-[#1A1A1A] group-hover/row:text-white transition-all">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
