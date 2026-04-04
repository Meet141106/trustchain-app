import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isDarkMode } = useTheme();

  const isActive = (path) => currentPath === path;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 transform 
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:relative lg:translate-x-0 
      w-80 border-r transition-all duration-500 ease-in-out
      flex flex-col h-screen
      ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8]'}
    `}>
      <div className="p-10 pb-16 flex justify-between items-center group">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1.2rem] bg-[#1A1A1A] flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500 dark:bg-[#D4AF37]">
            <iconify-icon icon="lucide:shield-check" className={`text-2xl animate-pulse ${isDarkMode ? 'text-black' : 'text-[#D4AF37]'}`}></iconify-icon>
          </div>
          <div>
            <span className={`text-xl font-black tracking-tighter font-cabinet block leading-none ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
              TRUSTLEND
            </span>
            <span className="text-[9px] font-black tracking-[0.3em] text-[#D4AF37] uppercase leading-none mt-1 block">
              DECENTRALIZED CREDIT
            </span>
          </div>
        </div>
        <button className={`lg:hidden text-2xl hover:rotate-90 transition-transform ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`} onClick={() => setMobileOpen(false)}>
          <iconify-icon icon="lucide:x"></iconify-icon>
        </button>
      </div>
      
      <nav className="flex-1 px-8 space-y-4 overflow-y-auto hide-scrollbar">
        <div className="mb-10">
          <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-6 ml-2">Main Terminal</p>
          <div className="space-y-3">
            {[
              { to: '/dashboard', label: 'Solvent Terminal', icon: 'lucide:layout-grid' },
              { to: '/borrow', label: 'Credit Drawdown', icon: 'lucide:landmark' },
              { to: '/marketplace', label: 'Liquidity Archway', icon: 'lucide:shopping-bag' }
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all group ${
                  isActive(link.to) 
                    ? (isDarkMode ? 'bg-[#D4AF37] text-black luxury-shadow scale-[1.02]' : 'bg-[#1A1A1A] text-white luxury-shadow scale-[1.02]')
                    : `text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-[#FAFAF8] ${isDarkMode ? 'hover:text-white hover:bg-[#333]' : ''}`
                }`}
              >
                <iconify-icon icon={link.icon} className={`text-xl ${isActive(link.to) ? (isDarkMode ? 'text-black' : 'text-[#D4AF37]') : 'group-hover:text-[#1A1A1A] dark:group-hover:text-white'}`}></iconify-icon>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-6 ml-2">Capital Operations</p>
          <div className="space-y-3">
            {[
              { to: '/loan/1', label: 'Active Lifecycle', icon: 'lucide:activity' },
              { to: '/portfolio', label: 'Liquidity Inventory', icon: 'lucide:briefcase' },
              { to: '/ledger', label: 'Ledger of Trust', icon: 'lucide:scroll' }
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all group ${
                  isActive(link.to) 
                    ? (isDarkMode ? 'bg-[#D4AF37] text-black luxury-shadow scale-[1.02]' : 'bg-[#1A1A1A] text-white luxury-shadow scale-[1.02]')
                    : `text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-[#FAFAF8] ${isDarkMode ? 'hover:text-white hover:bg-[#333]' : ''}`
                }`}
              >
                <iconify-icon icon={link.icon} className={`text-xl ${isActive(link.to) ? (isDarkMode ? 'text-black' : 'text-[#D4AF37]') : 'group-hover:text-[#1A1A1A] dark:group-hover:text-white'}`}></iconify-icon>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pb-10">
          <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-6 ml-2">Sovereign Identity</p>
          <div className="space-y-3">
            {[
              { to: '/audit', label: 'Sovereign Audit', icon: 'lucide:shield-check' },
              { to: '/reputation', label: 'Reputation Synthesis', icon: 'lucide:award' },
              { to: '/network', label: 'Topology Graph', icon: 'lucide:network' }
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-5 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all group ${
                  isActive(link.to) 
                    ? (isDarkMode ? 'bg-[#D4AF37] text-black luxury-shadow scale-[1.02]' : 'bg-[#1A1A1A] text-white luxury-shadow scale-[1.02]')
                    : `text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-[#FAFAF8] ${isDarkMode ? 'hover:text-white hover:bg-[#333]' : ''}`
                }`}
              >
                <iconify-icon icon={link.icon} className={`text-xl ${isActive(link.to) ? (isDarkMode ? 'text-black' : 'text-[#D4AF37]') : 'group-hover:text-[#1A1A1A] dark:group-hover:text-white'}`}></iconify-icon>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      <div className={`p-8 lg:p-10 border-t ${isDarkMode ? 'border-[#333]' : 'border-[#F5F3F0]'}`}>
        <div className="p-8 rounded-[2.5rem] bg-[#1A1A1A] border border-[#D4AF37]/20 text-center relative overflow-hidden group/footer dark:bg-black">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[40px] group-hover/footer:scale-150 duration-700"></div>
          <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-3">Sovereign Tier</p>
          <h4 className="text-xl font-black font-cabinet tracking-tight text-white">
            NOIR ELITE
          </h4>
        </div>
      </div>
    </aside>
  );
}
