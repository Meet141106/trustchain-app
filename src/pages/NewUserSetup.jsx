import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function NewUserSetup() {
  const [role, setRole] = useState('borrower');
  const [name, setName] = useState('');
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    setScanning(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500); // Simulate risk scan
  };

  if (scanning) {
    return (
      <div className="screen flex-col items-center justify-center text-center">
        <div className="blur-blob blur-blob--teal" style={{ top: '30%', left: '10%' }} />
        <div className="relative" style={{ marginBottom: 32 }}>
          <svg width="120" height="120" className="animate-spin" style={{ animationDuration: '3s' }}>
             <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(245,166,35,0.2)" strokeWidth="4" />
             <circle cx="60" cy="60" r="54" fill="none" stroke="var(--gold)" strokeWidth="4" strokeDasharray="339" strokeDashoffset="260" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iconify-icon icon="lucide:search" width="32" height="32" style={{ color: 'var(--gold)' }}></iconify-icon>
          </div>
        </div>
        <h2 className="text-h2 animate-pulse" style={{ marginBottom: 8 }}>Scanning Wallet...</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Analyzing past transactions to assign<br />your initial Trust Score.</p>
      </div>
    );
  }

  return (
    <div className="screen">
      <Header backTo="/wallet" backLabel="Back" />
      
      <main className="screen__body screen__body--no-tab" style={{ padding: '24px 32px' }}>
        <h1 className="text-h1" style={{ marginBottom: 32 }}>
          Setup Your <span className="text-gold gold-glow">Profile</span>
        </h1>

        <div className="flex flex-col gap-6">
          <div>
            <label className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Display Name</label>
            <input 
              type="text" 
              placeholder="e.g. CryptoKing99"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%', height: 56, background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-emphasis)', borderRadius: 'var(--radius-lg)',
                padding: '0 16px', fontSize: 16, outline: 'none'
              }}
            />
          </div>

          <div>
            <label className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>Primary Role</label>
            <div className="flex flex-col gap-3">
              {[
                { id: 'borrower', title: 'Borrower', desc: 'I want to build my score to access loans', icon: 'lucide:arrow-down-to-line' },
                { id: 'lender', title: 'Lender', desc: 'I want to provide liquidity and earn yield', icon: 'lucide:arrow-up-from-line' },
                { id: 'both', title: 'Both', desc: 'I want to borrow and lend simultaneously', icon: 'lucide:arrow-right-left' }
              ].map(opt => (
                <label 
                  key={opt.id}
                  className={`radio-card ${role === opt.id ? 'radio-card--selected' : ''}`}
                  onClick={() => setRole(opt.id)}
                >
                  <div className="flex items-center gap-3">
                    <div style={{ 
                      width: 40, height: 40, borderRadius: 'var(--radius-md)', 
                      background: role === opt.id ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                       <iconify-icon icon={opt.icon} width="20" height="20" style={{ color: role === opt.id ? 'var(--navy)' : 'var(--text-secondary)' }}></iconify-icon>
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 14, display: 'block', color: role === opt.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{opt.title}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{opt.desc}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="screen__footer">
        <button onClick={handleContinue} className="btn-primary btn-primary--lg" disabled={!name}>
          Continue
        </button>
      </footer>
    </div>
  );
}
