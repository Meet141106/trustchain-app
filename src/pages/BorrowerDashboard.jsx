import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import GlassCard from '../components/GlassCard';

const quickActions = [
  { to: '/borrow', icon: 'lucide:arrow-down-to-line', label: 'Borrow', id: 'action-borrow', active: true },
  { to: '/repay', icon: 'lucide:arrow-up-from-line', label: 'Repay', id: 'action-repay', active: true },
  { to: '#', icon: 'lucide:plus-circle', label: 'Add Collateral', id: 'action-collateral', active: false },
  { to: '#', icon: 'lucide:users', label: 'Invite Friend', id: 'action-invite', active: true },
];

export default function BorrowerDashboard() {
  return (
    <AppShell>
      {/* Balance section */}
      <section style={{ marginBottom: 32 }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 4 }}>Available to Borrow</p>
        <div className="flex items-end gap-2">
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>$1,250.00</h1>
          <span style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>USD</span>
        </div>
      </section>

      {/* Stats grid */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <GlassCard style={{ padding: 16, borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
            <iconify-icon icon="lucide:file-text" width="18" height="18" style={{ color: 'var(--gold)' }}></iconify-icon>
            <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>Active Loan</span>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: 20, fontWeight: 700 }}>$450</p>
            <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>Due in 12 days</p>
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 16, borderRadius: 'var(--radius-2xl)', display: 'flex', flexDirection: 'column' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
            <iconify-icon icon="lucide:layers" width="18" height="18" style={{ color: 'var(--gold)' }}></iconify-icon>
            <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>Collateral</span>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontSize: 20, fontWeight: 700 }}>None</p>
            <p className="text-micro" style={{ color: 'var(--gold)', marginTop: 4 }}>Reputation-based</p>
          </div>
        </GlassCard>
      </div>

      {/* Health status */}
      <section className="glass-card" style={{ padding: 20, borderRadius: 'var(--radius-2xl)', marginBottom: 32 }}>
        <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
          <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>Loan Health Status</span>
          <span className="text-micro" style={{ color: 'var(--emerald)' }}>Healthy</span>
        </div>
        <div className="health-bar">
          <div className="health-bar__indicator" style={{ left: '22%' }} />
        </div>
        <div className="flex justify-between" style={{ marginTop: 12 }}>
          <span className="text-micro" style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>Safe</span>
          <span className="text-micro" style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>Warning</span>
          <span className="text-micro" style={{ color: 'var(--text-tertiary)', fontSize: 10 }}>Liquidation Risk</span>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Quick Actions</h2>
        <div className="stats-grid">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.to}
              id={action.id}
              className="glass-card flex flex-col items-center justify-center gap-3"
              style={{
                padding: 16, borderRadius: 'var(--radius-2xl)',
                opacity: action.active ? 1 : 0.5,
                pointerEvents: action.active ? 'auto' : 'none',
                transition: 'transform 0.15s ease'
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                background: action.active ? 'rgba(245,166,35,0.1)' : 'rgba(107,114,128,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <iconify-icon icon={action.icon} width="24" height="24" style={{ color: action.active ? 'var(--gold)' : 'var(--text-secondary)' }}></iconify-icon>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{action.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
