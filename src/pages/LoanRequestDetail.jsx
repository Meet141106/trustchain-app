import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function LoanRequestDetail() {
  return (
    <AppShell backTo="/marketplace" backLabel="Marketplace" showNav={false}>
       <div className="flex justify-between items-start" style={{ marginBottom: 24 }}>
          <div>
             <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Request ID: #TR-9421</span>
             <h1 className="text-h2">Verified Personal Loan</h1>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--emerald)', fontWeight: 700, fontSize: 12, background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: 16 }}>
             <iconify-icon icon="lucide:shield-check" width="14" height="14"></iconify-icon>
             Low Risk
          </div>
       </div>

       <div className="glass-card" style={{ padding: 24, marginBottom: 24, borderLeft: '4px solid var(--emerald)' }}>
          <div className="flex justify-between items-end" style={{ marginBottom: 16 }}>
             <div>
                <p className="text-micro" style={{ color: 'var(--text-secondary)' }}>Funding Needed</p>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                   $1,200 <span style={{ fontSize: 16, color: 'var(--text-tertiary)' }}>USDT</span>
                </div>
             </div>
             <div className="text-right">
                <p className="text-micro" style={{ color: 'var(--text-secondary)' }}>APY Return</p>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--emerald)' }}>8.5%</div>
             </div>
          </div>
          
          <div className="divider" style={{ marginBottom: 16 }} />

          <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Term Length</span>
             <span style={{ fontWeight: 600 }}>3 Months</span>
          </div>
          <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Collateral Type</span>
             <span style={{ fontWeight: 600 }}>Soulbound Reputation</span>
          </div>
          <div className="flex justify-between items-center">
             <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Borrower Wallet</span>
             <span className="font-mono text-teal" style={{ fontSize: 12 }}>0x8aF...2B9c</span>
          </div>
       </div>

       <h3 className="text-h3" style={{ marginBottom: 16 }}>Borrower Profile</h3>
       <div className="stats-grid" style={{ marginBottom: 32 }}>
          <div style={{ background: 'var(--navy-panel)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--border-subtle)' }}>
             <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #D48A1B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>88</span>
                </div>
                <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>TrustScore</span>
             </div>
             <p style={{ fontSize: 14, fontWeight: 600 }}>Gold Tier</p>
          </div>
          <div style={{ background: 'var(--navy-panel)', borderRadius: 'var(--radius-lg)', padding: 16, border: '1px solid var(--border-subtle)' }}>
             <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                <iconify-icon icon="lucide:history" width="20" height="20" style={{ color: 'var(--emerald)' }} />
                <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>Repayments</span>
             </div>
             <p style={{ fontSize: 14, fontWeight: 600 }}>100% On-Time (14 Loans)</p>
          </div>
       </div>

       <Link to="/lender" className="btn-primary btn-primary--lg w-full">
          Fund This Loan
       </Link>
    </AppShell>
  );
}
