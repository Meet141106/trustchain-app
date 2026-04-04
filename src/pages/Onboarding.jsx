import { Wallet, Ban, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Onboarding() {
  return (
    <div className="flex-1 flex flex-col justify-center pb-8 h-full">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10 relative">
          <div className="w-24 h-24 rounded-3xl border border-[#F5A623]/20 rotate-12 absolute -top-4 -left-4"></div>
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F5A623] to-[#D48A1B] flex items-center justify-center shadow-2xl shadow-[#F5A623]/30 relative z-10">
            <Wallet className="w-10 h-10 text-[#0A0F1E]" />
          </div>
        </div>

        <h1 className="text-[42px] leading-[1.1] font-bold tracking-tight mb-4">
          Your wallet <br/>
          <span className="text-[#F5A623] gold-glow">is your bank</span>
        </h1>
        
        <p className="text-gray-400 text-lg leading-relaxed max-w-[280px]">
          Access borderless credit instantly using your digital reputation.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 py-8 border-t border-white/5">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
            <Ban className="text-[#F5A623] w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold leading-tight">No bank required</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
            <ShieldCheck className="text-[#F5A623] w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold leading-tight">Data stays yours</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
            <Zap className="text-[#F5A623] w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold leading-tight">Loans in 60s</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Link to="/wallet-selection" className="w-full h-14 bg-[#F5A623] rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all group">
          <span className="text-[#0A0F1E] font-bold text-lg">Connect Wallet</span>
        </Link>
        <p className="text-center text-gray-500 text-sm">
          New to DeFi? <a href="#" className="text-white border-b border-white/20 pb-0.5">Learn how it works</a>
        </p>
      </div>
    </div>
  );
}
