import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function ActiveLoanDetail() {
  return (
    <AppShell pageTitle="Facility Lifecycle" pageSubtitle="Real-time monitoring of your active credit drawdown">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-12">
        
        {/* Core Monitor */}
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.02] blur-[120px] transition-transform group-hover:scale-110 -z-10"></div>
           
           <div className="flex flex-col items-center text-center space-y-10">
              <div className="px-6 py-2 rounded-full border border-emerald-100 bg-emerald-50 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Healthy Integrity</span>
              </div>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em]">Total Facility Obligations</p>
                 <h2 className="font-cabinet text-7xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">$454.50</h2>
              </div>

              {/* Progress Infra */}
              <div className="w-full max-w-xl space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Settlement Timeline</span>
                    <span className="text-sm font-black text-[#D4AF37] uppercase tracking-widest">12 Days Remaining</span>
                 </div>
                 <div className="w-full h-2 bg-[#F5F3F0] rounded-full overflow-hidden luxury-shadow-sm">
                    <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#A3832B]" style={{ width: '65%' }}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Detailed Ledger */}
           <div className="lg:col-span-12 xl:col-span-8 bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow">
              <h3 className="font-cabinet text-3xl font-black mb-10 tracking-tight text-[#1A1A1A]">Account Ledger</h3>
              <div className="space-y-8">
                 {[
                   { label: 'Original Principal', value: '$450.00' },
                   { label: 'Accrued Facility Yield', value: '+$4.50', color: 'text-rose-500' },
                   { label: 'Repayment Pathway', value: 'Syndicate Vouch' },
                   { label: 'Original Maturity Term', value: '12 Cycles' },
                   { label: 'Collective Accountability Node', value: 'Dharavi Circle #442' }
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-6 border-b border-[#F5F3F0] hover:px-4 transition-all duration-300">
                       <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">{item.label}</span>
                       <span className={`text-xl font-black tracking-tight ${item.color || 'text-[#1A1A1A]'}`}>{item.value}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* AI Insight Sidebar */}
           <div className="lg:col-span-12 xl:col-span-4 space-y-8">
              <div className="bg-[#1A1A1A] text-white p-10 rounded-[3.5rem] luxury-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[60px] group-hover:scale-150 duration-700"></div>
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:rotate-12 transition-transform">
                    <iconify-icon icon="lucide:sparkles" className="text-3xl animate-pulse"></iconify-icon>
                 </div>
                 <h4 className="font-cabinet text-2xl font-black tracking-tight mb-4">AI Yield Prediction</h4>
                 <p className="text-sm text-white/50 leading-relaxed font-medium mb-10">Historical fidelity suggests an 84% probability of triggering a <span className="text-[#D4AF37] font-black">Noir Elite Upgrade</span> if this cycle is settled within the next 72 hours.</p>
                 <button className="w-full py-5 rounded-full gold-gradient text-white font-black uppercase text-[10px] tracking-[0.3em] luxury-shadow hover:scale-105 transition-all">
                    Unlock Potential
                 </button>
              </div>

              <div className="bg-[#FAFAF8] p-10 rounded-[3.5rem] border border-[#E8E8E8] group">
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-4">Integrity Status</p>
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#E8E8E8] flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                       <iconify-icon icon="lucide:shield-check" className="text-3xl"></iconify-icon>
                    </div>
                    <div>
                       <h5 className="font-black text-xl tracking-tight text-[#1A1A1A]">Perfect Fidelity</h5>
                       <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-widest">No overdue indicators</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Action */}
        <div className="sticky bottom-10 z-20 max-w-lg mx-auto">
           <Link to="/repay" className="w-full py-6 rounded-full bg-[#1A1A1A] text-white font-black uppercase text-[12px] tracking-[0.4em] luxury-shadow hover:bg-[#D4AF37] hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
              Initiate Global Settlement <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-2 text-lg"></iconify-icon>
           </Link>
        </div>
      </div>
    </AppShell>
  );
}
