import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function NftShowcase() {
  return (
    <AppShell>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: 32 }}>
        <h1 className="text-h2" style={{ marginBottom: 4 }}>Soulbound Identity</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Your immutable credit reputation NFT</p>
      </div>

      {/* NFT Card */}
      <div className="flex justify-center" style={{ marginBottom: 32 }}>
        <div className="nft-card">
          <div className="nft-card__pattern" />
          <div className="nft-card__gradient" />
          <div className="nft-card__content">
            {/* Top badges */}
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-1" style={{
                padding: '4px 12px', background: 'var(--gold)', borderRadius: 'var(--radius-full)'
              }}>
                <iconify-icon icon="lucide:shield-check" width="12" height="12" style={{ color: 'var(--navy)' }}></iconify-icon>
                <span className="text-micro" style={{ color: 'var(--navy)', letterSpacing: '0.05em' }}>Soulbound</span>
              </div>
              <iconify-icon icon="lucide:fingerprint" width="28" height="28" style={{ color: 'rgba(255,255,255,0.2)' }}></iconify-icon>
            </div>

            {/* Score ring */}
            <div className="text-center flex flex-col items-center">
              <div className="relative" style={{ marginBottom: 8 }}>
                <svg width="128" height="128" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(245,166,35,0.1)" strokeWidth="4" />
                  <circle cx="64" cy="64" r="58" fill="none" stroke="var(--gold)" strokeWidth="4" strokeDasharray="364" strokeDashoffset="102"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(245,166,35,0.5))' }} />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span className="gold-glow" style={{ fontSize: 36, fontWeight: 700, color: 'var(--gold)' }}>72</span>
                  <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>Score</span>
                </div>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 2 }}>Silver Borrower</h2>
              <p style={{ color: 'var(--teal-deep)', fontSize: 12, fontWeight: 500, letterSpacing: '0.02em' }}>Status: High Integrity</p>
            </div>

            {/* Bottom stats */}
            <div className="w-full" style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-micro" style={{ color: 'var(--text-secondary)' }}>Repayment Count</p>
                  <p style={{ fontSize: 18, fontWeight: 700 }}>12 Loans</p>
                </div>
                <div className="text-right">
                  <p className="text-micro" style={{ color: 'var(--text-secondary)' }}>Wallet</p>
                  <p className="font-mono" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>0x71...3A2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4" style={{ marginBottom: 40 }}>
        <button className="btn-ghost" id="share-nft-btn">
          <iconify-icon icon="lucide:share-2" width="18" height="18" style={{ color: 'var(--gold)' }}></iconify-icon>
          <span style={{ fontWeight: 700 }}>Share Reputation</span>
        </button>

        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)', padding: 20
        }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700 }}>Loan History Summary</h3>
            <Link to="/history" id="view-history-link" className="text-micro" style={{ color: 'var(--gold)' }}>View All</Link>
          </div>
          <div className="stats-grid">
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Total Repaid</p>
              <p style={{ fontWeight: 700 }}>$14,250</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Active Loans</p>
              <p style={{ fontWeight: 700, color: 'var(--teal-deep)' }}>0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="text-center" style={{ padding: '0 16px' }}>
        <iconify-icon icon="lucide:award" width="28" height="28" style={{ color: 'var(--gold)', opacity: 0.5, marginBottom: 12 }}></iconify-icon>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontStyle: 'italic', lineHeight: 1.6 }}>
          "Your credit score is yours forever —<br />no bank can take it away from you."
        </p>
      </div>
    </AppShell>
  );
}
