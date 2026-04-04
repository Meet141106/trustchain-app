import AppShell from '../components/AppShell';

const members = [
  { name: 'Priya', seed: 'Priya', borrower: true, confirmed: true },
  { name: 'Rahul', seed: 'Rahul', borrower: false, confirmed: true },
  { name: 'Anita', seed: 'Anita', borrower: false, confirmed: true },
  { name: 'Sunita', seed: 'Sunita', borrower: false, confirmed: true },
  { name: 'Deepak', seed: 'Deepak', borrower: false, confirmed: false },
];

export default function GroupLending() {
  return (
    <AppShell>
      {/* Group identity */}
      <div style={{ marginBottom: 32 }}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-h2" style={{ marginBottom: 4 }}>Mumbai Circle #4</h2>
            <div className="flex items-center gap-2">
              <span className="badge-pill" style={{ background: 'rgba(20,184,166,0.1)', color: 'var(--teal-deep)', fontSize: 10 }}>Active Pool</span>
              <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>Formed Jan 2024</span>
            </div>
          </div>
          <div className="text-right">
            <div style={{ color: 'var(--gold)', fontSize: 20, fontWeight: 700, lineHeight: 1 }}>942</div>
            <div className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Group Score</div>
          </div>
        </div>
      </div>

      {/* Members */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>Circle Members</p>
        <div className="flex justify-between items-start">
          {members.map((m) => (
            <div key={m.name} className="flex flex-col items-center gap-2">
              <div className="relative">
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', padding: 2,
                  border: m.borrower ? '2px solid var(--gold)' : m.confirmed ? '1px solid var(--border-emphasis)' : '1px dashed rgba(255,255,255,0.3)',
                  opacity: m.confirmed ? (m.borrower ? 1 : 0.8) : 1
                }}>
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.seed}`}
                    alt={m.name}
                    style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#1E293B', opacity: m.confirmed ? 1 : 0.4 }}
                  />
                </div>
                <div style={{
                  position: 'absolute', bottom: -4, right: -4,
                  width: 20, height: 20, borderRadius: '50%',
                  background: m.confirmed ? 'var(--teal-deep)' : '#4B5563',
                  border: '2px solid var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <iconify-icon icon={m.confirmed ? 'lucide:check' : 'lucide:minus'} width="10" height="10" style={{ color: 'white' }}></iconify-icon>
                </div>
              </div>
              <span style={{
                fontSize: 12, fontWeight: m.borrower ? 600 : 500,
                color: m.borrower ? 'var(--gold)' : m.confirmed ? 'var(--text-secondary)' : 'var(--text-tertiary)'
              }}>{m.name}</span>
              {m.borrower && (
                <span style={{
                  fontSize: 8, background: 'rgba(245,166,35,0.2)',
                  padding: '2px 6px', borderRadius: 4,
                  color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase'
                }}>Borrower</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Financial summary */}
      <div style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-emphasis)',
        borderRadius: 'var(--radius-2xl)', padding: 24, marginBottom: 24
      }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 24 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-md)',
            background: 'rgba(20,184,166,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <iconify-icon icon="lucide:users-2" width="20" height="20" style={{ color: 'var(--teal-deep)' }}></iconify-icon>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Current Pool Loan</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>$250.00</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Your Responsibility</span>
            <span style={{ fontWeight: 600 }}>$50.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Repayment Term</span>
            <span style={{ fontWeight: 600 }}>12 Weeks</span>
          </div>
          <div className="divider" />
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Individual Vouch Status</span>
            <span style={{ color: 'var(--teal-deep)', fontSize: 12, fontWeight: 700 }}>4 / 5 Confirmed</span>
          </div>
        </div>
      </div>

      {/* Community pledge */}
      <div style={{
        background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)',
        borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 32
      }}>
        <div className="flex gap-3">
          <iconify-icon icon="lucide:alert-circle" width="20" height="20" style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
          <div>
            <p style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Community Pledge</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>
              If one member defaults, the entire circle loses future access to higher loan tiers. Your vouching helps ensure group stability.
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <button className="btn-primary" id="vouch-action-btn" style={{ marginBottom: 16 }}>
        <iconify-icon icon="lucide:handshake" width="20" height="20"></iconify-icon>
        <span>Vouch for Priya</span>
      </button>
      <button className="btn-secondary" id="secondary-action-btn">
        View Loan Details
      </button>
    </AppShell>
  );
}
