import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Wallet } from 'lucide-react';

export default function WalletSelection() {
  const navigate = useNavigate();
  const connectWallet = useStore(state => state.connectWallet);
  const setRole = useStore(state => state.setRole);

  const handleConnect = (role) => {
    connectWallet('0x71C...976F');
    setRole(role);
    if (role === 'borrower') {
      navigate('/borrower-dashboard');
    } else {
      navigate('/lender-dashboard');
    }
  };

  return (
    <div className="flex flex-col h-full pt-12">
      <h1 className="text-3xl font-bold mb-2">Select Role</h1>
      <p className="text-gray-400 mb-8">Choose how you want to interact with TrustLend.</p>
      
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => handleConnect('borrower')}
          className="glass-card p-6 rounded-2xl flex items-center justify-between group active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Wallet className="text-blue-400 w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Borrower</h3>
              <p className="text-sm text-gray-400">Borrow funds using reputation</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => handleConnect('lender')}
          className="glass-card p-6 rounded-2xl flex items-center justify-between group active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Wallet className="text-green-400 w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">Lender</h3>
              <p className="text-sm text-gray-400">Provide liquidity and earn yield</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
