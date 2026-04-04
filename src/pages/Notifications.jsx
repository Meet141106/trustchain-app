import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const notifs = [
  { id: 1, type: 'warning', title: 'Payment Due Tomorrow', time: '2h ago', desc: 'Your $450 repayment is due in 24 hours. Ensuring on-time payment protects your TrustScore.', icon: 'lucide:clock' },
  { id: 2, type: 'success', title: 'Loan Fully Funded', time: '1d ago', desc: 'Your request for $1,200 has been fully backed by the community. Funds are in your wallet.', icon: 'lucide:zap' },
  { id: 3, type: 'info', title: 'TrustScore Updated', time: '3d ago', desc: 'Your score has increased to 72. You are now a Silver Borrower.', icon: 'lucide:trending-up' },
  { id: 4, type: 'danger', title: 'Liquidation Risk', time: '1w ago', desc: 'Your collateral ratio dropped to 1.15. Please top up to avoid partial liquidation.', icon: 'lucide:alert-triangle' },
];

export default function Notifications() {
  return (
    <AppShell backTo="/dashboard" backLabel="Home">
       <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
          <h1 className="text-h2">Notifications</h1>
          <button className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Mark all read</button>
       </div>

       <div className="flex flex-col gap-4">
          {notifs.map(n => (
             <div key={n.id} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)', padding: 16, display: 'flex', gap: 16
             }}>
                <div style={{
                   width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                   background: n.type === 'warning' ? 'rgba(245,166,35,0.1)' : n.type === 'success' ? 'rgba(16,185,129,0.1)' : n.type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(45,212,191,0.1)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                   <iconify-icon icon={n.icon} style={{ color: n.type === 'warning' ? 'var(--gold)' : n.type === 'success' ? 'var(--emerald)' : n.type === 'danger' ? 'var(--red)' : 'var(--teal)' }} />
                </div>
                <div>
                   <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{n.title}</p>
                      <span className="text-micro" style={{ color: 'var(--text-tertiary)' }}>{n.time}</span>
                   </div>
                   <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.5 }}>{n.desc}</p>
                </div>
             </div>
          ))}
       </div>
    </AppShell>
  );
}
