import { Link } from 'react-router-dom';

export default function TierUpgrade() {
  return (
    <div className="screen flex-col justify-center text-center" style={{ background: 'linear-gradient(180deg, #1A150A 0%, var(--navy) 100%)' }}>
      
      {/* Decorative Gold Blobs */}
      <div className="blur-blob" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(245, 166, 35, 0.2) 0%, rgba(0,0,0,0) 70%)', width: 400, height: 400 }} />

      <main className="screen__body screen__body--no-tab flex flex-col justify-center items-center w-full relative z-10" style={{ padding: '0 32px' }}>
        
        <div className="animate-fade-in-up" style={{ marginBottom: 24, padding: '2px', background: 'linear-gradient(135deg, var(--gold), transparent)', borderRadius: '50%' }}>
           <div style={{
              width: 140, height: 140, borderRadius: '50%', background: 'var(--navy)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 60px rgba(245,166,35,0.4), inset 0 0 30px rgba(245,166,35,0.2)'
           }}>
             <iconify-icon icon="lucide:award" width="64" height="64" style={{ color: 'var(--gold)' }}></iconify-icon>
           </div>
        </div>

        <p className="text-micro animate-fade-in-up animate-delay-1" style={{ color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: 8 }}>TIER UNLOCKED</p>
        <h1 className="text-display animate-fade-in-up animate-delay-2" style={{ marginBottom: 16, color: 'var(--text-primary)' }}>
          Gold <span style={{ color: 'var(--gold)' }}>Borrower</span>
        </h1>
        <p className="animate-fade-in-up animate-delay-3" style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Congratulations! Your perfect repayment streak has upgraded your Soulbound NFT and unlocked premium platform benefits.
        </p>

        <div className="w-full flex flex-col gap-3 animate-fade-in-up animate-delay-4" style={{ textAlign: 'left' }}>
           {[
             { icon: 'lucide:arrow-up', text: 'Borrow limit increased to $5,000' },
             { icon: 'lucide:percent', text: 'Interest rates reduced by 1.5%' },
             { icon: 'lucide:shield-off', text: 'Zero collateral required' }
           ].map((benefit, i) => (
             <div key={i} className="flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 'var(--radius-lg)' }}>
               <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(245,166,35,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <iconify-icon icon={benefit.icon} style={{ color: 'var(--gold)' }} />
               </div>
               <span style={{ fontSize: 14, fontWeight: 600 }}>{benefit.text}</span>
             </div>
           ))}
        </div>

      </main>

      <footer className="screen__footer w-full relative z-10" style={{ paddingBottom: 48 }}>
         <Link to="/credit" className="btn-primary btn-primary--lg" style={{ boxShadow: 'var(--shadow-gold)' }}>
           Mint Upgraded NFT
         </Link>
      </footer>
    </div>
  );
}
