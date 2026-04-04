import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function YieldWithdrawal() {
  return (
    <AppShell backTo="/lender" backLabel="Dashboard" showNav={false}>
       <div className="text-center" style={{ padding: '32px 0 16px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
            border: '1px solid rgba(16,185,129,0.3)'
          }}>
            <iconify-icon icon="lucide:coins" width="32" height="32" style={{ color: 'var(--emerald)' }} />
          </div>
          <p className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Available Yield to Withdraw</p>
          <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--emerald)' }}>
             $142.50
          </div>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 14, marginTop: 4 }}>USDC</p>
       </div>

       <div style={{
          background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
          padding: 24, border: '1px solid var(--border-subtle)', marginBottom: 32, marginTop: 24
       }}>
          <h3 className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Withdrawal Details</h3>
          <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Destination Wallet</span>
             <span className="font-mono text-teal" style={{ fontSize: 12 }}>0x71...3d8f</span>
          </div>
          <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Network Network</span>
             <span style={{ fontWeight: 600 }}>Polygon PoS</span>
          </div>
          <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Estimated Gas</span>
             <span style={{ fontWeight: 600 }}>~$0.02</span>
          </div>
          <div className="divider" style={{ margin: '16px 0' }} />
          <div className="flex justify-between items-center">
             <span style={{ fontWeight: 700 }}>Total Receiving</span>
             <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--emerald)' }}>$142.48</span>
          </div>
       </div>

       <Link to="/lender" className="btn-primary btn-primary--lg w-full" style={{ background: 'var(--emerald)', color: 'var(--navy)' }}>
          Confirm Withdrawal
       </Link>
    </AppShell>
  );
}
