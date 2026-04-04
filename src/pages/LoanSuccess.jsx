import { Link } from 'react-router-dom';

export default function LoanSuccess() {
  return (
    <div className="screen flex-col items-center justify-center text-center">
      <div className="blur-blob blur-blob--teal" style={{ top: '20%', left: '10%' }} />
      <div className="blur-blob" style={{ bottom: '10%', right: '-20%' }} />
      
      <main className="screen__body screen__body--no-tab flex flex-col justify-center items-center text-center w-full" style={{ padding: '0 32px' }}>
        
        <div className="animate-fade-in" style={{ marginBottom: 32, position: 'relative' }}>
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(16,185,129,0.1)',
            border: '2px solid rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(16,185,129,0.2)'
          }}>
            <iconify-icon icon="lucide:check-circle-2" width="64" height="64" style={{ color: 'var(--emerald)' }}></iconify-icon>
          </div>
        </div>

        <h1 className="text-display animate-fade-in-up" style={{ marginBottom: 16 }}>
          Funds <br />
          <span style={{ color: 'var(--emerald)' }}>Received</span>
        </h1>
        <p className="animate-fade-in-up animate-delay-1" style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Your loan of <strong>$2,500</strong> has been successfully deposited into your wallet.
        </p>

        <div className="animate-fade-in-up animate-delay-2 w-full" style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)',
          padding: 16, border: '1px solid var(--border-subtle)', marginBottom: 32
        }}>
           <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>Transaction Hash</p>
           <div className="flex items-center justify-between gap-2">
             <span className="font-mono text-teal" style={{ fontSize: 14 }}>0x8fB2...98cE</span>
             <div className="flex gap-2">
               <button aria-label="Copy hash"><iconify-icon icon="lucide:copy" style={{ color: 'var(--text-secondary)' }} width="16" height="16" /></button>
               <button aria-label="View on explorer"><iconify-icon icon="lucide:external-link" style={{ color: 'var(--text-secondary)' }} width="16" height="16" /></button>
             </div>
           </div>
        </div>

      </main>

      <footer className="screen__footer w-full flex flex-col gap-4">
         <Link to="/active-loan" className="btn-primary animate-fade-in-up animate-delay-3" style={{ background: 'var(--emerald)', color: 'var(--navy)' }}>
           View Active Loan
         </Link>
         <Link to="/dashboard" className="btn-ghost animate-fade-in-up animate-delay-4">
           Return Home
         </Link>
      </footer>
    </div>
  );
}
