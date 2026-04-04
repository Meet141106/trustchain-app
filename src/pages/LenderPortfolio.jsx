import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function LenderPortfolio() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Lender Portfolio" pageSubtitle="Liquidity Inventory">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Summary Pane */}
          <div className="lg:col-span-4 space-y-10">
            <div className={`p-10 md:p-12 rounded-[3.5rem] border transition-all duration-500 luxury-shadow relative overflow-hidden group
              ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/5'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.03] blur-[60px] group-hover:scale-150 duration-700"></div>
              <p className="text-[#8C8C8C] text-[10px] font-black uppercase tracking-[0.2em] mb-6">Total Capital Commitment</p>
              <h3 className={`text-5xl font-black mb-2 tracking-tighter font-cabinet ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>$12,450.00</h3>
              <div className="flex items-center gap-2 text-[#10B981] text-xs font-black uppercase tracking-widest bg-[#10B981]/5 px-4 py-1.5 rounded-full border border-[#10B981]/10 w-fit">
                <iconify-icon icon="lucide:trending-up"></iconify-icon><span>+12.4% Est. Yield</span>
              </div>
            </div>
            
            <div className={`p-10 rounded-[3rem] border luxury-shadow group overflow-hidden relative transition-all duration-500
              ${isDarkMode ? 'bg-black border-[#333]' : 'bg-[#1A1A1A] text-white'}`}>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[50px] transition-transform group-hover:scale-125"></div>
              <h4 className={`font-cabinet text-xl font-black mb-8 tracking-tight relative z-10 ${isDarkMode ? 'text-white' : 'text-white'}`}>Risk Intelligence</h4>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center group-hover:px-2 duration-300">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Stake Factor</span>
                  <span className="text-[#10B981] font-black text-lg tracking-tighter">0.92</span>
                </div>
                <div className="flex justify-between items-center group-hover:px-2 duration-300">
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Default Probability</span>
                  <span className="text-[#D4AF37] font-black text-lg tracking-tighter">&lt;0.01%</span>
                </div>
                <div className={`pt-6 border-t ${isDarkMode ? 'border-white/5' : 'border-white/10'}`}>
                   <p className="text-[10px] text-white/30 leading-relaxed font-medium">Portfolio is <span className="text-white">Reputation Optimized</span> for micro-lending cycles.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Allocation Pane */}
          <div className={`lg:col-span-8 p-10 md:p-16 rounded-[4rem] border transition-all duration-500 luxury-shadow flex flex-col relative overflow-hidden group
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8]'}`}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FAFAF8] opacity-50 blur-[100px] -z-10"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 relative z-10">
              <div>
                <h4 className={`text-3xl font-black font-cabinet tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Liquidity Distribution</h4>
                <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-2 font-cabinet">Global Allocation Strategy</p>
              </div>
              <button className={`px-8 py-4 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#D4AF37] hover:text-black active:scale-95
                ${isDarkMode ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#1A1A1A] text-[#1A1A1A]'}`}>
                Rebalance Hierarchy
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 flex-1 relative z-10">
              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 transition-transform duration-700 group-hover:scale-105">
                <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[-90deg]">
                  <circle cx="18" cy="18" r="15.8" fill="transparent" stroke={isDarkMode ? "#333" : "#F5F3F0"} strokeWidth="4.2" />
                  <circle cx="18" cy="18" r="15.8" fill="transparent" stroke="#D4AF37" strokeWidth="4.2" strokeDasharray="45 100" strokeDashoffset="0" className="transition-all duration-1000" />
                  <circle cx="18" cy="18" r="15.8" fill="transparent" stroke="#10B981" strokeWidth="4.2" strokeDasharray="30 100" strokeDashoffset="-45" className="transition-all duration-1000" />
                  <circle cx="18" cy="18" r="15.8" fill="transparent" stroke="#1A1A1A" strokeWidth="4.2" strokeDasharray="25 100" strokeDashoffset="-75" className={`transition-all duration-1000 ${isDarkMode ? 'stroke-white' : ''}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>100%</span>
                  <span className="text-[9px] text-[#8C8C8C] font-black uppercase tracking-[0.2em] mt-1 font-cabinet">Deployed</span>
                </div>
              </div>

              <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-10 md:gap-y-12">
                {[
                  { label: "Sovereign Trust Lines", pct: "45.0%", color: "#D4AF37" },
                  { label: "Syndicate Vouch Pools", pct: "30.0%", color: "#10B981" },
                  { label: "Direct Circle Funding", pct: "25.0%", color: isDarkMode ? "#FFF" : "#1A1A1A" }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-5 group/item">
                    <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <div>
                      <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-1 group-hover/item:text-[#D4AF37] transition-colors font-cabinet">{item.label}</p>
                      <p className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{item.pct}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Asset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { tag: 'Micro-Lending', title: 'Agri-Credit Node #12', amount: '$4,250', weight: '34.1%', icon: 'lucide:sprout', vouchers: 14 },
            { tag: 'Syndicate', title: 'Tech Hub Expansion', amount: '$3,800', weight: '30.5%', icon: 'lucide:cpu', vouchers: 8 },
            { tag: 'Social', title: 'Community Trust Fund', amount: '$2,500', weight: '20.1%', icon: 'lucide:users-2', vouchers: 22 },
            { tag: 'Safety', title: 'Auto-Settle Buffer', amount: '$1,900', weight: '15.3%', icon: 'lucide:shield-check', vouchers: 0 }
          ].map((item, idx) => (
            <div key={idx} className={`p-10 rounded-[3rem] border transition-all cursor-pointer group relative overflow-hidden
              ${isDarkMode ? 'bg-[#1A1A1A] border-[#333] hover:border-[#D4AF37]' : 'bg-white border-[#E8E8E8] luxury-shadow hover:border-[#D4AF37]'}`}>
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D4AF37] opacity-[0.03] rounded-full transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                  ${isDarkMode ? 'bg-black text-[#D4AF37] border border-[#333]' : 'bg-[#FAFAF8] text-[#1A1A1A] border border-[#E8E8E8] group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
                  <iconify-icon icon={item.icon} className="text-2xl"></iconify-icon>
                </div>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest
                  ${isDarkMode ? 'bg-black border-[#333] text-[#8C8C8C]' : 'bg-[#FAFAF8] border-[#E8E8E8] text-[#8C8C8C]'}`}>{item.tag}</span>
              </div>
              
              <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2 font-cabinet">{item.title}</h5>
              <div className="flex justify-between items-end mb-8 relative z-10">
                <h3 className={`text-3xl font-black tracking-tighter leading-none ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>{item.amount}</h3>
                <span className="text-[11px] font-black text-[#10B981] uppercase tracking-widest">Active</span>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-full h-1.5 bg-[#F5F3F0] dark:bg-[#333] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: item.weight }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-[#D4AF37]" 
                  />
                </div>
                {item.vouchers > 0 && (
                  <div className="flex items-center gap-2">
                    <iconify-icon icon="lucide:users-2" className="text-[#8C8C8C] text-xs"></iconify-icon>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8C8C8C]">Vouched by {item.vouchers} Nodes</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Settlement Ledger */}
        <div className={`rounded-[3.5rem] border overflow-hidden luxury-shadow transition-all duration-500
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8]'}`}>
          <div className={`px-10 md:px-14 py-10 md:py-12 border-b flex flex-col md:flex-row justify-between items-center gap-8
            ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>
            <div>
              <h4 className={`text-3xl font-black font-cabinet tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Liquidity Audit Ledger</h4>
              <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mt-2 font-cabinet">Immutable on-chain verification logs</p>
            </div>
            <div className="flex gap-4">
              <button className={`px-8 py-4 rounded-full bg-[#1A1A1A] dark:bg-[#D4AF37] text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] luxury-shadow hover:scale-105 transition-all active:scale-95`}>
                Initialize Rebalance
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className={isDarkMode ? 'bg-black/20' : 'bg-[#FAFAF8]'}>
                <tr>
                  <th className={`px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>Execution Event</th>
                  <th className={`px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>Deployment Node</th>
                  <th className={`px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>Commitment</th>
                  <th className={`px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>Finality</th>
                  <th className={`px-14 py-6 text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest border-b text-right ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-[#333]' : 'divide-[#F5F3F0]'}`}>
                {[
                  { event: 'Capital Allocation', asset: 'Agri-Credit Node #12', amount: '+ $1,250.00', time: 'Nov 15, 2023', status: 'Success' },
                  { event: 'Yield Recognition', asset: 'Tech Hub Syndicate', amount: '+ $240.00', time: 'Nov 14, 2023', status: 'Verified' },
                  { event: 'Node Rebalancing', asset: 'Direct Peer Line #04', amount: '- $500.00', time: 'Nov 13, 2023', status: 'Immutable' }
                ].map((row, idx) => (
                  <tr key={idx} className={`transition-all group/row duration-300 cursor-pointer ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-[#FAFAF8]'}`}>
                    <td className="px-14 py-10">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${isDarkMode ? 'bg-black border-[#333] text-[#D4AF37]' : 'bg-white border-[#E8E8E8] text-[#1A1A1A]'}`}>
                          <iconify-icon icon="lucide:activity" className="text-xl"></iconify-icon>
                        </div>
                        <div>
                           <p className={`font-black text-sm uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{row.event}</p>
                           <p className="text-[10px] text-[#8C8C8C] font-medium mt-1 uppercase tracking-widest">{row.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-14 py-10 font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{row.asset}</td>
                    <td className={`px-14 py-10 font-black text-[#10B981] font-mono tracking-tighter text-lg`}>{row.amount}</td>
                    <td className="px-14 py-10 text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">AI Validator Node #92</td>
                    <td className="px-14 py-10 text-right">
                      <span className={`text-[9px] px-4 py-1.5 rounded-full uppercase font-black tracking-widest transition-all
                        ${isDarkMode ? 'bg-black border border-[#333] text-white' : 'bg-white border border-[#E8E8E8] text-[#1A1A1A] group-hover/row:bg-[#1A1A1A] group-hover/row:text-white'}`}>
                        {row.status}
                      </span>
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
