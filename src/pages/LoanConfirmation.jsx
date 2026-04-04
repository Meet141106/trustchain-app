import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, ShieldCheck, Info } from 'lucide-react';

export default function LoanConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const borrowFunds = useStore(state => state.borrowFunds);
  
  const { amount = 0, duration = 0 } = location.state || {};

  const handleConfirm = () => {
    borrowFunds(amount, duration);
    navigate('/borrower-dashboard');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Review Request</h1>
      </div>

      <div className="glass-card p-6 rounded-3xl mb-4 text-center">
        <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">You are borrowing</p>
        <h1 className="text-5xl font-bold text-white mb-2">${amount}</h1>
        <p className="text-[#F5A623] font-bold text-sm">~ {duration} Days Duration</p>
      </div>

      <div className="glass-card p-4 rounded-3xl mb-8 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-gray-400">Interest (5.5%)</span>
          <span className="font-bold text-white">${(amount * 0.055).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-gray-400">Total Repayment</span>
          <span className="font-bold text-white">${(amount * 1.055).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Network Fee</span>
          <span className="font-bold text-white">0.002 ETH</span>
        </div>
      </div>

      <div className="flex bg-blue-500/10 p-4 rounded-2xl gap-3 mb-8 border border-blue-500/20">
        <Info className="text-blue-400 w-6 h-6 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200">
          This loan is based on your TrustLend reputation. Ensure timely repayment to maintain your score and avoid liquidation.
        </p>
      </div>

      <div className="mt-auto pb-4">
        <button 
          onClick={handleConfirm}
          className="w-full h-14 bg-[#F5A623] rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <ShieldCheck className="w-5 h-5 text-[#0A0F1E]" />
          <span className="text-[#0A0F1E] font-bold text-lg">Confirm & Sign</span>
        </button>
      </div>
    </div>
  );
}
