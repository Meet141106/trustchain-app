import { FileText, Layers, ArrowDownToLine, ArrowUpFromLine, PlusCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export default function DashboardBorrower() {
  const user = useStore(state => state.user);
  const activeLoan = useStore(state => state.activeLoan);

  return (
    <>
      <section className="mb-8">
        <p className="text-gray-400 text-sm mb-1">Available to Borrow</p>
        <div className="flex items-baseline gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">${user.borrowLimit.toLocaleString()}</h1>
          <span className="text-[#F5A623] text-sm font-semibold">USD</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-4 rounded-3xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="text-[#F5A623] w-4 h-4" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Loan</span>
          </div>
          <div className="mt-auto">
            {activeLoan ? (
              <>
                <p className="text-xl font-bold text-white">${activeLoan.amount}</p>
                <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">Status: {activeLoan.status}</p>
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-gray-500">None</p>
                <p className="text-[10px] text-gray-600 font-medium uppercase mt-1">Ready to borrow</p>
              </>
            )}
          </div>
        </div>

        <div className="glass-card p-4 rounded-3xl flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="text-[#F5A623] w-4 h-4" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Collateral</span>
          </div>
          <div className="mt-auto">
            <p className="text-xl font-bold text-white">{user.collateralRequired}</p>
            <p className="text-[10px] text-[#F5A623] font-medium uppercase mt-1">Tier: {user.tier}</p>
          </div>
        </div>
      </div>

      {activeLoan && (
        <section className="mb-8 glass-card p-5 rounded-3xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loan Health Status</span>
            <span className="text-xs font-bold text-[#10B981] uppercase">Healthy</span>
          </div>
          
          <div className="relative h-2 w-full health-bar rounded-full overflow-hidden">
            <div className="absolute top-0 bottom-0 left-[22%] w-1 bg-white shadow-lg"></div>
          </div>
          
          <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
            <span>Safe</span>
            <span>Warning</span>
            <span>Liquidation Risk</span>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/borrow" className="glass-card p-4 rounded-3xl flex flex-col items-center justify-center gap-3 transition-transform active:scale-95">
            <div className={`w-12 h-12 rounded-2xl ${activeLoan ? 'bg-gray-500/10' : 'bg-[#F5A623]/10'} flex items-center justify-center`}>
              <ArrowDownToLine className={`${activeLoan ? 'text-gray-400' : 'text-[#F5A623]'} w-6 h-6`} />
            </div>
            <span className={`text-sm font-bold ${activeLoan ? 'text-gray-400' : ''}`}>Borrow</span>
          </Link>
          
          <Link to={activeLoan ? '/repay' : '#'} className="glass-card p-4 rounded-3xl flex flex-col items-center justify-center gap-3 transition-transform active:scale-95">
            <div className={`w-12 h-12 rounded-2xl ${!activeLoan ? 'bg-gray-500/10' : 'bg-[#F5A623]/10'} flex items-center justify-center`}>
              <ArrowUpFromLine className={`${!activeLoan ? 'text-gray-400' : 'text-[#F5A623]'} w-6 h-6`} />
            </div>
            <span className={`text-sm font-bold ${!activeLoan ? 'text-gray-400' : ''}`}>Repay</span>
          </Link>

          <button className="glass-card p-4 rounded-3xl flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 rounded-2xl bg-gray-500/10 flex items-center justify-center">
              <PlusCircle className="text-gray-400 w-6 h-6" />
            </div>
            <span className="text-sm font-bold">Add Collateral</span>
          </button>

          <button className="glass-card p-4 rounded-3xl flex flex-col items-center justify-center gap-3 transition-transform active:scale-95">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center">
              <Users className="text-[#F5A623] w-6 h-6" />
            </div>
            <span className="text-sm font-bold">Invite Friend</span>
          </button>
        </div>
      </section>
    </>
  );
}
