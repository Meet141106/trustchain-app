import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function ShareableLoanRequest() {
  return (
    <AppShell backTo="/dashboard" backLabel="Dashboard" showNav={false}>
       <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
          <h1 className="text-h2">Share Request</h1>
          <button className="text-micro" style={{ color: 'var(--gold)' }}>Copy Link</button>
       </div>

       <div style={{
          background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
          padding: 32, border: '1px solid var(--border-subtle)', marginBottom: 24,
          textAlign: 'center'
       }}>
          <div style={{
             width: 160, height: 160, margin: '0 auto 24px', background: 'white', borderRadius: 16,
             padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
             {/* Mock QR Code */}
             <img src="https://api.dicebear.com/7.x/identicon/svg?seed=requestQR" alt="QR Code" style={{ width: '100%', height: '100%' }} />
          </div>
          
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Need $1,200 USDT</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
             Scan to fund this loan instantly. Backed by my Gold Tier on-chain reputation.
          </p>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-lg)', padding: 16, marginTop: 24, display: 'flex', justifyContent: 'space-around' }}>
             <div>
                <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>TrustScore</p>
                <p style={{ fontWeight: 700, color: 'var(--gold)' }}>88</p>
             </div>
             <div>
                <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>APY Offerd</p>
                <p style={{ fontWeight: 700, color: 'var(--emerald)' }}>8.5%</p>
             </div>
             <div>
                <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Term Length</p>
                <p style={{ fontWeight: 700 }}>3 Months</p>
             </div>
          </div>
       </div>

       <div className="flex gap-4">
          <button className="btn-secondary" style={{ flex: 1 }}>
             <iconify-icon icon="logos:twitter" width="18" height="18" /> Share
          </button>
          <button className="btn-secondary" style={{ flex: 1 }}>
             <iconify-icon icon="logos:whatsapp-icon" width="18" height="18" /> Send
          </button>
       </div>
    </AppShell>
  );
}
