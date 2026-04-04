import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import GlassCard from '../components/GlassCard';

export default function CreditAssessment() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText('0x71C7656EC7ab88b098defb751B7401B5f6d8976F');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      {/* Profile header */}
      <div className="flex justify-between items-center" style={{ marginBottom: 32 }}>
        <div className="flex flex-col">
          <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Profile</span>
          <div className="flex items-center gap-2">
            <span className="font-mono" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>0x71C...3d8f</span>
            <button onClick={handleCopy} aria-label="Copy address" style={{ color: 'var(--text-tertiary)', fontSize: 12, cursor: 'pointer' }}>
              <iconify-icon icon={copied ? 'lucide:check' : 'lucide:copy'} width="14" height="14"></iconify-icon>
            </button>
          </div>
        </div>
        <div style={{
          padding: '6px 12px', borderRadius: 'var(--radius-full)',
          background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <iconify-icon icon="lucide:shield-check" width="16" height="16" style={{ color: 'var(--gold)' }}></iconify-icon>
          <span className="text-micro" style={{ color: 'var(--gold)', letterSpacing: '0.05em' }}>Silver Borrower</span>
        </div>
      </div>

      {/* Credit score ring */}
      <div className="flex flex-col items-center" style={{ marginBottom: 40 }}>
        <div className="score-ring" style={{ width: 224, height: 224, opacity: 0.8, boxShadow: '0 0 40px rgba(245,166,35,0.1)' }}>
          <div className="score-ring__inner" />
          <div className="score-ring__content">
            <span className="gold-glow" style={{ fontSize: 60, fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.02em' }}>72</span>
            <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>Credit Score</span>
          </div>
        </div>

        {/* Tier progression */}
        <div style={{ marginTop: 32, width: '100%' }}>
          <div className="flex justify-between items-end" style={{ marginBottom: 8 }}>
            <div className="flex flex-col">
              <span className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Tier Progression</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Next: Gold</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>18pts to upgrade</span>
          </div>
          <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, var(--gold), var(--gold-dark))', borderRadius: 'var(--radius-full)' }} />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <GlassCard style={{ padding: 20 }}>
          <iconify-icon icon="lucide:check-circle" width="20" height="20" style={{ color: 'var(--teal)', marginBottom: 12, display: 'block' }}></iconify-icon>
          <div style={{ fontSize: 24, fontWeight: 700 }}>12</div>
          <div className="text-micro" style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>Loans Repaid</div>
        </GlassCard>
        <GlassCard style={{ padding: 20 }}>
          <iconify-icon icon="lucide:coins" width="20" height="20" style={{ color: 'var(--gold)', marginBottom: 12, display: 'block' }}></iconify-icon>
          <div style={{ fontSize: 24, fontWeight: 700 }}>$4,250</div>
          <div className="text-micro" style={{ color: 'var(--text-tertiary)', marginTop: 4 }}>Total Repaid</div>
        </GlassCard>
      </div>

      {/* NFT Section */}
      <div style={{ marginBottom: 16 }}>
        <span className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 16, display: 'block' }}>Your Reputation NFT</span>
        <Link to="/profile" className="glass-card" id="nft-showcase-card" style={{
          display: 'block', padding: 24, borderRadius: 'var(--radius-2xl)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{
              width: 96, height: 96, flexShrink: 0, borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #0F1420, #1A2235)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <path d="M10,10 L90,90 M90,10 L10,90" stroke="#F5A623" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="20" stroke="#F5A623" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
              <iconify-icon icon="lucide:award" width="36" height="36" style={{ color: 'var(--gold)' }}></iconify-icon>
            </div>
            <div className="flex flex-col">
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Silver Passport #724</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>Soulbound Identity Token</p>
              <span className="flex items-center gap-1" style={{ fontSize: 12, fontWeight: 700, color: 'var(--teal)' }}>
                Verified Reputation
                <iconify-icon icon="lucide:chevron-right" width="12" height="12"></iconify-icon>
              </span>
            </div>
          </div>
          <div style={{
            position: 'absolute', right: -16, bottom: -16,
            width: 96, height: 96, background: 'rgba(245,166,35,0.1)',
            filter: 'blur(24px)', borderRadius: '50%'
          }} />
        </Link>
      </div>
    </AppShell>
  );
}
