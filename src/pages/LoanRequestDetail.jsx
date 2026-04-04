import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function LoanRequestDetail() {
  return (
    <AppShell pageTitle="Facility Audit" pageSubtitle="Detailed risk & reputation synthesis for capital deployment" showNav={false}>
      <div className="p-4 md:p-8 lg:p-12 max-w-[1000px] mx-auto space-y-12">
        
        {/* Loan Identity Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#F5F3F0] pb-10">
           <div>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-2">Request ID: #TR-9421-AUDIT</p>
              <h1 className="font-cabinet text-5xl font-black text-[#1A1A1A] tracking-tight">Verified Artisan Facility</h1>
           </div>
           <div className="flex items-center gap-3 bg-emerald-50 px-6 py-2.5 rounded-full border border-emerald-100 luxury-shadow-sm">
              <iconify-icon icon="lucide:shield-check" className="text-emerald-500 text-lg"></iconify-icon>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Minimial Behavioral Risk</span>
           </div>
        </div>

        {/* Financial Logic */}
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.02] blur-[100px] -z-10"></div>
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em]">Funding Commitment Needed</p>
                 <h2 className="font-cabinet text-7xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-none">$1,200.00</h2>
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Sovereign USDC Settlement</p>
              </div>

              <div className="bg-[#1A1A1A] p-10 rounded-[3rem] text-white min-w-[220px] luxury-shadow transform hover:scale-105 transition-transform duration-500">
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-4">Allocated APY</p>
                 <span className="text-5xl font-black font-cabinet tracking-tighter leading-none">14.8%</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-[#F5F3F0]">
              {[
                { label: 'Term Length', val: '180 Cycles', icon: 'lucide:calendar' },
                { label: 'Collateral Mechanism', val: 'Soulbound NFT', icon: 'lucide:shield-check' },
                { label: 'Syndicate Vouching', val: '45 Endorsements', icon: 'lucide:users' }
              ].map((item, i) => (
                 <div key={i} className="space-y-2 group/item">
                    <div className="flex items-center gap-2 text-[#8C8C8C] group-hover/item:text-[#1A1A1A] transition-colors">
                       <iconify-icon icon={item.icon} className="text-lg"></iconify-icon>
                       <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                    <p className="font-black text-xl text-[#1A1A1A] tracking-tight">{item.val}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Borrower Reputation Audit */}
        <div className="space-y-8">
           <h3 className="font-cabinet text-3xl font-black text-[#1A1A1A] tracking-tight ml-4">Reputation Synthesis</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow group hover:border-[#D4AF37]/40 transition-all">
                 <div className="flex items-center gap-8 mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-[#1A1A1A] flex items-center justify-center text-white shadow-xl luxury-shadow group-hover:rotate-12 transition-transform">
                       <span className="text-3xl font-black font-cabinet">812</span>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Reputation Quotient</p>
                       <h4 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Noir Elite Phase II</h4>
                    </div>
                 </div>
                 <p className="text-sm font-medium text-[#8C8C8C] leading-relaxed">
                    This borrower belongs to the top <span className="text-[#1A1A1A] font-bold">2.4%</span> of the ecosystem. Historical fidelity indicates zero defaults across 14 lending cycles.
                 </p>
              </div>

              <div className="bg-[#1A1A1A] p-10 rounded-[3.5rem] text-white luxury-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.1] blur-[60px] group-hover:scale-150 duration-700"></div>
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-8 group-hover:rotate-12 transition-transform">
                    <iconify-icon icon="lucide:zap" className="text-3xl animate-pulse"></iconify-icon>
                 </div>
                 <h4 className="font-cabinet text-2xl font-black tracking-tight mb-4">AI Sentiment Audit</h4>
                 <p className="text-sm text-white/50 leading-relaxed font-medium">
                    Behavioral patterns from <span className="text-white font-black underline decoration-[#D4AF37]">Noir Opportunity Pool</span> suggest high reinvestment probability and social capital growth.
                 </p>
              </div>
           </div>
        </div>

        {/* Global Action Vector */}
        <div className="flex flex-col sm:flex-row gap-6 pt-12">
           <Link to="/marketplace" className="flex-1 py-6 rounded-full border border-[#E8E8E8] text-[#8C8C8C] font-black uppercase text-[12px] tracking-[0.3em] text-center hover:bg-[#FAFAF8] transition-all">
              Cancel Audit
           </Link>
           <Link to="/lender" className="flex-[2] py-6 rounded-full gold-gradient text-white font-black uppercase text-[12px] tracking-[0.3em] text-center luxury-shadow hover:scale-105 transition-all flex items-center justify-center gap-4 group active:scale-95 shadow-2xl">
              Initialize Funding Drawdown <iconify-icon icon="lucide:plus-circle" className="text-lg group-hover:rotate-12 transition-transform ml-2"></iconify-icon>
           </Link>
        </div>
      </div>
    </AppShell>
  );
}
