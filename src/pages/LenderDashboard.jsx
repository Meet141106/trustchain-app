import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const loans = [
  {
    id: 1, score: 72, borrower: '#2941', tier: 'Silver Reputation',
    status: 'Healthy', statusColor: 'var(--emerald)', statusBg: 'rgba(16,185,129,0.1)',
    amount: '$1,200', rate: '14%', endsIn: '12 Days'
  },
  {
    id: 2, score: 88, borrower: '#1082', tier: 'Gold Reputation',
    status: 'At Risk', statusColor: 'var(--gold)', statusBg: 'rgba(245,166,35,0.1)',
    amount: '$2,500', rate: '11%', endsIn: '4 Days'
  },
];

export default function LenderDashboard() {
  return (
    <AppShell>
      {/* Top stats */}
      <section style={{ marginBottom: 32 }}>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>Total Deployed</p>
            <div className="flex items-end gap-2">
              <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>$12,450</span>
              <span style={{ fontSize: 14, color: 'var(--emerald)', fontWeight: 500, marginBottom: 4 }}>+4.2%</span>
            </div>
          </div>

          <div className="stats-grid">
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)',
              padding: 16, border: '1px solid var(--border-subtle)'
            }}>
              <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Monthly APY</p>
              <p className="gold-glow" style={{ fontSize: 20, fontWeight: 700, color: 'var(--gold)' }}>12.4%</p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)',
              padding: 16, border: '1px solid var(--border-subtle)'
            }}>
              <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Active Loans</p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>18</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active funding */}
      <section style={{ marginBottom: 32 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Active Funding</h2>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>In good standing</span>
        </div>

        <div className="flex flex-col gap-3">
          {loans.map((loan) => (
            <div key={loan.id} className="loan-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #374151, #1F2937)',
                    border: '1px solid var(--border-emphasis)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{loan.score}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700 }}>Borrower {loan.borrower}</p>
                    <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>{loan.tier}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2" style={{
                  padding: '4px 8px', borderRadius: 'var(--radius-full)',
                  background: loan.statusBg
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: loan.statusColor }} />
                  <span className="text-micro" style={{ color: loan.statusColor }}>{loan.status}</span>
                </div>
              </div>

              <div className="flex justify-between items-end" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                <div className="flex flex-col">
                  <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 2 }}>Funded Amount</span>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{loan.amount}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 2 }}>Rate</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold)' }}>{loan.rate}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 2 }}>Ends In</span>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{loan.endsIn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse marketplace CTA */}
      <Link to="/marketplace" className="btn-primary" id="cta-marketplace" style={{ marginBottom: 0 }}>
        <iconify-icon icon="lucide:search" width="20" height="20"></iconify-icon>
        <span>Browse Loan Requests</span>
      </Link>

      {/* Lifetime stats */}
      <div className="flex items-center justify-between" style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
        <div>
          <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Lifetime Interest</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--emerald)' }}>+$3,421.80</p>
        </div>
        <Link to="/history" id="history-link" style={{
          fontSize: 10, color: 'var(--text-secondary)', fontWeight: 700,
          textTransform: 'uppercase', borderBottom: '1px solid rgba(156,163,175,0.3)',
          paddingBottom: 2
        }}>
          View History
        </Link>
      </div>
    </AppShell>
  );
}
