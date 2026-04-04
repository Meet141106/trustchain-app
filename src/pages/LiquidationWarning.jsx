import { Link } from 'react-router-dom';

export default function LiquidationWarning() {
  return (
    <div className="screen flex-col" style={{ background: '#1c0c0c' }}>
      <div className="blur-blob" style={{ top: -100, left: -100, background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(28, 12, 12, 0) 70%)' }} />
      <div className="blur-blob" style={{ bottom: -100, right: -100, background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(28, 12, 12, 0) 70%)' }} />

      <div className="screen__header flex justify-between items-center" style={{ paddingTop: 40 }}>
         <Link to="/dashboard" className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Close</Link>
         <iconify-icon icon="lucide:shield-alert" width="24" height="24" style={{ color: 'var(--red)' }} />
      </div>

      <main className="screen__body screen__body--no-tab flex flex-col justify-center w-full" style={{ padding: '0 32px' }}>
        <div className="text-center" style={{ marginBottom: 40 }}>
           <div className="animate-pulse" style={{
             width: 120, height: 120, margin: '0 auto 24px', borderRadius: '50%',
             border: '4px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
             boxShadow: '0 0 60px rgba(239, 68, 68, 0.2)'
           }}>
             <iconify-icon icon="lucide:alert-triangle" width="60" height="60" style={{ color: 'var(--red)' }} />
           </div>
           
           <h1 className="text-h1" style={{ color: 'var(--red)', marginBottom: 12 }}>Liquidation Warning</h1>
           <p style={{ color: '#FCA5A5', fontSize: 16, lineHeight: 1.6 }}>
             Your health factor has dropped below the safe threshold (1.20). Your loan is at risk of immediate liquidation.
           </p>
        </div>

        <div style={{
           background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-lg)',
           padding: 24, border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: 32
        }}>
           <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
              <span style={{ color: '#FCA5A5', fontSize: 14 }}>Current Health Factor</span>
              <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: 20 }}>1.08</span>
           </div>
           <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
              <span style={{ color: '#FCA5A5', fontSize: 14 }}>Liquidation Threshold</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 16 }}>1.00</span>
           </div>
           <div className="divider" style={{ background: 'rgba(239, 68, 68, 0.2)', marginBottom: 16 }} />
           <div className="flex justify-between items-center">
              <span style={{ color: '#FCA5A5', fontSize: 14 }}>Required to stabilize</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 16 }}>$120.00</span>
           </div>
        </div>
      </main>

      <footer className="screen__footer w-full flex flex-col gap-4">
         <button className="btn-primary" style={{ background: 'var(--red)', color: 'white', border: 'none', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)' }}>
           Top Up Collateral
         </button>
         <Link to="/repay" className="btn-ghost" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#FCA5A5' }}>
           Repay Loan
         </Link>
      </footer>
    </div>
  );
}
