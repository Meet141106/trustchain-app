import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function ScoreBreakdown() {
  const factors = [
    { name: 'Repayment History', pct: '40%', score: 'Excellent', color: 'var(--emerald)' },
    { name: 'Wallet Age (Identity)', pct: '25%', score: 'Good', color: 'var(--teal)' },
    { name: 'Group Verification', pct: '20%', score: 'Average', color: 'var(--gold)' },
    { name: 'Total Borrowed Vol.', pct: '15%', score: 'Needs Work', color: 'var(--red)' }
  ];

  return (
    <AppShell backTo="/credit" backLabel="Profile">
       <h1 className="text-h2" style={{ marginBottom: 8 }}>Score Breakdown</h1>
       <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 32 }}>
          Your <strong>TrustScore (72)</strong> is calculated purely from your decentralized on-chain history. Here is how you are evaluated.
       </p>

       <div className="flex flex-col gap-6">
          {factors.map((f, i) => (
             <div key={i} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-emphasis)',
                borderRadius: 'var(--radius-lg)', padding: 16
             }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
                   <div>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{f.name}</p>
                      <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Weight: {f.pct}</p>
                   </div>
                   <div style={{ color: f.color, fontSize: 12, fontWeight: 700, background: `rgba(${f.color === 'var(--emerald)' ? '16,185,129' : f.color === 'var(--gold)' ? '245,166,35' : f.color === 'var(--red)' ? '239,68,68' : '45,212,191'},0.1)`, padding: '4px 10px', borderRadius: 16 }}>
                      {f.score}
                   </div>
                </div>
                
                {/* Horizontal Progress */}
                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                   <div style={{ 
                      height: '100%', borderRadius: 3, background: f.color,
                      width: f.score === 'Excellent' ? '95%' : f.score === 'Good' ? '75%' : f.score === 'Average' ? '50%' : '25%' 
                   }} />
                </div>
             </div>
          ))}
       </div>

       <div style={{ marginTop: 32, padding: 20, background: 'var(--navy-panel)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <iconify-icon icon="lucide:trending-up" width="24" height="24" style={{ color: 'var(--gold)', marginBottom: 8 }} />
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Want to increase your score?</h3>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Join a lending circle or maintain a 5-payment streak to unlock the Gold Tier instantly.</p>
       </div>
    </AppShell>
  );
}
