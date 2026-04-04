import { Briefcase, TrendingUp, ArrowRightLeft } from 'lucide-react';
import { useStore } from '../store';

export default function DashboardLender() {
  const user = useStore(state => state.user);
  const portfolio = useStore(state => state.lenderPortfolio);

  const totalInvested = portfolio.reduce((acc, inv) => acc + inv.amountFunded, 0);
  const estimatedReturn = portfolio.reduce((acc, inv) => acc + (inv.expectedReturn - inv.amountFunded), 0);

  return (
    <>
      <section className="mb-8">
        <p className="text-gray-400 text-sm mb-1">Portfolio Balance</p>
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">${(user.balanceUsd + totalInvested).toLocaleString()}</h1>
          <span className="text-[#10B981] text-sm font-semibold">+${estimatedReturn.toFixed(2)} expected</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-4 rounded-3xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="text-[#10B981] w-4 h-4" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Loans</span>
          </div>
          <div className="mt-auto">
            <p className="text-xl font-bold text-white">{portfolio.length}</p>
            <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">Funding Provided</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-3xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-[#10B981] w-4 h-4" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. APY</span>
          </div>
          <div className="mt-auto">
            <p className="text-xl font-bold text-white">6.8%</p>
            <p className="text-[10px] text-[#10B981] font-medium uppercase mt-1">Market Average</p>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Investments</h2>
        {portfolio.length === 0 ? (
          <div className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <ArrowRightLeft className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-300 font-bold mb-1">No Active Investments</p>
            <p className="text-xs text-gray-500">Go to the marketplace to start earning yield on your capital.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {portfolio.map((inv, idx) => (
              <div key={idx} className="glass-card p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold">Loan #{inv.loanId}</p>
                  <p className="text-xs text-gray-400">Status: {inv.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${inv.amountFunded}</p>
                  <p className="text-xs text-[#10B981]">Return: ${inv.expectedReturn.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
