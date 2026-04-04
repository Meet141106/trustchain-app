import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function LiquidationWarning() {
  return (
    <AppShell pageTitle="Settlement Alert" pageSubtitle="Risk mitigation & recovery protocols">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1000px] mx-auto space-y-12">
        
        {/* Risk Status Hero */}
        <div className="bg-[#FFF8F8] border border-rose-100 p-10 md:p-14 rounded-[3.5rem] flex flex-col items-center text-center space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 opacity-[0.03] blur-[80px]"></div>
           
           <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 animate-pulse luxury-shadow">
              <iconify-icon icon="lucide:alert-octagon" className="text-5xl"></iconify-icon>
           </div>
           
           <div className="space-y-2">
              <h2 className="font-cabinet text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight">Critical Settlement Delay</h2>
              <p className="text-rose-900/60 font-semibold uppercase tracking-widest text-xs">Stage 3: Syndicate Slashing Active (Day 42 Past Due)</p>
           </div>
        </div>

        {/* Escalation Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {[
              { label: 'Grace Period', days: '1-7', active: true, color: 'bg-emerald-500' },
              { label: 'Score Erosion', days: '8-30', active: true, color: 'bg-amber-500' },
              { label: 'Stake Slashing', days: '31-60', active: true, color: 'bg-rose-500' },
              { label: 'Blacklisted', days: '60+', active: false, color: 'bg-[#8C8C8C]' }
           ].map((step, i) => (
              <div key={i} className={`p-6 rounded-[2rem] border transition-all ${step.active ? 'bg-white border-[#E8E8E8] luxury-shadow' : 'bg-[#FAFAF8] border-[#F5F3F0] opacity-50'}`}>
                 <div className="flex justify-between items-center mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${step.color}`}></span>
                    <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Day {step.days}</span>
                 </div>
                 <p className="font-bold text-xs text-[#1A1A1A] uppercase tracking-widest">{step.label}</p>
              </div>
           ))}
        </div>

        {/* Impact Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[3rem] border border-[#E8E8E8] luxury-shadow space-y-6">
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2">Facility Exposure</p>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-4 border-b border-[#F5F3F0]">
                    <span className="text-xs font-medium text-[#8C8C8C]">Current Past Due</span>
                    <span className="font-bold text-[#1A1A1A]">$1,250.00</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-[#F5F3F0]">
                    <span className="text-xs font-medium text-[#8C8C8C]">Voucher Stake At Risk</span>
                    <span className="font-bold text-rose-500">25% Slashing</span>
                 </div>
                 <div className="flex justify-between items-center py-4">
                    <span className="text-xs font-medium text-[#8C8C8C]">Reputation Penalty</span>
                    <span className="font-bold text-rose-500">-50 QP</span>
                 </div>
              </div>
           </div>

           <div className="bg-[#1A1A1A] p-10 rounded-[3rem] text-white luxury-shadow flex flex-col justify-between">
              <div className="space-y-2">
                 <h4 className="font-cabinet text-xl font-black text-[#D4AF37] tracking-tight">Community Arbitration</h4>
                 <p className="text-white/60 text-xs font-medium leading-relaxed">
                    Request a peer-review panel if your default is due to genuine hardship.
                 </p>
              </div>
              <Link to="/dispute" className="mt-8 py-4 rounded-xl border border-white/20 text-center text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 Initiate Arbitration
              </Link>
           </div>
        </div>

        {/* Action Center center */}
        <div className="flex flex-col sm:flex-row gap-6">
           <Link to="/repayment" className="flex-[2] py-5 rounded-full gold-gradient text-white font-black uppercase text-[10px] tracking-widest text-center luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-3">
              Clear Arrears Now <iconify-icon icon="lucide:check-circle"></iconify-icon>
           </Link>
           <button className="flex-1 py-5 rounded-full border border-[#E8E8E8] bg-white text-[#8C8C8C] font-black uppercase text-[10px] tracking-widest text-center hover:border-[#D4AF37] transition-all">
              Recovery Path Setup
           </button>
        </div>
      </div>
    </AppShell>
  );
}
