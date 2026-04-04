import { useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    icon: 'lucide:globe',
    title: 'Universal Credit',
    subtitle: 'Decentralized Sovereignty',
    desc: 'Access borderless credit facilities backed by your on-chain merit and social graph. No predatory banks, no geographic limits.'
  },
  {
    icon: 'lucide:shield-check',
    title: 'Sovereign ID',
    subtitle: 'Reputation as Capital',
    desc: 'Your wallet data, repayment fidelity, and community endorsements are synthesized by AI into a Soulbound Reputation NFT.'
  },
  {
    icon: 'lucide:zap',
    title: 'Instant Fluidity',
    subtitle: 'Real-time Execution',
    desc: 'Deploy liquidity or request credit in seconds. Our global archways connect verified lenders to unbanked visionaries instantly.'
  }
];

export default function OnboardingWalkthrough() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-satoshi flex flex-col selection:bg-[#D4AF37] selection:text-white relative overflow-hidden">
      {/* Decorative luxury elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#F5F3F0] to-transparent pointer-events-none"></div>
      <div className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full gold-gradient opacity-5 blur-[120px] pointer-events-none"></div>
      
      <main className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 z-10 text-center max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="flex gap-3 mb-20">
          {slides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${i === currentSlide ? 'w-16 bg-[#D4AF37] luxury-shadow' : 'w-4 bg-[#E8E8E8]'}`} />
          ))}
        </div>

        <div className="animate-fade-in mb-12 group" key={`icon-${currentSlide}`}>
           <div className="w-24 h-24 rounded-3xl bg-white border border-[#E8E8E8] flex items-center justify-center text-[#D4AF37] luxury-shadow group-hover:rotate-12 transition-transform duration-500 relative">
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[20px] rounded-full animate-pulse"></div>
              <iconify-icon icon={slides[currentSlide].icon} className="text-5xl relative z-10"></iconify-icon>
           </div>
        </div>

        <div className="space-y-6" key={`content-${currentSlide}`}>
           <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 luxury-shadow-sm mb-4">
              <span className="text-[9px] uppercase tracking-[0.4em] font-black text-[#D4AF37]">{slides[currentSlide].subtitle}</span>
           </div>
           <h1 className="font-cabinet text-6xl md:text-8xl font-black tracking-tighter leading-none animate-fade-in-up">
              {slides[currentSlide].title}
           </h1>
           <p className="text-xl md:text-2xl text-[#8C8C8C] max-w-2xl mx-auto leading-relaxed font-medium animate-fade-in-up animate-delay-1">
              {slides[currentSlide].desc}
           </p>
        </div>

        <div className="mt-24 w-full flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animate-delay-2">
          {currentSlide < slides.length - 1 ? (
             <>
               <button onClick={handleNext} className="w-full sm:w-auto px-16 py-6 rounded-full bg-[#1A1A1A] text-white font-black text-[12px] uppercase tracking-[0.3em] luxury-shadow hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-4 group">
                 Next Chapter <iconify-icon icon="lucide:arrow-right" className="text-lg group-hover:translate-x-2 transition-transform"></iconify-icon>
               </button>
               <Link to="/wallet" className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] hover:text-[#1A1A1A] transition-colors">Skip Overview</Link>
             </>
          ) : (
            <Link to="/wallet" className="w-full sm:w-auto px-16 py-6 rounded-full bg-[#1A1A1A] text-white font-black text-[12px] uppercase tracking-[0.3em] luxury-shadow hover:bg-[#D4AF37] hover:scale-105 transition-all flex items-center justify-center gap-4 group">
               Enter The Protocol <iconify-icon icon="lucide:arrow-right" className="text-lg group-hover:translate-x-2 transition-transform"></iconify-icon>
            </Link>
          )}
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-12 flex justify-between items-center z-10 pointer-events-none">
         <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Audit Phase {currentSlide + 1}/3</p>
         <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">AetherFi TrustLend v1.0</p>
      </footer>
    </div>
  );
}
