import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import { useTranslation } from 'react-i18next';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { getRecentActivity } from '../lib/supabase';

export default function Marketplace() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { walletAddress: address } = useWallet();
  const navigate = useNavigate();

  const { poolStats, lenderBalance, deposit, isLoading } = useLendingPool();

  const [depositAmount, setDepositAmount] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentLoans, setRecentLoans] = useState([]);

  React.useEffect(() => {
    getRecentActivity().then(setRecentLoans).catch(console.error);
  }, []);

  const handleDeposit = async () => {
    if (!address) {
      toast.error("Please connect your wallet first.");
      return;
    }
    if (depositAmount <= 0) {
      toast.error("Deposit amount must be greater than 0.");
      return;
    }

    setIsSubmitting(true);
    try {
      await deposit(depositAmount);
        toast.success("Capital successfully supplied to TrustLend Core Pool!");
    } catch (err) {
      console.error(err);
      toast.error("Deposit transaction failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell pageTitle={t('marketplace.title')} pageSubtitle={t('marketplace.subtitle')}>
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Marketplace Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
            { l: t('marketplace.totalLiquidity'),   v: isLoading ? '...' : `$${Number(poolStats?.liquidity || 0).toLocaleString()}`, c: '#1D9E75' },
            { l: t('marketplace.activeLoans'),      v: isLoading ? '...' : poolStats?.activeLoans || 0, c: '#F5A623' },
            { l: t('marketplace.lenderCount'),      v: isLoading ? '...' : poolStats?.lenderCount || 0, c: '#FAFAF8' },
            { l: t('marketplace.averageReturn'),    v: isLoading ? '...' : `${Number(poolStats?.avgInterestRate || 0)}%`, c: '#1D9E75' },
            ].map((m, i) => (
            <div key={i} className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-[#E8E8E8] dark:border-[#1E2A3A]">
                <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">{m.l}</p>
                <p className={`text-2xl font-black font-cabinet`} style={{ color: m.c }}>{m.v}</p>
            </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Card: Deposit Capital */}
          <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A] flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-black font-cabinet text-[#1A1A1A] dark:text-[#FAFAF8] mb-3 uppercase tracking-widest">{t('marketplace.provideLiquidityTitle')}</h3>
            <p className="text-xs text-[#8C8C8C] leading-relaxed mb-8">{t('marketplace.provideLiquidityDesc')}</p>
            
            <div className="space-y-8 flex-1">
              <div className="p-6 rounded-xl bg-[#FAFAF8] dark:bg-[#0A0F1E] border border-[#E8E8E8] dark:border-[#1E2A3A]">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-widest">Supply Amount</p>
                  <p className="text-3xl font-black text-[#1D9E75] font-cabinet">${depositAmount.toFixed(2)}</p>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="10000"
                  step="50" 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full accent-[#1D9E75]" 
                />
              </div>

              <div className="flex justify-between items-end border-t border-[#E8E8E8] dark:border-[#1E2A3A] pt-6">
                 <div>
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Expected APY</p>
                    <p className="text-xl font-black text-[#1D9E75] font-cabinet">
                        {isLoading ? '...' : `${Number(poolStats?.avgInterestRate || 0)}%`} Variate
                    </p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Risk Profile</p>
                    <p className="text-sm font-black text-[#1D9E75] uppercase tracking-widest">Algorithmic Base</p>
                 </div>
              </div>
            </div>

            <button 
                onClick={handleDeposit}
                disabled={isSubmitting || isLoading || !address}
                className={`w-full mt-10 py-5 rounded-[8px] text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98]
                    ${(isSubmitting || isLoading || !address)
                        ? 'bg-[#1E2A3A] text-[#8C8C8C] cursor-not-allowed'
                        : 'bg-[#1D9E75] text-[#111827] hover:bg-opacity-90 shadow-[0_0_20px_rgba(29,158,117,0.2)]'
                    }`}>
              {isSubmitting ? t('marketplace.supplying') : t('marketplace.supplyCapital')}
            </button>
          </div>

          {/* Card: Your active portfolio  */}
          <div className="bg-[#1D9E75]/5 p-10 rounded-[12px] border border-[#1D9E75]/10 flex flex-col justify-center items-center text-center">
            <iconify-icon icon="lucide:vault" className="text-5xl text-[#1D9E75] mb-6"></iconify-icon>
            <h4 className="text-lg font-black text-[#1A1A1A] dark:text-[#FAFAF8] font-cabinet mb-2">My Deployed Position</h4>
            
            {isLoading ? <Skeleton h="40px" /> : (
                <div className="mb-8">
                   <p className="text-[11px] text-[#8C8C8C] max-w-sm mb-2 uppercase tracking-widest">Active Balance in Core Pool</p>
                   <p className="text-4xl font-cabinet font-black text-[#1A1A1A] dark:text-[#FAFAF8]">${Number(lenderBalance).toLocaleString()}</p>
                </div>
            )}
            
            <button
                onClick={() => navigate('/portfolio')}
                className="px-10 py-4 bg-[#1D9E75] text-black text-[10px] font-black uppercase tracking-widest rounded-[8px] hover:scale-105 transition-all">
                Manage Portfolio
            </button>
          </div>
        </div>

        {/* Live Platform Activity Feed */}
        <div className="bg-white dark:bg-[#111827] p-10 rounded-[12px] border border-[#E8E8E8] dark:border-[#1E2A3A]">
           <div className="flex justify-between items-center mb-10">
              <h4 className="text-lg font-black font-cabinet tracking-tight text-[#1A1A1A] dark:text-[#FAFAF8] uppercase tracking-widest">Live Platform Activity</h4>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse"></div>
                 <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Real-time Feed</span>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-[#E8E8E8] dark:border-[#1E2A3A]">
                       <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Borrower</th>
                       <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Amount</th>
                       <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Tier</th>
                       <th className="pb-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Status</th>
                       <th className="pb-4 text-right text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em]">Execution</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#E8E8E8] dark:divide-[#1E2A3A]">
                    {recentLoans.length === 0 ? (
                       <tr>
                          <td colSpan="5" className="py-10 text-center text-xs text-[#8C8C8C]">No recent activity detected.</td>
                       </tr>
                    ) : recentLoans.map((loan, idx) => (
                       <tr key={loan.id} className="group hover:bg-[#FAFAF8] dark:hover:bg-[#FAFAF8]/5 transition-colors">
                          <td className="py-5">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1E2A3A] border border-[#F5A623]/20 flex items-center justify-center text-[10px] font-black text-[#F5A623]">
                                   {loan.users?.display_name?.charAt(0) || loan.wallet_address.slice(2,4).toUpperCase()}
                                </div>
                                <div>
                                   <p className="text-[11px] font-black text-[#FAFAF8]">{loan.users?.display_name || 'Anonymous'}</p>
                                   <p className="text-[9px] text-[#8C8C8C] font-mono">{loan.wallet_address.slice(0, 6)}...{loan.wallet_address.slice(-4)}</p>
                                </div>
                             </div>
                          </td>
                          <td className="py-5 text-xs font-black text-[#FAFAF8]">${Number(loan.amount).toLocaleString()} TRUST</td>
                          <td className="py-5">
                             <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-[#1E2A3A] text-[#F5A623]">
                                {loan.users?.tier || 'Entry'}
                             </span>
                          </td>
                          <td className="py-5">
                             <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${loan.loan_status === 'active' ? 'bg-[#1D9E75]' : 'bg-[#F5A623]'}`}></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#FAFAF8]">{loan.loan_status}</span>
                             </div>
                          </td>
                          <td className="py-5 text-right">
                             <a href={`https://amoy.polygonscan.com/tx/${loan.tx_hash}`} target="_blank" rel="noreferrer" 
                                className="text-[9px] font-black text-[#8C8C8C] hover:text-[#F5A623] transition-colors flex items-center justify-end gap-1 uppercase tracking-widest">
                                View TX <iconify-icon icon="lucide:external-link" className="text-[10px]"></iconify-icon>
                             </a>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
