import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function DisputeScreen() {
  const [reason, setReason] = useState('');

  return (
    <AppShell backTo="/dashboard" backLabel="Back" showNav={false}>
       <div className="flex items-center gap-3" style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <iconify-icon icon="lucide:scale" style={{ color: 'var(--red)' }} />
          </div>
          <div>
             <h1 className="text-h3">Raise Dispute</h1>
             <p className="text-micro" style={{ color: 'var(--text-secondary)' }}>Loan #TR-4421</p>
          </div>
       </div>

       <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
          Community dispute resolution freezes the loan status while a decentralized oracle or committee reviews evidence. Filing fraudulent disputes harms your TrustScore.
       </p>

       <div className="flex flex-col gap-6" style={{ marginBottom: 32 }}>
          <div>
            <label className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Reason for Dispute</label>
            <div className="flex flex-col gap-3">
               {['Smart Contract Error', 'Unfair Liquidation', 'Hacked Wallet Compromise'].map(r => (
                  <label key={r} className="flex items-center gap-3" style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                     <input type="radio" name="reason" value={r} onChange={() => setReason(r)} style={{ accentColor: 'var(--red)' }} />
                     <span style={{ fontSize: 14 }}>{r}</span>
                  </label>
               ))}
            </div>
          </div>

          <div>
             <label className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Additional Evidence (IPFS Link or details)</label>
             <textarea 
               placeholder="Please describe what happened..."
               style={{
                  width: '100%', height: 100, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-emphasis)', borderRadius: 'var(--radius-lg)',
                  padding: 16, fontSize: 14, outline: 'none', resize: 'none', color: 'white'
               }}
             />
          </div>
       </div>

       <Link to="/dashboard" className="btn-primary w-full" style={{ background: 'var(--red)', color: 'white', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)' }}>
          Submit Dispute to DAO
       </Link>
    </AppShell>
  );
}
