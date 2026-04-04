import Header from './Header';
import BottomNav from './BottomNav';

export default function AppShell({ children, showNav = true, backTo, backLabel }) {
  return (
    <div className="screen">
      {/* Decorative blobs */}
      <div className="blur-blob" style={{ top: -80, left: -80 }} />
      <div className="blur-blob" style={{ bottom: 160, right: -80 }} />

      <Header backTo={backTo} backLabel={backLabel} />

      <main className={`screen__body ${!showNav ? 'screen__body--no-tab' : ''}`}>
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
}
