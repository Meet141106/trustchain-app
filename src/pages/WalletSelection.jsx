import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function WalletSelection() {
  return (
    <div className="screen">
      <div className="blur-blob" style={{ top: -80, left: -80 }} />
      <div className="blur-blob" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.5 }} />
      <div className="blur-blob" style={{ bottom: 80, right: -80, opacity: 0.3 }} />

      <Header backTo="/" backLabel="Back" />

      <main className="screen__body screen__body--no-tab" style={{ padding: '24px 32px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 className="text-h1" style={{ marginBottom: 8 }}>
            Connect Your <span className="text-gold gold-glow">Wallet</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Choose your preferred method to securely connect your reputation and access liquidity.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* MetaMask */}
          <Link to="/credit" className="wallet-card" id="wallet-metamask-card">
            <div className="wallet-card__icon">
              <iconify-icon icon="logos:metamask-icon" width="28" height="28"></iconify-icon>
            </div>
            <div className="wallet-card__text">
              <div className="wallet-card__name">MetaMask</div>
              <div className="wallet-card__desc">Popular browser extension wallet</div>
            </div>
            <iconify-icon icon="lucide:chevron-right" className="wallet-card__arrow" width="18" height="18"></iconify-icon>
          </Link>

          {/* WalletConnect */}
          <Link to="/credit" className="wallet-card" id="wallet-walletconnect-card">
            <div className="wallet-card__icon">
              <iconify-icon icon="logos:walletconnect" width="24" height="24"></iconify-icon>
            </div>
            <div className="wallet-card__text">
              <div className="wallet-card__name">WalletConnect</div>
              <div className="wallet-card__desc">Connect via QR code or mobile app</div>
            </div>
            <iconify-icon icon="lucide:chevron-right" className="wallet-card__arrow" width="18" height="18"></iconify-icon>
          </Link>

          {/* Info card */}
          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box__content">
              <iconify-icon icon="lucide:info" width="20" height="20" style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}></iconify-icon>
              <p className="info-box__text">
                TrustLend only reads your transaction history to determine your creditworthiness. We never store your private keys.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="screen__footer">
        <p className="text-micro text-center" style={{ color: 'var(--text-tertiary)' }}>
          Security verified by <span style={{ color: 'var(--text-primary)' }}>OpenZeppelin</span>
        </p>
      </footer>
    </div>
  );
}
