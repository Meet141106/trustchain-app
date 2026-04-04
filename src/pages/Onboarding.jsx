import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Onboarding() {
  return (
    <div className="screen">
      {/* Decorative blobs */}
      <div className="blur-blob" style={{ top: -80, left: -80 }} />
      <div className="blur-blob" style={{ bottom: 160, right: -80 }} />

      {/* Header */}
      <div className="screen__header">
        <div className="app-header">
          <div className="app-header__logo">
            <iconify-icon icon="lucide:landmark"></iconify-icon>
          </div>
          <span className="app-header__brand">TrustLend</span>
        </div>
      </div>

      {/* Main content */}
      <main className="screen__body screen__body--no-tab" style={{ display: 'flex', flexDirection: 'column', padding: '0 32px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Hero graphic */}
          <div className="animate-fade-in" style={{ marginBottom: 40, position: 'relative' }}>
            <div style={{
              width: 96, height: 96, borderRadius: 24,
              border: '1px solid rgba(245,166,35,0.2)',
              transform: 'rotate(12deg)',
              position: 'absolute', top: -16, left: -16
            }} />
            <div style={{
              width: 96, height: 96, borderRadius: 24,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 16px 40px rgba(245,166,35,0.3)',
              position: 'relative', zIndex: 1
            }}>
              <iconify-icon icon="lucide:wallet" width="36" height="36" style={{ color: 'var(--navy)' }}></iconify-icon>
            </div>
          </div>

          {/* Hero text */}
          <h1 className="text-display animate-fade-in-up animate-delay-1" style={{ marginBottom: 16 }}>
            Your wallet <br />
            <span className="text-gold gold-glow">is your bank</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-2" style={{
            color: 'var(--text-secondary)', fontSize: 18,
            lineHeight: 1.6, maxWidth: 280
          }}>
            Access borderless credit instantly using your digital reputation.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-in-up animate-delay-3" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16, padding: '32px 0',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          {[
            { icon: 'lucide:ban', text: 'No bank required' },
            { icon: 'lucide:shield-check', text: 'Data stays yours' },
            { icon: 'lucide:zap', text: 'Loans in 60s' },
          ].map((item) => (
            <div key={item.text} className="flex flex-col items-center text-center gap-2">
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <iconify-icon icon={item.icon} width="18" height="18" style={{ color: 'var(--gold)' }}></iconify-icon>
              </div>
              <span className="text-micro" style={{ color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="screen__footer animate-fade-in-up animate-delay-4">
        <div className="flex flex-col gap-4">
          <Link to="/wallet" className="btn-primary" id="connect-wallet-btn">
            <span style={{ fontWeight: 700, fontSize: 18 }}>Connect Wallet</span>
            <div className="flex items-center" style={{ marginLeft: 4, gap: 0 }}>
              <iconify-icon icon="logos:metamask-icon" width="20" height="20"></iconify-icon>
              <iconify-icon icon="logos:walletconnect" width="16" height="16" style={{
                background: 'white', borderRadius: '50%', padding: 2,
                marginLeft: -4
              }}></iconify-icon>
            </div>
          </Link>
          <p className="text-center" style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>
            New to DeFi?{' '}
            <Link to="#" id="learn-more-link" style={{
              color: 'var(--text-primary)',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: 2
            }}>
              Learn how it works
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
