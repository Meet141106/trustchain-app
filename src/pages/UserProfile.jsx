import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useTrustToken } from '../hooks/useTrustToken';
import { useLendingPool } from '../hooks/useLendingPool';
import { useReputationNFT } from '../hooks/useReputationNFT';
import { useNotifications } from '../context/NotificationContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const TIERS = [
  { label: 'Bronze',   min: 0,   max: 39,  color: '#CD7F32', bg: 'rgba(205,127,50,0.12)',  icon: '🥉', limit: 50  },
  { label: 'Silver',   min: 40,  max: 69,  color: '#C0C0C0', bg: 'rgba(192,192,192,0.12)', icon: '🥈', limit: 200 },
  { label: 'Gold',     min: 70,  max: 89,  color: '#D4AF37', bg: 'rgba(212,175,55,0.12)',  icon: '🥇', limit: 500 },
  { label: 'Platinum', min: 90,  max: 100, color: '#2DD4BF', bg: 'rgba(45,212,191,0.12)',  icon: '💎', limit: 1000 },
];

const LANGUAGES = [
  { code: 'en', label: 'English',  native: 'English' },
  { code: 'hi', label: 'Hindi',    native: 'हिंदी'   },
  { code: 'mr', label: 'Marathi',  native: 'मराठी'  },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
];

