import { Link } from 'react-router-dom';

export default function RepaymentSuccess() {
  return (
    <div className="screen flex-col items-center justify-center text-center">
      <div className="blur-blob blur-blob--teal" style={{ top: '20%', left: '10%' }} />
      <div className="blur-blob" style={{ bottom: '10%', right: '-20%', background: 'radial-gradient(circle, rgba(245, 166, 35, 0.08) 0%, rgba(10, 15, 30, 0) 70%)' }} />
      
      <main className="screen__body screen__body--no-tab flex flex-col justify-center items-center text-center w-full" style={{ padding: '0 32px' }}>
        
        <div className="animate-fade-in" style={{ marginBottom: 32, position: 'relative' }}>
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(245,166,35,0.1)',
            border: '2px solid rgba(245,166,35,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(245,166,35,0.2)'
          }}>
            <iconify-icon icon="lucide:party-popper" width="56" height="56" style={{ color: 'var(--gold)' }}></iconify-icon>
          </div>
          <div style={{
            position: 'absolute', top: -10, right: -10,
            background: 'var(--emerald)', color: 'var(--navy)',
            fontWeight: 700, fontSize: 14, padding: '4px 12px',
            borderRadius: 16, boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
          }} className="animate-fade-in-up animate-delay-1">
            +15 Score
          </div>
        </div>

        <h1 className="text-display animate-fade-in-up" style={{ marginBottom: 16 }}>
          Loan <br />
          <span style={{ color: 'var(--gold)' }}>Repaid</span>
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Your payment of <strong>$254.50</strong> was successful. Your on-chain reputation has improved.
        </p>

        {/* Streak Indicator */}
        <div className="animate-fade-in-up animate-delay-2 flex items-center justify-center gap-3 w-full" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: 'var(--radius-lg)', padding: 20, border: '1px solid var(--border-emphasis)'
        }}>
           <div style={{
             width: 48, height: 48, borderRadius: '50%',
             background: 'linear-gradient(135deg, #F97316, #DC2626)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             boxShadow: '0 4px 12px rgba(234,88,12,0.2)'
           }}>
             <iconify-icon icon="lucide:flame" width="24" height="24" style={{ color: 'white' }}></iconify-icon>
           </div>
           <div className="text-left">
             <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>4 On-Time Streak</h4>
             <p style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>You're 1 payment away from Gold Tier!</p>
           </div>
        </div>
      </main>

      <footer className="screen__footer w-full flex flex-col gap-4">
         <Link to="/credit" className="btn-primary animate-fade-in-up animate-delay-3" style={{ boxShadow: 'var(--shadow-gold)' }}>
           View New Score
         </Link>
         <Link to="/dashboard" className="btn-ghost animate-fade-in-up animate-delay-4">
           Return Home
         </Link>
      </footer>
    </div>
  );
}
