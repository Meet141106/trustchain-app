import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function InviteFriends() {
  return (
    <AppShell backTo="/dashboard" backLabel="Home" showNav={false}>
       <div className="text-center" style={{ marginBottom: 32, paddingTop: 16 }}>
          <div style={{
             width: 80, height: 80, margin: '0 auto 16px', background: 'rgba(245, 166, 35, 0.1)',
             borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
             border: '2px solid rgba(245, 166, 35, 0.3)'
          }}>
             <iconify-icon icon="lucide:gift" width="40" height="40" style={{ color: 'var(--gold)' }} />
          </div>
          <h1 className="text-h2" style={{ marginBottom: 8 }}>Invite & Earn</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
             Invite trustworthy friends to TrustLend. When they fully repay their first loan, both of you earn a <strong>+10 TrustScore</strong> boost!
          </p>
       </div>

       <div style={{
          background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
          padding: 24, border: '1px solid var(--border-subtle)', marginBottom: 32,
          textAlign: 'center'
       }}>
          <h3 className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 16 }}>Your Unique Referral Link</h3>
          <div style={{
             background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-emphasis)',
             borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 16,
             display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
             <span style={{ fontSize: 14, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>
                https://trustlend.finance/invite/usr_8xj...
             </span>
             <button style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase' }}>Copy</button>
          </div>
          
          <div className="divider" style={{ margin: '24px 0' }} />
          
          <div style={{ width: 140, height: 140, margin: '0 auto', background: 'white', padding: 8, borderRadius: 12 }}>
             <img src="https://api.dicebear.com/7.x/identicon/svg?seed=inviteCode" alt="Invite QR" style={{ width: '100%', height: '100%' }} />
          </div>
          <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginTop: 12 }}>Have them scan this code</p>
       </div>

       <button className="btn-primary w-full flex items-center justify-center gap-2" style={{ background: '#25D366', color: '#123D26', boxShadow: 'none' }}>
          <iconify-icon icon="logos:whatsapp-icon" width="20" height="20" /> Default Whatsapp Share
       </button>
    </AppShell>
  );
}
