import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function LoanConfirmation() {
  return (
    <AppShell backTo="/borrow" backLabel="Edit Loan" showNav={false}>
      <h1 className="text-h2" style={{ marginBottom: 24 }}>Confirm Loan</h1>

      <div style={{
        background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
        padding: 24, border: '1px solid var(--border-subtle)', marginBottom: 24,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--gold), var(--gold-dark))' }} />
        
        <p className="text-micro text-center" style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Requesting</p>
        <div className="text-center" style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--gold)' }}>$2,500</span>
          <span style={{ fontSize: 16, color: 'var(--text-tertiary)', marginLeft: 4 }}>USD</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Duration</span>
             <span style={{ fontWeight: 600 }}>12 Weeks (3 Months)</span>
          </div>
          <div className="flex justify-between items-center">
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Interest Rate (APY)</span>
             <span style={{ fontWeight: 600, color: 'var(--emerald)' }}>4.2%</span>
          </div>
          <div className="flex justify-between items-center">
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Required Collateral</span>
             <span style={{ fontWeight: 600 }}>Reputation Only <iconify-icon icon="lucide:shield-check" style={{ color: 'var(--gold)', verticalAlign: 'middle', marginLeft: 4 }} /></span>
          </div>
          <div className="divider" />
          <div className="flex justify-between items-center">
             <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Total Repayment</span>
             <span style={{ fontSize: 20, fontWeight: 700 }}>$2,605.00</span>
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 32
      }}>
        <div className="flex gap-3">
          <iconify-icon icon="lucide:alert-triangle" width="20" height="20" style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
          <div>
             <p style={{ color: 'var(--red)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Risk Acknowledgment</p>
             <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>
               Failure to repay this loan by the due date will severely impact your TrustScore and may result in partial liquidation of your profile rewards.
             </p>
          </div>
        </div>
      </div>

      <Link to="/loan-success" className="btn-primary btn-primary--lg" style={{ boxShadow: 'var(--shadow-gold)' }}>
        <iconify-icon icon="lucide:pen-tool" width="20" height="20"></iconify-icon>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Sign Transaction</span>
      </Link>
    </AppShell>
  );
}
