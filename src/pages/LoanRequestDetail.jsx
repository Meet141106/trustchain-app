import { Link, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function LoanRequestDetail() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();

  return (
    <AppShell pageTitle="Loan Request Detail" pageSubtitle="Capital Deployment Audit" showNav={true}>
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        
        {/* Loan Identity Header */}
        <div className={`p-10 rounded-[3rem] border transition-all duration-500
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A6E2F] flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                S
              </div>
              <div>
                <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-1">Request ID: {id || "#TR-9421"}</p>
                <h1 className={`font-cabinet text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  Sovereign Node 452
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#1A1A1A] bg-[#E8E8E8] flex items-center justify-center text-[8px] font-black
                        ${isDarkMode ? 'bg-[#333] text-white' : 'bg-[#FAFAF8] text-[#1A1A1A]'}`}>
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Vouched by 12 Nodes</span>
                </div>
              </div>
            </div>
            <div className={`px-6 py-3 rounded-full border flex items-center gap-3
              ${isDarkMode ? 'bg-[#10B981]/10 border-[#10B981]/20 text-[#10B981]' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
               <iconify-icon icon="lucide:shield-check" className="text-lg"></iconify-icon>
               <span className="text-[10px] font-black uppercase tracking-widest">Minimial Risk Audit</span>
            </div>
          </div>
        </div>

        {/* Financial Logic */}
        <div className={`p-12 md:p-16 rounded-[4rem] border transition-all duration-500 relative overflow-hidden group
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.02] blur-[100px] -z-10"></div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em]">Funding Commitment Needed</p>
                 <h2 className={`font-cabinet text-7xl md:text-8xl font-black tracking-tighter leading-none
                   ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>$5,000.00</h2>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">USDC Settlement Archway</p>
              </div>

              <div className={`p-10 rounded-[3rem] min-w-[220px] transition-all duration-500 transform hover:scale-105
                ${isDarkMode ? 'bg-black text-white border border-[#333]' : 'bg-[#1A1A1A] text-white'}`}>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-4">Allocated APY</p>
                 <span className="text-5xl font-black font-cabinet tracking-tighter leading-none">12.4%</span>
              </div>
           </div>

           <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>
              {[
                { label: 'Term Length', val: '90 Cycles', icon: 'lucide:calendar' },
                { label: 'Collateral Mechanism', val: 'Reputation Only', icon: 'lucide:award' },
                { label: 'Vouch Liquidity', val: '$12,400 Staked', icon: 'lucide:layers' }
              ].map((item, i) => (
                 <div key={i} className="space-y-2 group/item">
                    <div className="flex items-center gap-2 text-[#8C8C8C] group-hover/item:text-[#D4AF37] transition-colors">
                       <iconify-icon icon={item.icon} className="text-lg"></iconify-icon>
                       <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    <p className={`font-black text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{item.val}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Borrower Reputation Audit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className={`p-10 rounded-[3.5rem] border group transition-all duration-500
             ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
              <div className="flex items-center gap-8 mb-8">
                 <div className="w-20 h-20 rounded-3xl bg-[#D4AF37] flex items-center justify-center text-black shadow-xl group-hover:rotate-12 transition-transform">
                    <span className="text-3xl font-black font-cabinet">842</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1 font-cabinet">Reputation Quotient</p>
                    <h4 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Noir Elite Level</h4>
                 </div>
              </div>
              <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
                Subject belongs to the top <span className={isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}>2.1%</span> of the network. Fidelity audit confirms zero liquidation events across 8 cycles.
              </p>
           </div>

           <div className={`p-10 rounded-[3.5rem] border relative overflow-hidden group transition-all duration-500
             ${isDarkMode ? 'bg-black border-[#333]' : 'bg-[#1A1A1A] text-white'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[60px] group-hover:scale-150 duration-700"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:rotate-12 transition-transform">
                 <iconify-icon icon="lucide:brain" className="text-3xl animate-pulse"></iconify-icon>
              </div>
              <h4 className="font-cabinet text-2xl font-black tracking-tight mb-4">Protocol Intel Audit</h4>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                Sovereign behavior patterns suggest <span className="text-white font-black underline decoration-[#D4AF37]">98.4% Settlement Fidelity</span>. High alignment with Syndicate growth metrics.
              </p>
           </div>
        </div>

        {/* Global Action Vector */}
        <div className="flex flex-col sm:flex-row gap-6 pt-12">
           <Link to="/marketplace" className={`flex-1 py-6 rounded-full border font-black uppercase text-[12px] tracking-[0.3em] text-center transition-all
             ${isDarkMode ? 'border-[#333] text-[#8C8C8C] hover:bg-white/5' : 'border-[#E8E8E8] text-[#8C8C8C] hover:bg-[#FAFAF8]'}`}>
              Reject Audit
           </Link>
           <button className="flex-[2] py-6 rounded-full bg-[#1A1A1A] dark:bg-[#D4AF37] text-white dark:text-black font-black uppercase text-[12px] tracking-[0.3em] text-center luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
              Initialize Funding Drawdown <iconify-icon icon="lucide:arrow-right" className="ml-2 transition-transform group-hover:translate-x-2"></iconify-icon>
           </button>
        </div>
      </div>
    </AppShell>
  );
}
