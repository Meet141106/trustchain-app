import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function VouchForMember() {
  return (
    <AppShell backTo="/group" backLabel="Mumbai Circle #4" showNav={false}>
      <h1 className="text-h2" style={{ marginBottom: 24 }}>Vouch for Priya</h1>

      <div className="flex flex-col items-center" style={{ marginBottom: 32 }}>
         <div style={{
            width: 80, height: 80, borderRadius: '50%', padding: 2, marginBottom: 16,
            border: '2px solid var(--gold)',
         }}>
            <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" 
               alt="Priya" 
               style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#1E293B' }} 
            />
         </div>
         <p style={{ fontSize: 24, fontWeight: 700 }}>Priya's Loan Request</p>
         <p style={{ color: 'var(--text-secondary)' }}>$250.00 • 12 Weeks</p>
      </div>

      <div style={{
         background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
         padding: 24, border: '1px solid var(--border-subtle)', marginBottom: 24
      }}>
         <h3 className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Borrower Stats</h3>
         <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Individual TrustScore</span>
               <span style={{ fontWeight: 600, color: 'var(--gold)' }}>88 (High)</span>
            </div>
            <div className="flex justify-between items-center">
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Past Repayments</span>
               <span style={{ fontWeight: 600 }}>14 On-time</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between items-center">
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Vouch Progress</span>
               <span style={{ fontWeight: 600, color: 'var(--teal)' }}>4/5 Confirmed</span>
            </div>
         </div>
      </div>

      <div style={{
         background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)',
         borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 32
      }}>
         <div className="flex gap-3">
            <iconify-icon icon="lucide:shield-alert" width="20" height="20" style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
            <div>
               <p style={{ color: 'var(--red)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Risk Assessment</p>
               <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>
                 By vouching for and approving this loan, you accept mutual accountability. Your score will drop by <strong>-50 pts</strong> if Priya defaults.
               </p>
            </div>
         </div>
      </div>

      <div className="flex gap-3">
         <Link to="/group" className="btn-ghost text-red" style={{ flex: 1, borderColor: 'rgba(239, 68, 68, 0.3)', color: '#FCA5A5' }}>
            Decline
         </Link>
         <Link to="/group" className="btn-primary" style={{ flex: 2 }}>
            <iconify-icon icon="lucide:check-circle" width="18" height="18" />
            Vouch & Approve
         </Link>
      </div>
    </AppShell>
  );
}
