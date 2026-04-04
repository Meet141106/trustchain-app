import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function Settings() {
  const menus = [
    { section: 'Account', items: [
       { icon: 'lucide:wallet', text: 'Wallet Management', val: '0x71...f9' },
       { icon: 'lucide:shield', text: 'Privacy & Security', val: '' }
    ]},
    { section: 'App Preferences', items: [
       { icon: 'lucide:bell', text: 'Push Notifications', val: 'Enabled' },
       { icon: 'lucide:globe', text: 'Language', val: 'English' },
       { icon: 'lucide:moon', text: 'Theme', val: 'Dark' }
    ]},
    { section: 'Support', items: [
       { icon: 'lucide:help-circle', text: 'Help Center', val: '' },
       { icon: 'lucide:file-text', text: 'Terms of Service', val: '' }
    ]}
  ];

  return (
    <AppShell showNav={true}>
       <h1 className="text-h2" style={{ marginBottom: 24 }}>Settings</h1>

       <div className="flex items-center gap-4" style={{ marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gold)', padding: 2 }}>
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoKing99" alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#1E293B' }} />
          </div>
          <div>
             <h2 style={{ fontSize: 18, fontWeight: 700 }}>CryptoKing99</h2>
             <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Gold Tier Borrower</p>
          </div>
       </div>

       <div className="flex flex-col gap-6" style={{ marginBottom: 40 }}>
          {menus.map((s, idx) => (
             <div key={idx}>
                <h3 className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8, paddingLeft: 8 }}>{s.section}</h3>
                <div style={{ background: 'var(--navy-panel)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                   {s.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center" style={{ 
                         padding: 16, borderBottom: i < s.items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                         cursor: 'pointer'
                      }}>
                         <div className="flex items-center gap-3">
                            <iconify-icon icon={item.icon} style={{ color: 'var(--text-tertiary)' }} width="18" height="18" />
                            <span style={{ fontSize: 14 }}>{item.text}</span>
                         </div>
                         <div className="flex items-center gap-2">
                            {item.val && <span className="text-micro" style={{ color: 'var(--text-secondary)' }}>{item.val}</span>}
                            <iconify-icon icon="lucide:chevron-right" style={{ color: 'var(--border-emphasis)' }} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          ))}
       </div>

       <Link to="/wallet" className="btn-ghost text-red w-full" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#FCA5A5' }}>
          Disconnect Wallet
       </Link>
    </AppShell>
  );
}
