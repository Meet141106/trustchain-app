import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function GroupLoanRequest() {
  return (
    <AppShell backTo="/dashboard" backLabel="Home">
       <h1 className="text-h2" style={{ marginBottom: 24 }}>Circle Action Needed</h1>

       <div className="glass-card" style={{ padding: 24, textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: 'rgba(20,184,166,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
          }}>
            <iconify-icon icon="lucide:users-2" width="32" height="32" style={{ color: 'var(--teal)' }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Mumbai Circle #4</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>A member has requested a group loan and requires your approval to proceed.</p>
       </div>

       <div style={{
          background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
          padding: 24, border: '1px solid var(--border-subtle)', marginBottom: 32
       }}>
          <div className="flex items-center gap-4" style={{ marginBottom: 20 }}>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" alt="Priya" style={{ width: 48, height: 48, borderRadius: '50%', background: '#1E293B' }} />
             <div>
                <p style={{ fontWeight: 700 }}>Priya is requesting</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.02em' }}>$250.00</p>
             </div>
          </div>

          <div className="divider" style={{ marginBottom: 16 }} />

          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Purpose</span>
                <span style={{ fontWeight: 500 }}>Equipment Purchase</span>
             </div>
             <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Term</span>
                <span style={{ fontWeight: 500 }}>12 Weeks</span>
             </div>
             <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Current Approvals</span>
                <span style={{ fontWeight: 700, color: 'var(--teal)' }}>3 / 4 Required</span>
             </div>
          </div>
       </div>

       <Link to="/vouch" className="btn-primary w-full">
          Review & Approve
       </Link>
    </AppShell>
  );
}
