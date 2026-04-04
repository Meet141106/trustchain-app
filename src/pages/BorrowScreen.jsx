import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

export default function BorrowScreen() {
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const activeLoan = useStore(state => state.activeLoan);
  const [amount, setAmount] = useState(500);
  const [duration, setDuration] = useState(30); // days

  if (activeLoan) {
    navigate('/borrower-dashboard');
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">New Loan Request</h1>
      </div>

      <div className="glass-card p-6 rounded-3xl mb-6">
        <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Amount</p>
        <div className="text-5xl font-bold mb-4">${amount}</div>
        <input 
          type="range" 
          min="50" 
          max={user.borrowLimit} 
          step="50"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-[#F5A623]"
        />
        <div className="flex justify-between text-xs text-gray-500 font-bold mt-2">
          <span>$50</span>
          <span>${user.borrowLimit} Max</span>
        </div>
      </div>

      <div className="glass-card p-6 rounded-3xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Duration</p>
          <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#F5A623]">
            5.5% APR
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">{duration} Days</span>
          <SlidersHorizontal className="text-gray-400 w-5 h-5" />
        </div>
        
        <input 
          type="range" 
          min="7" 
          max="90" 
          step="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full accent-[#F5A623]"
        />
        <div className="flex justify-between text-xs text-gray-500 font-bold mt-2">
          <span>7d</span>
          <span>90d</span>
        </div>
      </div>
      
      <div className="glass-card p-4 rounded-2xl mb-8 flex items-center justify-between">
        <div>
           <p className="text-xs text-gray-400">Collateral Required</p>
           <p className="font-bold text-white max-w-[150px]">{user.collateralRequired}</p>
        </div>
        <div className="text-right">
           <p className="text-xs text-gray-400">Total Repayment</p>
           <p className="font-bold text-[#F5A623]">${(amount * 1.055).toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-auto pb-4">
        <button 
          onClick={() => navigate('/loan-confirm', { state: { amount, duration }})}
          className="w-full h-14 bg-[#F5A623] rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          <span className="text-[#0A0F1E] font-bold text-lg">Review Request</span>
        </button>
      </div>
    </div>
  );
}
