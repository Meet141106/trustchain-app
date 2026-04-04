import { useState } from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const transactions = [
  {
    type: 'Loan Settlement', date: 'Oct 24, 2023', amount: '$1,250.00',
    status: 'Settled', statusVariant: 'success',
    icon: 'lucide:check-circle',
    node: 'Noir Node 84',
    hash: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
  },
  {
    type: 'Capital Drawdown', date: 'Oct 22, 2023', amount: '$2,000.00',
    status: 'Executed', statusVariant: 'success',
    icon: 'lucide:arrow-down-left',
    node: 'Syndicate 402',
    hash: '0xb4cf539739df2c5dacb4c659f2488d7a250d5630'
  },
  {
    type: 'Reputation Gain', date: 'Oct 20, 2023', amount: '+42 QP',
    status: 'Verified', statusVariant: 'success',
    icon: 'lucide:award',
    node: 'Protocol AI',
    detail: 'Early settlement of TII Circle drawdown recognized.'
  },
  {
    type: 'Vouch Yield', date: 'Oct 15, 2023', amount: '$45.20',
    status: 'Accruing', statusVariant: 'warning',
    icon: 'lucide:star',
    node: 'Treasury Node',
    hash: '0x39df2c5dacb4c659f2488d7a250d5630b4cf5397'
  }
];

export default function TransactionHistory() {
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <AppShell pageTitle="Transaction History" pageSubtitle="Ledger of Trust">
      <div className="max-w-6xl mx-auto space-y-12 pb-24">
        
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {[
             { label: 'Total Volume', value: '$124.5K', icon: 'lucide:layers' },
             { label: 'Avg Cycles', value: '4.2 Days', icon: 'lucide:clock' },
             { label: 'Protocol Integrity', value: '99.8%', icon: 'lucide:shield-check' }
           ].map((stat, i) => (
             <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-500 luxury-shadow flex items-center gap-6
               ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8]'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                  ${isDarkMode ? 'bg-black text-[#D4AF37] border border-[#333]' : 'bg-[#FAFAF8] text-[#D4AF37] border border-[#E8E8E8]'}`}>
                   <iconify-icon icon={stat.icon} className="text-2xl"></iconify-icon>
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest font-cabinet">{stat.label}</p>
                   <h3 className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{stat.value}</h3>
                </div>
             </div>
           ))}
        </div>

        {/* Ledger List */}
        <div className="space-y-4">
           {transactions.map((tx, i) => (
             <div key={i} className={`rounded-[2rem] border transition-all duration-300 luxury-shadow overflow-hidden group
               ${isDarkMode ? 'bg-[#1A1A1A] border-[#333] hover:border-[#D4AF37]' : 'bg-white border-[#E8E8E8] hover:border-[#D4AF37]'}`}>
                <div 
                   className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                   <div className="flex items-center gap-6 text-left">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                        ${isDarkMode ? 'bg-black text-[#D4AF37] border border-[#333]' : 'bg-[#FAFAF8] text-[#1A1A1A] border border-[#E8E8E8] group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
                         <iconify-icon icon={tx.icon} className="text-2xl"></iconify-icon>
                      </div>
                      <div>
                         <h4 className={`font-black text-lg tracking-tight font-cabinet ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>{tx.type}</h4>
                         <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mt-0.5">{tx.date}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                         <p className={`font-black text-lg tracking-tight font-mono ${tx.statusVariant === 'danger' ? 'text-rose-500' : isDarkMode ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}>{tx.amount}</p>
                         <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full 
                           ${tx.statusVariant === 'success' ? 'bg-[#10B981]/10 text-[#10B981]' : tx.statusVariant === 'warning' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-rose-500/10 text-rose-500'}`}>
                            {tx.status}
                         </span>
                      </div>
                      <iconify-icon icon="lucide:chevron-down" className={`text-[#8C8C8C] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}></iconify-icon>
                   </div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-dashed ${isDarkMode ? 'border-[#333]' : 'border-[#E8E8E8]'} mt-2`}
                     >
                        <div className="md:col-span-8">
                           <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-4 font-cabinet">Validation Intelligence</p>
                           <div className={`p-5 rounded-2xl border flex flex-col gap-3
                             ${isDarkMode ? 'bg-black border-[#333]' : 'bg-[#FAFAF8] border-[#E8E8E8]'}`}>
                              <div className="flex items-center gap-2">
                                <iconify-icon icon="lucide:cpu" className="text-[#D4AF37]"></iconify-icon>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Finalized by {tx.node}</p>
                              </div>
                              {tx.hash ? (
                                <p className="text-[10px] font-mono text-[#8C8C8C] break-all leading-relaxed">{tx.hash}</p>
                              ) : (
                                <p className="text-xs text-[#8C8C8C] leading-relaxed font-cabinet italic">{tx.detail}</p>
                              )}
                              {tx.hash && (
                                <a href="#" className="text-[9px] font-black uppercase text-[#D4AF37] tracking-widest flex items-center gap-1 hover:underline mt-1">
                                   View On-Chain Receipt <iconify-icon icon="lucide:external-link" className="text-[10px]"></iconify-icon>
                                </a>
                              )}
                           </div>
                        </div>
                        <div className="md:col-span-4 flex flex-col justify-end">
                           <button className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95
                             ${isDarkMode ? 'bg-[#D4AF37] text-black' : 'bg-[#1A1A1A] text-white hover:bg-[#D4AF37] hover:text-black'}`}>
                              Download Immutable Audit
                           </button>
                        </div>
                     </motion.div>
                  )}
                </AnimatePresence>
             </div>
           ))}
        </div>

        {/* Audit Disclaimer */}
        <div className="mt-20 text-center space-y-4 max-w-[600px] mx-auto">
           <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-[#8C8C8C] mx-auto shadow-sm
             ${isDarkMode ? 'bg-black border-[#333]' : 'bg-[#FAFAF8] border-[#E8E8E8]'}`}>
              <iconify-icon icon="lucide:shield-check" className="text-xl"></iconify-icon>
           </div>
           <p className="text-[10px] font-medium text-[#8C8C8C] leading-relaxed tracking-widest uppercase font-cabinet">
             TrustLend ensures all ledger entries are immutable, cryptographically signed by circle nodes, and globally auditable via decentralized infrastructure.
           </p>
        </div>
      </div>
    </AppShell>
  );
}
