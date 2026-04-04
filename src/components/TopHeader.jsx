import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useTrustToken } from '../hooks/useTrustToken';
import { useNotifications } from '../context/NotificationContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

export default function TopHeader({ pageTitle, pageSubtitle, toggleMobile }) {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { walletAddress, isConnected, chainId, isSupported, disconnectWallet, connectWallet, switchNetwork } = useWallet();
  const { trustBalance, maticBalance, claimTestTokens, canClaim, isLoading } = useTrustToken();
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const title = pageTitle || t('common.dashboard');
  const subtitle = pageSubtitle || t('dashboard.overview');

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const shortAddr = walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : '';
  const showClaimBtn = isConnected && parseFloat(trustBalance) < 100;

  return (
    <header className={`sticky top-0 z-30 transition-all duration-500 h-20 flex items-center justify-between px-5 md:px-10 border-b 
      ${isDarkMode ? 'bg-[#1A1A1A]/60 backdrop-blur-xl border-[#333]' : 'bg-white/60 backdrop-blur-xl border-[#F5F3F0]'}`}>
      
      {/* Left: menu + title */}
      <div className="flex items-center gap-4">
        <button onClick={toggleMobile} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#E8E8E8] text-[#1A1A1A] shadow-lg active:scale-90 transition-transform dark:bg-[#D4AF37] dark:text-black">
          <iconify-icon icon="lucide:menu" className="text-xl"></iconify-icon>
        </button>
        <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
          <h1 className={`text-lg md:text-2xl font-black font-cabinet tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
            {title}
          </h1>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[10px] text-[#8C8C8C] font-black uppercase tracking-[0.3em] leading-none whitespace-nowrap">
              {subtitle}
            </span>
          </div>
        </div>
      </div>
      
      {/* Right: actions */}
      <div className="flex items-center gap-2 md:gap-3">

        {/* Notifications */}
        {isConnected && (
            <div className="relative" ref={notifRef}>
                <button 
                    onClick={() => setNotifOpen(!notifOpen)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all active:scale-90 relative ${isDarkMode ? 'border-[#1E2A3A] bg-[#111827] text-[#8C8C8C] hover:text-[#FAFAF8]' : 'border-[#E8E8E8] bg-white text-[#8C8C8C] hover:text-[#1A1A1A]'}`}>
                    <iconify-icon icon="lucide:bell" className="text-xl"></iconify-icon>
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444] border-2 border-[#111827]"></span>
                    )}
                </button>

                <AnimatePresence>
                    {notifOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-[calc(100%+12px)] w-80 bg-[#111827] border border-[#1E2A3A] rounded-[24px] shadow-2xl overflow-hidden z-50">
                            <div className="p-5 border-b border-[#1E2A3A] flex justify-between items-center">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FAFAF8]">Notifications</h4>
                                {unreadCount > 0 && <span className="px-2 py-0.5 rounded bg-[#EF4444]/10 text-[#EF4444] text-[8px] font-black">{unreadCount} New</span>}
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-10 text-center text-[10px] font-black uppercase tracking-widest text-[#8C8C8C]">No notifications</div>
                                ) : (
                                    notifications.map(n => (
                                        <div 
                                            key={n.id} 
                                            className={`p-5 border-b border-[#1E2A3A] transition-all ${!n.read ? 'bg-[#F5A623]/5' : ''}`}>
                                            <div className="flex gap-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 
                                                    ${n.type === 'vouch_request' ? 'bg-[#F5A623]/10 text-[#F5A623]' : 
                                                      n.type === 'loan' ? 'bg-[#1D9E75]/10 text-[#1D9E75]' : 
                                                      n.type === 'score' ? 'bg-[#627EEA]/10 text-[#627EEA]' : 'bg-white/10 text-[#8C8C8C]'}`}>
                                                    <iconify-icon icon={
                                                        n.type === 'vouch_request' ? 'lucide:user-plus' : 
                                                        n.type === 'loan' ? 'lucide:landmark' : 
                                                        n.type === 'score' ? 'lucide:award' : 'lucide:bell'
                                                    }></iconify-icon>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <p className="text-[11px] font-black text-[#FAFAF8] leading-tight uppercase tracking-widest">{n.title}</p>
                                                        <button onClick={() => markAsRead(n.id)} className="text-[10px] text-[#8C8C8C] hover:text-[#FAFAF8]">
                                                            <iconify-icon icon="lucide:check"></iconify-icon>
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] text-[#8C8C8C] leading-snug mb-3">{n.message}</p>
                                                    
                                                    {n.type === 'vouch_request' && (
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); navigate('/network'); setNotifOpen(false); }}
                                                                className="flex-1 py-2 bg-[#1D9E75] text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all">
                                                                Review Request
                                                            </button>
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                                                                className="flex-1 py-2 border border-[#1E2A3A] text-[#8C8C8C] text-[9px] font-black uppercase tracking-widest rounded-lg hover:border-[#EF4444] hover:text-[#EF4444] transition-all">
                                                                Refuse
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <button onClick={() => { navigate('/profile'); setNotifOpen(false); }} className="w-full py-4 text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] hover:text-[#FAFAF8] hover:bg-white/5 transition-all">View All Activity</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}

        {/* Claim TRUST button */}
        {showClaimBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            onClick={claimTestTokens} disabled={isLoading || !canClaim}
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${canClaim && !isLoading ? 'border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/10 active:scale-95' : 'border-[#1E2A3A] text-[#8C8C8C] cursor-not-allowed opacity-50'}`}
          >
            {isLoading
              ? <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="45 20" strokeLinecap="round" /></svg>
              : <span>🪙</span>
            }
            <span className="hidden lg:inline">Claim TRUST</span>
          </motion.button>
        )}

        {/* Wallet dropdown */}
        {isConnected ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-[#111827] border-[#1E2A3A] hover:border-[#F5A623]/40' : 'bg-white border-[#E8E8E8] hover:border-[#D4AF37]/60'} active:scale-95`}
            >
              {chainId === 31337 && (
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] text-[8px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse inline-block" /> Local
                </span>
              )}
              {chainId === 80002 && (
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 text-[#2DD4BF] text-[8px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse inline-block" /> Amoy
                </span>
              )}
              {!isSupported && (
                <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[8px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse inline-block" /> Wrong Net
                </span>
              )}
              <span className="font-mono text-[11px] font-bold text-[#FAFAF8]">{shortAddr}</span>
              <iconify-icon icon="lucide:chevron-down" className={`text-xs text-[#8C8C8C] transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}></iconify-icon>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.15 }}
                  className="absolute right-0 top-[calc(100%+8px)] w-64 bg-[#111827] border border-[#1E2A3A] rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-[#1E2A3A]">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1">Connected Wallet</p>
                    <p className="font-mono text-[11px] text-[#FAFAF8] font-bold break-all">{walletAddress}</p>
                    <div className="flex gap-3 mt-2 text-[10px] font-bold text-[#8C8C8C]">
                      <span>{trustBalance} <span className="text-[#F5A623]">TRUST</span></span>
                      <span className="w-px h-3 bg-[#1E2A3A] self-center" />
                      <span>{maticBalance} <span className="text-[#1D9E75]">MATIC</span></span>
                    </div>
                  </div>
                  <div className="p-3 flex gap-2">
                    <button onClick={() => { navigate('/profile'); setMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[#D4AF37] text-[11px] font-black uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-all">
                      <iconify-icon icon="lucide:user" className="text-base"></iconify-icon>
                      Profile
                    </button>
                    <button onClick={() => { disconnectWallet(); setMenuOpen(false); }} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[#EF4444] text-[11px] font-black uppercase tracking-widest hover:bg-[#EF4444]/10 transition-all">
                      <iconify-icon icon="lucide:log-out" className="text-base"></iconify-icon>
                      Disconnect
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button onClick={connectWallet} className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-black text-[10px] tracking-wide uppercase active:scale-95 group">
            <iconify-icon icon="lucide:wallet" className="text-lg group-hover:scale-110 transition-transform"></iconify-icon>
            <span className="hidden sm:inline">Connect</span>
          </button>
        )}

        <button
          onClick={() => navigate('/profile')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all active:scale-90 ${isDarkMode ? 'border-[#1E2A3A] bg-[#111827] hover:border-[#D4AF37]/50 text-[#8C8C8C] hover:text-[#D4AF37]' : 'border-[#E8E8E8] bg-white hover:border-[#D4AF37]/50 text-[#8C8C8C] hover:text-[#D4AF37]'}`}
        >
          <iconify-icon icon="lucide:user-circle-2" className="text-xl"></iconify-icon>
        </button>
      </div>
    </header>
  );
}
