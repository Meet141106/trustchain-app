import { ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';

export default function Profile() {
  const user = useStore(state => state.user);

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white/10 p-1">
          <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.walletAddress || 'default'}`} alt="Avatar" className="w-full h-full rounded-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : '0x71C...976F'}</h1>
          <div className="flex items-center gap-1 mt-1">
            <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs font-bold text-gray-300 capitalize">{user.role}</span>
          </div>
        </div>
      </div>

      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/20 to-transparent blur-xl -z-10 rounded-full"></div>
        <div className="glass-card p-6 rounded-3xl border-[#F5A623]/30 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-[#F5A623]/10">
            <ShieldCheck className="w-32 h-32" />
          </div>
          
          <p className="text-sm text-[#F5A623] uppercase tracking-widest font-bold mb-1">Reputation Score</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-white gold-glow">{user.reputationScore}</span>
            <span className="text-gray-400 text-sm">/ 850</span>
          </div>
          
          <div className="bg-[#F5A623]/20 text-[#F5A623] px-3 py-1.5 rounded-full inline-flex items-center gap-2 font-bold text-sm">
            <Award className="w-4 h-4" />
            {user.tier} Tier
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-4 rounded-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <CheckCircle2 className="text-blue-400 w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{user.loansRepaid}</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Loans Repaid</p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-3xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Zap className="text-orange-400 w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{user.streak}</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Current Streak</p>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Details</h2>
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-white/5">
            <span className="text-gray-300 font-medium">Borrowing Limit</span>
            <span className="font-bold">${user.borrowLimit}</span>
          </div>
          <div className="flex justify-between items-center p-4 border-b border-white/5">
            <span className="text-gray-300 font-medium">Collateral Needed</span>
            <span className="font-bold text-[#F5A623]">{user.collateralRequired}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-300 font-medium">Platform Fees</span>
            <span className="font-bold">0.5%</span>
          </div>
        </div>
      </section>
      
      <button className="w-full py-4 text-red-400 font-bold glass-card rounded-2xl active:scale-95 transition-transform">
        Disconnect Wallet
      </button>
    </>
  );
}
