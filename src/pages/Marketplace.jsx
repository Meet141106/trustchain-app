import { Search, ShieldCheck, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { useState } from 'react';

const MOCK_LOANS = [
  { id: '1', borrower: '0x32A...18C', amount: 500, duration: 30, apy: 6.5, health: 150, score: 720 },
  { id: '2', borrower: '0x99B...44D', amount: 1200, duration: 60, apy: 8.0, health: 125, score: 610 },
  { id: '3', borrower: '0x10C...99F', amount: 200, duration: 15, apy: 5.0, health: 200, score: 810 },
];

export default function Marketplace() {
  const fundMarketplaceLoan = useStore(state => state.fundMarketplaceLoan);
  const [funded, setFunded] = useState({});

  const handleFund = (loanId, amount) => {
    fundMarketplaceLoan(loanId, amount);
    setFunded(prev => ({ ...prev, [loanId]: true }));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <Search className="w-5 h-5" />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
        <button className="whitespace-nowrap px-4 py-2 bg-[#F5A623] text-[#0A0F1E] font-bold rounded-full text-sm">All Loans</button>
        <button className="whitespace-nowrap px-4 py-2 glass-card font-bold rounded-full text-sm">High Yield</button>
        <button className="whitespace-nowrap px-4 py-2 glass-card font-bold rounded-full text-sm">Low Risk</button>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_LOANS.map((loan) => (
          <div key={loan.id} className="glass-card p-5 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  <span className="font-bold text-sm">{loan.borrower}</span>
                </div>
                <div className="flex items-center gap-1 mt-2 bg-white/5 rounded-full px-2 py-0.5 w-fit">
                  <ShieldCheck className="w-3 h-3 text-[#f5a623]" />
                  <span className="text-[10px] font-bold text-[#f5a623]">Score: {loan.score}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Request</p>
                <p className="text-lg font-bold">${loan.amount}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 bg-black/20 rounded-2xl p-3">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Duration</p>
                <p className="font-bold text-sm">{loan.duration}d</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Yield</p>
                <p className="font-bold text-sm text-[#10B981]">{loan.apy}% APY</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Health</p>
                <p className={`font-bold text-sm ${loan.health >= 150 ? 'text-[#10B981]' : 'text-[#F5A623]'}`}>{loan.health}%</p>
              </div>
            </div>

            <button 
              onClick={() => handleFund(loan.id, loan.amount)}
              disabled={funded[loan.id]}
              className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 font-bold transition-all ${funded[loan.id] ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 active:scale-95 text-white'}`}
            >
              {funded[loan.id] ? 'Funded' : 'Fund Loan'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
