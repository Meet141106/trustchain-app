import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  
  return (
    <div className="screen">
      <Header backTo="/dashboard" backLabel="Cancel" />

      <main className="screen__body screen__body--no-tab">
        <h1 className="text-h2" style={{ marginBottom: 8, padding: '0 8px' }}>Create Lending Circle</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, padding: '0 8px', fontSize: 14 }}>
          Form a trusted group. Pool reputation to unlock higher limits.
        </p>

        <div className="flex flex-col gap-6" style={{ padding: '0 8px' }}>
          {/* Group Name */}
          <div>
            <label className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Circle Name</label>
            <input 
              type="text" 
              placeholder="e.g. Mumbai Circle #4"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{
                width: '100%', height: 56, background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-emphasis)', borderRadius: 'var(--radius-lg)',
                padding: '0 16px', fontSize: 16, outline: 'none'
              }}
            />
          </div>

          {/* Members */}
          <div>
             <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
                <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>Invited Members (1/5)</span>
                <button className="text-micro" style={{ color: 'var(--gold)' }}>+ Add</button>
             </div>
             
             <div style={{
                background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-emphasis)',
                borderRadius: 'var(--radius-lg)', padding: 24, textAlign: 'center'
             }}>
                <iconify-icon icon="lucide:user-plus" width="32" height="32" style={{ color: 'var(--text-tertiary)', marginBottom: 12 }} />
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>Invite trusted friends via wallet address or scanning their QR code.</p>
                <div className="flex gap-2">
                   <button className="btn-secondary" style={{ height: 40, fontSize: 14 }}>Paste Address</button>
                   <button className="btn-secondary" style={{ height: 40, fontSize: 14 }}><iconify-icon icon="lucide:qr-code" /></button>
                </div>
             </div>
          </div>

          {/* Warning */}
          <div style={{
             background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)',
             borderRadius: 'var(--radius-lg)', padding: 16, marginTop: 16
          }}>
             <div className="flex gap-3">
                <iconify-icon icon="lucide:shield-alert" width="20" height="20" style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
                <div>
                   <p style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Shared Liability</p>
                   <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.6 }}>
                     When forming a circle, all members' TrustScores are linked. If any member defaults, the entire group loses circle privileges.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </main>

      <footer className="screen__footer">
        <Link to="/group" className="btn-primary btn-primary--lg" style={{ opacity: groupName ? 1 : 0.5, pointerEvents: groupName ? 'auto' : 'none' }}>
           Initialize Circle
        </Link>
      </footer>
    </div>
  );
}
