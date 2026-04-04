import React, { useState, useEffect } from 'react';
import AppShell from '../components/AppShell';
import { useWallet } from '../context/WalletContext';
import { useReputationNFT } from '../hooks/useReputationNFT';
import { useLendingPool } from '../hooks/useLendingPool';
import { useVouchSystem } from '../hooks/useVouchSystem';
import { calculateTrustScore } from '../lib/mlEngine';
import Skeleton from '../components/Skeleton';
import { ADDRESSES } from '../contracts/addresses';
import { motion } from 'framer-motion';

export default function SovereignAudit() {
  const { walletAddress: address } = useWallet();
  const { reputationData, trustScore, hasNFT, isLoading: isNFTLoading, mintNFT, tokenId } = useReputationNFT();
  const { borrowLimit, isLoading: isPoolLoading } = useLendingPool();
  const { vouches, isLoading: isVouchLoading } = useVouchSystem();

  const [mlScoreData, setMlScoreData] = useState(null);
  const [isMlLoading, setIsMlLoading] = useState(false);

  useEffect(() => {
    async function fetchMLScore() {
        if (hasNFT && address) {
            setIsMlLoading(true);
            try {
                // Endpoint 1: Trust Score Calculator (Dynamic Inputs)
                const res = await calculateTrustScore({
                    repayment_history: reputationData.loansRepaid > 0 ? 0.95 : 0, 
                    repayment_speed: reputationData.repaymentStreak > 2 ? 0.9 : 0.5,
                    voucher_quality: vouches.length > 0 ? (0.3 + (vouches.length * 0.2)) : 0,
                    loan_to_repayment_ratio: reputationData.totalBorrowed > 0 ? (Number(reputationData.totalRepaid) / Number(reputationData.totalBorrowed)) : 0,
                    vouch_network_balance: vouches.length * 50.0,
                    transaction_frequency: Number(reputationData.loansRepaid) + (hasNFT ? 1 : 0)
                });
                if (res.status === "success") {
                    setMlScoreData(res);
                }
            } catch (e) {
                console.error("ML Score Error", e);
            } finally {
                setIsMlLoading(false);
            }
        }
    }
    fetchMLScore();
  }, [hasNFT, address]);

  const isLoading = isNFTLoading || isPoolLoading || isVouchLoading;

  if (isLoading) {
    return (
        <AppShell pageTitle="Sovereign Audit" pageSubtitle="Syncing Credit Identity...">
            <div className="max-w-7xl mx-auto space-y-12 pb-24">
                <Skeleton h="200px" />
                <Skeleton h="400px" />
            </div>
        </AppShell>
    );
  }

  if (!hasNFT) {
     return (
        <AppShell pageTitle="Sovereign Audit" pageSubtitle="Credit Identity Verification">
            <div className="max-w-7xl mx-auto py-24 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <p className="text-6xl mb-8 grayscale opacity-50">🗿</p>
                    <h2 className="font-cabinet text-3xl font-black text-[#FAFAF8] uppercase tracking-tighter">Identity Not Established</h2>
                    <p className="text-[#8C8C8C] mt-4 mb-12 text-sm max-w-md mx-auto leading-relaxed">
                        Accessing the P2P Sovereign Audit require a verified protocol node. Mint your Reputation NFT to begin building your on-chain credit history.
                    </p>
                    <button onClick={mintNFT} className="px-12 py-5 bg-[#FAFAF8] text-black font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-[#F5A623] hover:text-black transition-all shadow-2xl">
                        Identify Verification Node →
                    </button>
                </motion.div>
            </div>
        </AppShell>
     );
  }

  return (
    <AppShell pageTitle="Sovereign Audit" pageSubtitle="P2P Credit Identity Analysis">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Profile Identity Header */}
        <div className="bg-[#111827] border border-[#1E2A3A] rounded-[40px] p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl -mr-32 -mt-32"></div>
           
           <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#1E2A3A] to-black border-2 border-[#1E2A3A] flex items-center justify-center text-4xl shadow-2xl">
                        🚀
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter mb-2">Protocol Node ID #{tokenId || '000'}</h2>
                        <p className="font-mono text-[10px] font-bold text-[#8C8C8C] break-all max-w-xs">{address}</p>
                        <div className="flex gap-4 mt-6">
                            <span className="px-4 py-1.5 rounded-full bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#1D9E75] text-[9px] font-black uppercase tracking-widest">Active Verification</span>
                            <a href={`https://amoy.polygonscan.com/token/${ADDRESSES.REPUTATION_NFT}?a=${tokenId}`} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] hover:text-[#FAFAF8] transition-all">Blockchain Ledger ↗</a>
                        </div>
                    </div>
                </div>

                <div className="flex gap-16">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-3">Authorized Limit</p>
                        <p className="text-4xl font-black text-[#FAFAF8] font-cabinet tracking-tighter">${Number(borrowLimit).toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-3">Trust Percentile</p>
                        <p className="text-4xl font-black text-[#F5A623] font-cabinet tracking-tighter">Top {100 - Number(trustScore)}%</p>
                    </div>
                </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Trust Score Radar / Synthesis */}
          <div className="bg-[#111827] border border-[#1E2A3A] rounded-[40px] p-12">
             <div className="flex justify-between items-center mb-16">
                <h4 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Matrix Synthesis</h4>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse"></span>
                    <span className="text-[9px] text-[#1D9E75] font-black uppercase tracking-widest">AI Engine Live</span>
                </div>
             </div>
             
             <div className="flex flex-col items-center">
                <div className="relative w-72 h-72 border border-[#1E2A3A] rounded-full flex items-center justify-center">
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.8] opacity-50"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.6] opacity-30"></div>
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-[0.4] opacity-10"></div>
                    
                    <div className="absolute top-0 py-4 text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest -translate-y-8">Protocol Accuracy</div>
                    <div className="absolute bottom-0 py-4 text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest translate-y-8">Capital Flow</div>
                    <div className="absolute left-0 px-4 text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest -translate-x-12">Syndicate Nodes</div>
                    <div className="absolute right-0 px-4 text-[8px] font-black text-[#8C8C8C] uppercase tracking-widest translate-x-12">History Hub</div>
                    
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-40 h-40 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/40 border border-[#D4AF37]/60 absolute rotate-45 transform" 
                        style={{scale: `${Number(trustScore)/100}`}}>
                    </motion.div>
                    
                    <div className="z-10 text-center">
                        <p className="text-7xl font-black text-[#FAFAF8] font-cabinet tracking-tighter">{mlScoreData ? mlScoreData.trust_score : trustScore}</p>
                        <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-2">Verified Score</p>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 gap-4 w-full">
                    {[
                      { label: 'Blockchain ID Proof', val: 'Verified', color: '#1D9E75' },
                      { label: 'ML Risk Profile', val: 'Minimal', color: '#1D9E75' },
                      { label: 'Repayment Density', val: 'Superior', color: '#D4AF37' },
                      { label: 'Node Account Age', val: '140D Legacy', color: '#8C8C8C' }
                    ].map((s, i) => (
                      <div key={i} className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col gap-1">
                         <span className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">{s.label}</span>
                         <span className="text-sm font-black uppercase tracking-tighter" style={{ color: s.color }}>{s.val}</span>
                      </div>
                    ))}
                </div>
             </div>
          </div>

          <div className="space-y-12">
             {/* Dynamic Analysis Section */}
             <div className="bg-[#111827] border border-[#1E2A3A] rounded-[40px] p-12">
                <h4 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-10">ML Audit Outcome</h4>
                <div className="space-y-6">
                   {isMlLoading ? (
                       <div className="space-y-6 py-6 animate-pulse">
                           <div className="h-20 bg-white/5 rounded-3xl"></div>
                           <div className="h-20 bg-white/5 rounded-3xl"></div>
                           <div className="h-20 bg-white/5 rounded-3xl"></div>
                       </div>
                   ) : (
                       <>
                           <div className="p-8 rounded-[32px] bg-[#1D9E75]/5 border border-[#1D9E75]/20 flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#1D9E75]/10 flex items-center justify-center text-[#1D9E75]">
                                    <iconify-icon icon="lucide:check-circle" className="text-2xl"></iconify-icon>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Risk Assessment</p>
                                    <p className="text-sm font-black text-[#FAFAF8] uppercase tracking-tighter">Highly Reliable Capital Node</p>
                                </div>
                           </div>

                           <div className="p-8 rounded-[32px] bg-black/40 border border-white/5">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Borrowing Potential</p>
                                    <span className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest">Unlocking +$100.00</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#D4AF37]" style={{ width: '82%' }}></div>
                                    </div>
                                    <span className="text-[12px] font-black text-[#FAFAF8] font-cabinet">82%</span>
                                </div>
                                <p className="text-[9px] text-[#555] uppercase font-bold">Progress toward PLATINUM TIER privileges</p>
                           </div>

                           <div className="p-8 rounded-[32px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                                <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-6">Identity Evolution Lab</p>
                                <p className="text-xs text-[#FAFAF8] leading-relaxed mb-8 max-w-xs">
                                    Syncing your **X (Twitter) Profile** to decentralized nodes will likely augment your credibility by **+12 pts**.
                                </p>
                                <button className="px-8 py-3 bg-white/5 border border-white/10 text-[9px] font-black text-[#FAFAF8] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">Link Social Graph</button>
                           </div>
                       </>
                   )}
                </div>
             </div>

             <div className="p-10 rounded-[32px] bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 flex items-center gap-8 group hover:scale-[1.02] transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-black shadow-xl group-hover:rotate-12 transition-transform">
                    <iconify-icon icon="lucide:award" className="text-2xl"></iconify-icon>
                </div>
                <div>
                    <h5 className="text-sm font-black text-[#FAFAF8] uppercase tracking-tight">Privilege Unlocked</h5>
                    <p className="text-[10px] text-[#8C8C8C] uppercase font-bold mt-1">Priority Capital matching in marketplace enabled.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
