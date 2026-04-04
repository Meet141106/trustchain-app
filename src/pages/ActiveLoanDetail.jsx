import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import StatusBadge from '../components/StatusBadge';

export default function ActiveLoanDetail() {
  return (
    <AppShell backTo="/dashboard" backLabel="Dashboard">
      <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
        <h1 className="text-h2">Active Loan</h1>
        <StatusBadge variant="success">Healthy</StatusBadge>
      </div>

      <div style={{
         background: 'linear-gradient(180deg, var(--navy-panel) 0%, transparent 100%)',
         borderRadius: 'var(--radius-2xl)', padding: 24, border: '1px solid var(--border-subtle)',
         marginBottom: 24
      }}>
         <p className="text-micro text-center" style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Current Balance Due</p>
         <div className="text-center" style={{ marginBottom: 32 }}>
            <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em' }}>$454.50</span>
         </div>
         
         {/* Due Date ProgressBar */}
         <div style={{ marginBottom: 24 }}>
            <div className="flex justify-between items-end" style={{ marginBottom: 8 }}>
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Time Remaining</span>
               <span style={{ fontWeight: 700, color: 'var(--gold)' }}>12 Days</span>
            </div>
            <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
               <div style={{ height: '100%', width: '65%', background: 'var(--gold)', borderRadius: 'var(--radius-full)' }} />
            </div>
         </div>

         <div className="divider" style={{ marginBottom: 24 }} />

         <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Principal</span>
               <span style={{ fontWeight: 600 }}>$450.00</span>
            </div>
            <div className="flex justify-between items-center">
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Accrued Interest</span>
               <span style={{ fontWeight: 600, color: 'var(--red)' }}>+$4.50</span>
            </div>
            <div className="flex justify-between items-center">
               <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Original Term</span>
               <span style={{ fontWeight: 600 }}>12 Weeks</span>
            </div>
         </div>
      </div>

      <div className="stats-grid" style={{ marginBottom: 32 }}>
         <div className="glass-card" style={{ padding: 16 }}>
            <iconify-icon icon="lucide:shield-alert" width="20" height="20" style={{ color: 'var(--teal)', marginBottom: 8 }} />
            <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Collateral</p>
            <p style={{ fontSize: 18, fontWeight: 700 }}>None</p>
         </div>
         <div className="glass-card" style={{ padding: 16 }}>
            <iconify-icon icon="lucide:percent" width="20" height="20" style={{ color: 'var(--gold)', marginBottom: 8 }} />
            <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>APY Rate</p>
            <p style={{ fontSize: 18, fontWeight: 700 }}>4.2%</p>
         </div>
      </div>

      <Link to="/repay" className="btn-primary btn-primary--lg w-full">
         Repay Loan Now
      </Link>
    </AppShell>
  );
}
