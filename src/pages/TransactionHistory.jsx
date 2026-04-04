import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const transactions = [
  {
    type: 'Settlement', date: 'Oct 24, 2023', amount: '$1,250.00',
    status: 'Settled', statusVariant: 'success',
    icon: 'lucide:check-circle',
    hash: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d'
  },
  {
    type: 'Capital Drawdown', date: 'Oct 22, 2023', amount: '$2,000.00',
    status: 'Executed', statusVariant: 'success',
    icon: 'lucide:arrow-down-left',
    hash: '0xb4cf539739df2c5dacb4c659f2488d7a250d5630'
  },
  {
    type: 'Risk Mitigation', date: 'Oct 20, 2023', amount: '-',
    status: 'Alert', statusVariant: 'danger',
    icon: 'lucide:shield-alert',
    detail: 'Reputation Quotient drop detected. Immediate action required to stabilize facility.'
  },
  {
    type: 'Vouch Yield', date: 'Oct 15, 2023', amount: '$45.20',
    status: 'Accruing', statusVariant: 'warning',
    icon: 'lucide:star',
    hash: '0x39df2c5dacb4c659f2488d7a250d5630b4cf5397'
  }
];

export default function TransactionHistory() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <AppShell pageTitle="Ledger of Trust" pageSubtitle="Real-time on-chain verification & settlement logs">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1200px] mx-auto">
        
        {/* Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {[
             { label: 'Total Volume', value: '$124.5K', icon: 'lucide:layers' },
             { label: 'Avg Settlement', value: '4.2 Days', icon: 'lucide:clock' },
             { label: 'Trust Integrity', value: '99.8%', icon: 'lucide:shield-check' }
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#E8E8E8] luxury-shadow flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#D4AF37]">
                   <iconify-icon icon={stat.icon} className="text-2xl"></iconify-icon>
                </div>
                <div>
                   <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter">{stat.value}</h3>
                </div>
             </div>
           ))}
        </div>

        {/* Ledger List */}
        <div className="space-y-4">
           {transactions.map((tx, i) => (
             <div key={i} className="bg-white rounded-[2rem] border border-[#E8E8E8] luxury-shadow overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300">
                <div 
                   className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                   <div className="flex items-center gap-6 text-left">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${tx.statusVariant === 'danger' ? 'bg-rose-50 text-rose-500' : 'bg-[#FAFAF8] text-[#D4AF37] group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
                         <iconify-icon icon={tx.icon} className="text-2xl"></iconify-icon>
                      </div>
                      <div>
                         <h4 className="font-bold text-[#1A1A1A] tracking-tight">{tx.type}</h4>
                         <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mt-0.5">{tx.date}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                         <p className={`font-black text-lg tracking-tight ${tx.statusVariant === 'danger' ? 'text-rose-500' : 'text-[#1A1A1A]'}`}>{tx.amount}</p>
                         <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${tx.statusVariant === 'success' ? 'bg-emerald-50 text-emerald-600' : tx.statusVariant === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-500'}`}>
                            {tx.status}
                         </span>
                      </div>
                      <iconify-icon icon="lucide:chevron-down" className={`text-[#8C8C8C] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}></iconify-icon>
                   </div>
                </div>

                {openIndex === i && (
                   <div className="px-8 pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-dashed border-[#E8E8E8] mt-2 animate-fadeIn">
                      <div className="md:col-span-8">
                         <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-4">Verification Node</p>
                         {tx.hash ? (
                            <div className="bg-[#FAFAF8] p-4 rounded-xl border border-[#E8E8E8] flex flex-col gap-2">
                               <p className="text-[10px] font-mono text-[#8C8C8C] break-all leading-relaxed">{tx.hash}</p>
                               <a href="#" className="text-[9px] font-black uppercase text-[#D4AF37] tracking-widest flex items-center gap-1 hover:underline">
                                  View on Blockchain Explorer <iconify-icon icon="lucide:external-link" className="text-[10px]"></iconify-icon>
                               </a>
                            </div>
                         ) : (
                            <p className="text-xs text-[#8C8C8C] leading-relaxed">{tx.detail}</p>
                         )}
                      </div>
                      <div className="md:col-span-4 flex flex-col justify-end">
                         <button className="w-full py-4 rounded-xl bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all">
                            Download Receipt
                         </button>
                      </div>
                   </div>
                )}
             </div>
           ))}
        </div>

        {/* Audit Disclaimer */}
        <div className="mt-16 text-center space-y-4 max-w-[600px] mx-auto">
           <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E8E8E8] flex items-center justify-center text-[#8C8C8C] mx-auto shadow-sm">
              <iconify-icon icon="lucide:shield-check" className="text-xl"></iconify-icon>
           </div>
           <p className="text-[10px] font-medium text-[#8C8C8C] leading-relaxed tracking-wider uppercase">
              TrustLend ensures all ledger entries are immutable, cryptographically signed, and globally auditable via decentralized infrastructure.
           </p>
        </div>
      </div>
    </AppShell>
  );
}
