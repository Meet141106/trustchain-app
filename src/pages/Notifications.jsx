import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const notifs = [
  { id: 1, type: 'warning', title: 'Payment Due Tomorrow', time: '2h ago', desc: 'Your $450 repayment is due in 24 hours. Ensuring on-time payment protects your TrustScore.', icon: 'lucide:clock' },
  { id: 2, type: 'success', title: 'Loan Fully Funded', time: '1d ago', desc: 'Your request for $1,200 has been fully backed by the community. Funds are in your wallet.', icon: 'lucide:zap' },
  { id: 3, type: 'info', title: 'TrustScore Updated', time: '3d ago', desc: 'Your score has increased to 72. You are now a Silver Borrower.', icon: 'lucide:trending-up' },
  { id: 4, type: 'danger', title: 'Liquidation Risk', time: '1w ago', desc: 'Your collateral ratio dropped to 1.15. Please top up to avoid partial liquidation.', icon: 'lucide:alert-triangle' },
];

export default function Notifications() {
  return (
    <AppShell pageTitle="Protocol Feed" pageSubtitle="Real-time event synchronization & system alerts">
      <div className="p-4 md:p-8 lg:p-12 max-w-[900px] mx-auto space-y-12">
        
        {/* Header Summary */}
        <div className="flex justify-between items-end pb-8 border-b border-[#F5F3F0]">
           <div>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-2">Unread Priority</p>
              <h2 className="font-cabinet text-4xl font-black text-[#1A1A1A] tracking-tighter">02 <span className="text-xl text-[#8C8C8C] uppercase font-black ml-2 tracking-widest">Active Alerts</span></h2>
           </div>
           <button className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest hover:text-[#1A1A1A] transition-colors pb-1 border-b border-[#E8E8E8]">
              Flush All Events
           </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
           {notifs.map(n => (
              <div key={n.id} className="bg-white p-10 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow hover:border-[#D4AF37]/50 transition-all group cursor-pointer relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAF8] rounded-full group-hover:scale-150 transition-transform duration-700 -z-10"></div>
                 
                 <div className="flex items-start gap-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 shadow-xl ${
                       n.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-500' :
                       n.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-500' :
                       n.type === 'danger' ? 'bg-rose-50 border-rose-100 text-rose-500' :
                       'bg-[#FAFAF8] border-[#E8E8E8] text-[#1A1A1A]'
                    }`}>
                       <iconify-icon icon={n.icon} className="text-3xl"></iconify-icon>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-center">
                          <h4 className="font-cabinet text-2xl font-black tracking-tight text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">
                             {n.title}
                          </h4>
                          <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest bg-[#FAFAF8] px-4 py-1.5 rounded-full border border-[#E8E8E8]">
                             {n.time}
                          </span>
                       </div>
                       <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed max-w-xl">
                          {n.desc}
                       </p>
                    </div>

                    <div className="self-center">
                       <iconify-icon icon="lucide:chevron-right" className="text-2xl text-[#E8E8E8] group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all"></iconify-icon>
                    </div>
                 </div>

                 {n.id === 1 && (
                    <div className="mt-8 pt-8 border-t border-[#F5F3F0] flex gap-4">
                       <Link to="/repay" className="px-8 py-3.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-all">
                          Initiate Settlement
                       </Link>
                    </div>
                 )}
              </div>
           ))}
        </div>

        {/* Global Action */}
        <div className="pt-12 text-center">
           <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-8">End of Transmission Feed</p>
           <div className="flex justify-center items-center gap-12 grayscale opacity-30">
              <span className="font-black text-xs tracking-[0.1em]">ENCRYPTED</span>
              <span className="font-black text-xs tracking-[0.1em] italic underline decoration-[#D4AF37] decoration-2 underline-offset-4">TRUSTED NODE</span>
              <span className="font-black text-xs tracking-[0.1em]">ON-CHAIN SYNC</span>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
