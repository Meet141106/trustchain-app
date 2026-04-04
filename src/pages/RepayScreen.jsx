import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, ArrowUpFromLine } from 'lucide-react';

export default function RepayScreen() {
  const navigate = useNavigate();
  const activeLoan = useStore(state => state.activeLoan);
  const repayLoan = useStore(state => state.repayLoan);

  if (!activeLoan) {
    navigate('/borrower-dashboard');
    return null;
  }

  const handleRepay = () => {
    repayLoan();
    navigate('/borrower-dashboard');
  };

  const totalDue = (activeLoan.amount * 1.055).toFixed(2);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Repay Loan</h1>
      </div>

      <div className="glass-card p-6 rounded-3xl mb-6 text-center shadow-lg shadow-[#10B981]/10 border-[#10B981]/20">
        <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest font-bold">Total Due</p>
        <h1 className="text-4xl font-bold text-white mb-2">${totalDue}</h1>
        <p className="text-[#10B981] font-bold text-sm uppercase">Currently Healthy</p>
      </div>

      <div className="glass-card p-4 rounded-3xl mb-8 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-gray-400 text-sm">Principal</span>
          <span className="font-bold text-white">${activeLoan.amount}</span>
        </div>
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <span className="text-gray-400 text-sm">Interest (5.5%)</span>
          <span className="font-bold text-white">${(activeLoan.amount * 0.055).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Due Date</span>
          <span className="font-bold text-white">{new Date(activeLoan.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm text-center mb-6">
        Repaying now will increase your TrustLend reputation score and unlock higher borrow limits.
      </p>

      <div className="mt-auto pb-4">
        <button 
          onClick={handleRepay}
          className="w-full h-14 bg-[#10B981] rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#10B981]/20"
        >
          <ArrowUpFromLine className="w-5 h-5 text-white" />
          <span className="text-white font-bold text-lg">Repay Full Amount</span>
        </button>
      </div>
    </div>
  );
}
