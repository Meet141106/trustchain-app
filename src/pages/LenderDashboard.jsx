import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const activeYields = [
  {
    id: 1, score: 784, borrower: 'Peer Node #2941', tier: 'Noir Elite',
    status: 'Healthy', statusColor: '#10B981',
    amount: '$1,250', rate: '14.2%', endsIn: '12 Days'
  },
  {
    id: 2, score: 812, borrower: 'Community Syndicate #10', tier: 'High Trust',
    status: 'Alert', statusColor: '#EF4444',
    amount: '$2,500', rate: '18.8%', endsIn: '4 Days'
  },
];

export default function LenderDashboard() {
  return (
    <AppShell pageTitle="Capital Allocator" pageSubtitle="Maximize social impact & yield via decentralized lending">
      <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto space-y-12">
        
        {/* Aggregated Allocation Top Section */}
        <div className="bg-white p-12 md:p-20 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] transition-transform duration-700 group-hover:scale-125"></div>
           
           <div className="flex flex-col lg:flex-row justify-between items-end gap-12 relative z-10">
              <div className="space-y-6 flex-1 text-center lg:text-left">
                 <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-4">Total Liquidity Allocated</p>
                 <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 justify-center lg:justify-start">
                    <h1 className="text-7xl md:text-9xl font-black font-cabinet tracking-tighter text-[#1A1A1A] leading-none">$12,450</h1>
                    <div className="flex items-center gap-2 pb-2">
                       <iconify-icon icon="lucide:trending-up" className="text-emerald-500 text-2xl"></iconify-icon>
                       <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">+12.4% Est. Yield</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                 <div className="bg-[#FAFAF8] p-8 rounded-[2.5rem] border border-[#E8E8E8] text-center min-w-[160px] group-hover:scale-105 duration-300">
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2">Realized Profit</p>
                    <p className="text-3xl font-black text-[#D4AF37] tracking-tighter">+$412.00</p>
                 </div>
                 <div className="bg-[#FAFAF8] p-8 rounded-[2.5rem] border border-[#E8E8E8] text-center min-w-[160px] group-hover:scale-105 duration-300">
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-2">Social Impact</p>
                    <p className="text-3xl font-black text-[#1A1A1A] tracking-tighter">18 <span className="text-xs text-[#8C8C8C]">Peers</span></p>
                 </div>
              </div>
           </div>
        </div>

        {/* Portfolio Command Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-[#F5F3F0] pb-8">
             <h2 className="font-cabinet text-4xl font-black tracking-tight text-[#1A1A1A]">Allocation Audit</h2>
             <div className="bg-[#FAFAF8] p-1.5 rounded-full border border-[#E8E8E8] flex gap-2">
                <button className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">Active Nodes</button>
                <button className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] hover:text-[#1A1A1A] transition-colors">Pending Cycles</button>
             </div>
          </div>

          <div className="space-y-6">
            {activeYields.map((loan) => (
              <div key={loan.id} className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow flex flex-col lg:flex-row lg:items-center gap-12 group relative overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/50">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 blur-[100px] transition-transform duration-700 group-hover:scale-110"></div>
                
                <div className="flex items-center gap-8 lg:w-1/4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1A1A1A] to-[#444] p-0.5 shadow-lg group-hover:rotate-12 transition-transform">
                    <div className="w-full h-full rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-white/10">
                       <span className="text-white font-black text-xl leading-none">{loan.score}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-[#1A1A1A] mb-1 tracking-tight leading-none group-hover:text-[#D4AF37] transition-colors">{loan.borrower}</h4>
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">{loan.tier}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 flex-1 gap-10 items-center relative z-10 border-l border-r border-[#F5F3F0] px-10">
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Liquidity Cycle</p>
                    <p className="text-2xl font-black text-[#1A1A1A] tracking-tighter">{loan.amount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Applied Yield</p>
                    <p className="text-2xl font-black text-[#D4AF37] tracking-tighter">{loan.rate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Cycle Horizon</p>
                    <p className="text-2xl font-black text-[#1A1A1A] tracking-tighter">{loan.endsIn}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Logic Audit</p>
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${loan.status === 'Alert' ? 'animate-pulse bg-[#EF4444]' : 'bg-[#10B981]'}`}></span>
                       <span className="font-black text-[11px] uppercase tracking-widest" style={{ color: loan.statusColor }}>{loan.status}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-auto relative z-10">
                   <button className="px-10 py-5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all luxury-shadow group-hover:scale-105 active:scale-95">
                      Audit Node
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Action Terminal */}
        <div className="bg-[#1A1A1A] p-12 md:p-16 rounded-[4rem] text-white luxury-shadow relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
            <div className="absolute top-0 left-0 w-[50rem] h-[50rem] bg-[#D4AF37]/10 blur-[150px] transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div className="space-y-4 text-center md:text-left relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Market Status: Fluid</div>
               <h3 className="font-cabinet text-4xl font-black tracking-tight leading-none">Deploy New Liquidity</h3>
               <p className="text-white/60 text-lg font-medium leading-relaxed max-w-[500px]">
                  Audit verified unbanked individuals globally and participate in high-impact micro-lending cycles.
               </p>
            </div>

            <Link to="/marketplace" className="px-12 py-6 rounded-full gold-gradient text-white font-black text-xl hover:scale-105 transition-all luxury-shadow flex items-center gap-4 relative z-10 group/btn">
               Open Terminal <iconify-icon icon="lucide:arrow-right" className="transition-transform group-hover/btn:translate-x-2 text-2xl"></iconify-icon>
            </Link>
        </div>
      </div>
    </AppShell>
  );
}