export default function UserProfile() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { walletAddress, isConnected, chainId, disconnectWallet, trustBalance } = useWallet();
  const { maticBalance } = useTrustToken();
  const { borrowLimit, userLoan, pendingRequest, poolStats } = useLendingPool();
  const { trustScore } = useReputationNFT();
  const { notifications } = useNotifications();

  const rawScore = Number(trustScore);
  const tier = TIERS.find(t => rawScore >= t.min && rawScore <= t.max) || TIERS[0];
  const pct = (rawScore / 100) * 100;

  const [copied, setCopied] = useState(false);
  const copyAddr = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const changeLanguage = (code) => {
      i18n.changeLanguage(code);
  };

  return (
    <AppShell pageTitle="Personal Node" pageSubtitle="Protocol Preferences & Identity">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT: Identity & Status */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Profile Hero */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-3xl pointer-events-none -mr-20 -mt-20"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-[40px] bg-gradient-to-br from-[#1E2A3A] to-[#0A0F1E] border-2 border-[#1E2A3A] flex items-center justify-center text-7xl shadow-2xl relative">
                                {tier.icon}
                                <div className="absolute -bottom-4 animate-bounce">
                                    <span className="px-5 py-1.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest shadow-xl">
                                        {tier.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-3">Protocol Identity</p>
                            <h2 className="text-4xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter mb-6">
                                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Guest Node'}
                            </h2>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                                <button onClick={copyAddr} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-[#8C8C8C] hover:text-[#FAFAF8] transition-all flex items-center gap-2">
                                    <iconify-icon icon={copied ? 'lucide:check' : 'lucide:copy'}></iconify-icon>
                                    {copied ? 'Copied' : 'Copy Address'}
                                </button>
                                <div className="px-5 py-2.5 rounded-xl bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#1D9E75] text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">
                                    <iconify-icon icon="lucide:shield-check"></iconify-icon>
                                    Identity Verified
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-black/20 rounded-2xl border border-white/5">
                                    <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">TRUST Balance</p>
                                    <p className="text-xl font-black font-cabinet text-[#F5A623]">{trustBalance} <span className="text-[10px] opacity-60">TRUST</span></p>
                                </div>
                                <div className="p-5 bg-black/20 rounded-2xl border border-white/5">
                                    <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">MATIC Balance</p>
                                    <p className="text-xl font-black font-cabinet text-[#1D9E75]">{maticBalance} <span className="text-[10px] opacity-60">MATIC</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Trust Score Progress */}
                <div className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-12">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h4 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-2">Social Credit Score</h4>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-black font-cabinet text-[#FAFAF8]">{rawScore}</span>
                                <span className="text-xl font-black text-[#8C8C8C]">/ 100</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Tier Privilege</p>
                            <p className="text-sm font-black text-[#D4AF37] uppercase tracking-[0.1em]">Max Drawdown: ${tier.limit} TRUST</p>
                        </div>
                    </div>

                    <div className="relative h-4 bg-[#1E2A3A] rounded-full overflow-hidden mb-6">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] shadow-[0_0_20px_rgba(212,175,55,0.4)]"></motion.div>
                    </div>

                    <div className="flex justify-between px-2">
                        {TIERS.map(t => (
                            <div key={t.label} className="text-center">
                                <p className={`text-[9px] font-black uppercase tracking-widest ${rawScore >= t.min ? 'text-[#D4AF37]' : 'text-[#8C8C8C]'}`}>{t.label}</p>
                                <p className="text-[8px] text-[#555] mt-1">{t.min}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active States */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`p-10 rounded-[32px] border ${userLoan ? 'bg-[#1D9E75]/5 border-[#1D9E75]/20' : 'bg-[#111827] border-[#1E2A3A]'}`}>
                        <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-8">Active Loan Payload</h5>
                        {userLoan ? (
                            <div className="space-y-6">
                                <p className="text-3xl font-black font-cabinet text-[#FAFAF8]">{userLoan.amount} TRUST</p>
                                <button onClick={() => navigate('/loan/active')} className="w-full py-4 bg-[#1D9E75] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all">View Active Lifecycle</button>
                            </div>
                        ) : (
                            <div className="py-6 flex flex-col items-center text-center opacity-40">
                                <iconify-icon icon="lucide:archive" className="text-4xl mb-4"></iconify-icon>
                                <p className="text-[10px] font-black uppercase tracking-widest">No Active Obligations</p>
                            </div>
                        )}
                    </div>
                    <div className={`p-10 rounded-[32px] border ${pendingRequest ? 'bg-[#F5A623]/5 border-[#F5A623]/20' : 'bg-[#111827] border-[#1E2A3A]'}`}>
                        <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-8">Marketplace Listing</h5>
                        {pendingRequest ? (
                            <div className="space-y-6">
                                <p className="text-3xl font-black font-cabinet text-[#FAFAF8]">{pendingRequest.amount} TRUST</p>
                                <button onClick={() => navigate('/request-pending')} className="w-full py-4 bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all">Monitor Listing</button>
                            </div>
                        ) : (
                            <div className="py-6 flex flex-col items-center text-center opacity-40">
                                <iconify-icon icon="lucide:search" className="text-4xl mb-4"></iconify-icon>
                                <p className="text-[10px] font-black uppercase tracking-widest">No Pending Requests</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT: Preferences & Logs */}
            <div className="space-y-12">
                
                {/* Theme & Language Card */}
                <div className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-10 space-y-10">
                    <div>
                        <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Interface Core</h5>
                        
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <p className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-widest">Appearance</p>
                                <p className="text-[10px] text-[#8C8C8C] mt-1">{isDarkMode ? 'Aether Dark' : 'Aether Light'}</p>
                            </div>
                            <button onClick={toggleTheme} className="w-14 h-8 rounded-full bg-[#1E2A3A] relative p-1 group">
                                <div className={`w-6 h-6 rounded-full transition-all duration-500 shadow-xl flex items-center justify-center ${isDarkMode ? 'translate-x-6 bg-[#F5A623]' : 'translate-x-0 bg-white'}`}>
                                    <iconify-icon icon={isDarkMode ? 'lucide:moon' : 'lucide:sun'} className="text-[10px] text-black"></iconify-icon>
                                </div>
                            </button>
                        </div>

                        <div>
                            <p className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-widest mb-4">Localization</p>
                            <div className="grid grid-cols-2 gap-3">
                                {LANGUAGES.map(l => (
                                    <button 
                                        key={l.code} 
                                        onClick={() => changeLanguage(l.code)}
                                        className={`px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${i18n.language === l.code ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#F5A623]' : 'border-white/5 bg-white/5 text-[#8C8C8C] hover:border-white/20'}`}>
                                        {l.native}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Account Security</h5>
                        <button onClick={() => { disconnectWallet(); navigate('/connect'); }} className="w-full py-4 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-[#EF4444]/10 transition-all flex items-center justify-center gap-3">
                            <iconify-icon icon="lucide:log-out"></iconify-icon>
                            Disconnect Node
                        </button>
                    </div>
                </div>

                {/* Notifications Log */}
                <div className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] p-10">
                    <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-8 flex justify-between items-center">
                        Recent Activity
                        <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse"></span>
                    </h5>
                    <div className="space-y-6">
                        {notifications.length === 0 ? (
                            <p className="text-[10px] text-[#555] uppercase tracking-widest text-center py-10">No recent logs</p>
                        ) : (
                            notifications.slice(0, 4).map(n => (
                                <div key={n.id} className="group cursor-pointer">
                                    <div className="flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0"></div>
                                        <div>
                                            <p className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-tighter group-hover:text-[#F5A623] transition-colors">{n.title}</p>
                                            <p className="text-[10px] text-[#8C8C8C] leading-snug mt-1">{n.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <button onClick={() => navigate('/ledger')} className="w-full mt-10 py-4 border-t border-white/5 text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] hover:text-[#FAFAF8] transition-all">View Full Ledger logs</button>
                </div>

                {/* Protocol Health */}
                <div className="bg-gradient-to-br from-[#1D9E75]/10 to-transparent border border-[#1D9E75]/20 rounded-[32px] p-10 text-center">
                    <iconify-icon icon="lucide:activity" className="text-4xl text-[#1D9E75] mb-6"></iconify-icon>
                    <h6 className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-widest mb-2">Protocol Health</h6>
                    <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest">Optimized for P2P Exchange</p>
                </div>
            </div>
        </div>

      </div>
    </AppShell>
  );
}
