import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ActiveLoanDetail() {
  const { isDarkMode } = useTheme();

  return (
    <AppShell pageTitle="Loan Detail" pageSubtitle="Lifecycle View">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Lifecycle Timeline */}
        <div className={`p-10 rounded-[3rem] border transition-all duration-500
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-10 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E8E8E8] dark:bg-[#333] -z-10 hidden md:block"></div>
            
            {[
              { step: "Requested", date: "Oct 12", active: true, done: true },
              { step: "Approved", date: "Oct 14", active: true, done: true },
              { step: "Active", date: "Present", active: true, done: false },
              { step: "Repaid", date: "Expected Nov 24", active: false, done: false }
            ].map((node, i) => (
              <div key={node.step} className="flex flex-col items-center bg-transparent group relative">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
                  ${node.done ? 'bg-[#10B981] border-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 
                    node.active ? 'bg-[#D4AF37] border-[#D4AF37] text-white animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 
                    isDarkMode ? 'bg-[#1A1A1A] border-[#333] text-[#444]' : 'bg-white border-[#E8E8E8] text-[#8C8C8C]'}`}>
                  {node.done ? <iconify-icon icon="lucide:check"></iconify-icon> : <span>{i + 1}</span>}
                </div>
                <div className="mt-4 text-center">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${node.active || node.done ? (isDarkMode ? 'text-white' : 'text-[#1A1A1A]') : 'text-[#8C8C8C]'}`}>{node.step}</p>
                  <p className="text-[10px] font-medium text-[#8C8C8C] mt-1">{node.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Monitor */}
        <div className={`p-12 md:p-16 rounded-[4rem] border transition-all duration-500 relative overflow-hidden group
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.02] blur-[120px] transition-transform group-hover:scale-110 -z-10"></div>
           
           <div className="flex flex-col items-center text-center space-y-10">
              <div className="px-6 py-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                 <span className="text-[10px] font-black text-[#10B981] uppercase tracking-widest">Healthy Integrity</span>
              </div>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em]">Total Facility Obligations</p>
                 <h2 className={`font-cabinet text-7xl md:text-8xl font-black tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700
                   ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>$454.50</h2>
              </div>

              {/* Progress Infra */}
              <div className="w-full max-w-xl space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Settlement Timeline</span>
                    <span className="text-sm font-black text-[#D4AF37] uppercase tracking-widest">12 Days Remaining</span>
                 </div>
                 <div className={`w-full h-2 rounded-full overflow-hidden luxury-shadow-sm ${isDarkMode ? 'bg-[#333]' : 'bg-[#F5F3F0]'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#A3832B]"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Detailed Ledger */}
           <div className={`lg:col-span-12 xl:col-span-8 p-10 md:p-14 rounded-[3.5rem] border transition-all duration-500
             ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
              <h3 className={`font-cabinet text-3xl font-black mb-10 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Capital Facility Audit</h3>
              <div className="space-y-8">
                 {[
                   { label: 'Original Principal', value: '$450.00' },
                   { label: 'Accrued Facility Yield', value: '+$4.50', color: 'text-rose-500' },
                   { label: 'Collective Accountability', value: 'Syndicate Vouch (14 Members)', icon: "lucide:users-2" },
                   { label: 'Active Maturity Term', value: '12 Cycles' },
                   { label: 'Reputation Buffer', value: 'Noir Enabled (+12 QP)' }
                 ].map((item, i) => (
                    <div key={i} className={`flex justify-between items-center py-6 border-b transition-all duration-300
                      ${isDarkMode ? 'border-[#333] hover:bg-white/5' : 'border-[#F5F3F0] hover:bg-[#FAFAF8]'}`}>
                       <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">{item.label}</span>
                       <div className="flex items-center gap-3 text-right">
                          {item.icon && <iconify-icon icon={item.icon} className="text-[#D4AF37]"></iconify-icon>}
                          <span className={`text-xl font-black tracking-tight ${item.color || (isDarkMode ? 'text-white' : 'text-[#1A1A1A]')}`}>{item.value}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* AI Insight Sidebar */}
           <div className="lg:col-span-12 xl:col-span-4 space-y-8">
              <div className={`p-10 rounded-[3.5rem] luxury-shadow relative overflow-hidden group transition-all duration-500
                ${isDarkMode ? 'bg-black border border-[#333]' : 'bg-[#1A1A1A] text-white border border-[#1A1A1A]'}`}>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[60px] group-hover:scale-150 duration-700"></div>
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:rotate-12 transition-transform">
                    <iconify-icon icon="lucide:sparkles" className="text-3xl animate-pulse"></iconify-icon>
                 </div>
                 <h4 className={`font-cabinet text-2xl font-black tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-white'}`}>Sovereign Growth Prediction</h4>
                 <p className="text-sm text-white/50 leading-relaxed font-medium mb-10 italic">"Historical fidelity suggests an 84% probability of triggering a <span className="text-[#D4AF37] font-black underline underline-offset-4 decoration-white/20">Noir Elite Upgrade</span> if this cycle is settled within the next 72 hours."</p>
                 <button className="w-full py-5 rounded-full gold-gradient text-white font-black uppercase text-[10px] tracking-[0.3em] luxury-shadow hover:scale-105 transition-all">
                    Initiate Premium Settlement
                 </button>
              </div>

              <div className={`p-10 rounded-[3.5rem] border group transition-all duration-500
                ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-[#FAFAF8] border-[#E8E8E8]'}`}>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-4">Integrity Status</p>
                 <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-[#10B981] shadow-sm group-hover:scale-110 transition-transform
                      ${isDarkMode ? 'bg-black border-[#333]' : 'bg-white border-[#E8E8E8]'}`}>
                       <iconify-icon icon="lucide:shield-check" className="text-3xl"></iconify-icon>
                    </div>
                    <div>
                       <h5 className={`font-black text-xl tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Perfect Fidelity</h5>
                       <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-widest">No overdue indicators</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Action */}
        <div className="flex justify-center pb-20">
           <button className="w-full max-w-lg py-6 rounded-full bg-[#1A1A1A] dark:bg-[#D4AF37] text-white dark:text-black font-black uppercase text-[12px] tracking-[0.4em] luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
              Execute Settlement <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
           </button>
        </div>
      </div>
    </AppShell>
  );
}
