import { useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    icon: 'lucide:globe',
    title: 'Borderless Credit',
    desc: 'TrustLend provides decentralized, borderless credit backed entirely by your on-chain reputation rather than traditional bank scores.'
  },
  {
    icon: 'lucide:shield-check',
    title: 'No Bank Required',
    desc: 'Your wallet data, past repayment history, and community vouches determine your creditworthiness instantly without invasive KYC.'
  },
  {
    icon: 'lucide:zap',
    title: 'Instant Liquidity',
    desc: 'Request a loan and get funded in under 60 seconds directly to your wallet via our global network of lenders.'
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
    <div className="screen">
      <div className="blur-blob" style={{ top: -80, left: -80 }} />
      
      <main className="screen__body screen__body--no-tab flex flex-col justify-center items-center text-center" style={{ padding: '0 32px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
          
          {/* Animated Carousel Graphic */}
          <div className="animate-fade-in" style={{ marginBottom: 40, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(245,166,35,0.2), transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(245,166,35,0.2)'
             }}>
               <iconify-icon icon={slides[currentSlide].icon} width="48" height="48" style={{ color: 'var(--gold)' }}></iconify-icon>
             </div>
          </div>

          <h1 className="text-h1 animate-fade-in-up" key={`t-${currentSlide}`} style={{ marginBottom: 16 }}>
            {slides[currentSlide].title}
          </h1>
          <p className="animate-fade-in-up animate-delay-1" key={`d-${currentSlide}`} style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, height: 80 }}>
            {slides[currentSlide].desc}
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-2" style={{ marginTop: 32 }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: i === currentSlide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentSlide ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
        </div>
      </main>

      <footer className="screen__footer">
        <div className="flex gap-4">
          <Link to="/wallet" className="btn-secondary" style={{ flex: 1 }}>Skip</Link>
          {currentSlide < slides.length - 1 ? (
            <button onClick={handleNext} className="btn-primary" style={{ flex: 1 }}>Next</button>
          ) : (
             <Link to="/wallet" className="btn-primary" style={{ flex: 1 }}>Get Started</Link>
          )}
        </div>
      </footer>
    </div>
  );
}
