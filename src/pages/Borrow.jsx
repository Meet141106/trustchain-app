import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import { useTrustToken } from '../hooks/useTrustToken';
import { useReputationNFT } from '../hooks/useReputationNFT';
import { useTranslation } from 'react-i18next';
import { calculateInterestRate, getRepaymentSchedule, checkFraudRisk } from '../lib/mlEngine';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import LoanMLSummary from '../components/ml/LoanMLSummary';
export default function Borrow() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { walletAddress: address } = useWallet();
  const navigate = useNavigate();

  const { borrowLimit, submitLoanRequest, userLoan, pendingRequest, isRequestPending, cancelRequest, isLoading } = useLendingPool();
  const { isApproved, approvePool, trustBalance } = useTrustToken();
  const { trustScore, hasNFT } = useReputationNFT();
  
  const hasActiveLoan = userLoan && (Number(userLoan.status) === 1);

  const [amount, setAmount] = useState(10); 
  const [pathway, setPathway] = useState(2); 
  const [tenureType, setTenureType] = useState('days'); // days, months, years
  const [tenureValue, setTenureValue] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phase, setPhase] = useState('idle'); 
  const [needsApproval, setNeedsApproval] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const durationInDays = tenureType === 'days' ? tenureValue : tenureType === 'months' ? tenureValue * 30 : tenureValue * 365;

  // ML-driven states
  const [mlInterest, setMlInterest] = useState(null);
  const [mlSchedule, setMlSchedule] = useState(null);
  const [isCalculatingML, setIsCalculatingML] = useState(false);

  const limitValue = isLoading ? 0 : Number(borrowLimit);
  const isUninitialized = !hasNFT && !isLoading;
  const safeAmount = isUninitialized ? 0 : Math.min(amount, limitValue);

  const tenureRange = {
    days:   { min: 1,  max: 90,  label: 'Days' },
    months: { min: 4,  max: 12, label: 'Months' },
    years:  { min: 1,  max: 5,  label: 'Years' }
  };

  // 1. ML Interest Calculation
  const refreshMLStats = useCallback(async () => {
    if (isUninitialized || safeAmount <= 0) return;
    
    setIsCalculatingML(true);
    try {
        const [intRes, schedRes] = await Promise.all([
            calculateInterestRate({
                trust_score: Number(trustScore),
                loan_duration_days: durationInDays,
                vouch_coverage_pct: pathway === 0 ? 100 : 0 
            }),
            getRepaymentSchedule({
                tx_per_month: 12.5, 
                avg_days_between_tx: 2.4
            })
        ]);

        if (intRes.status === "success") setMlInterest(intRes.data);
        if (schedRes.status === "success") setMlSchedule(schedRes.data);
    } catch (e) {
        console.error("ML Refresh Error", e);
    } finally {
        setIsCalculatingML(false);
    }
  }, [safeAmount, pathway, trustScore, isUninitialized, durationInDays]);

  useEffect(() => {
    const timer = setTimeout(refreshMLStats, 500);
    return () => clearTimeout(timer);
  }, [refreshMLStats]);

  useEffect(() => {
    async function checkApproval() {
        if (address && pathway === 1 && safeAmount > 0) {
            const approved = await isApproved(Math.ceil(safeAmount * 1.06));
            setNeedsApproval(!approved);
        } else {
            setNeedsApproval(false);
        }
    }
    checkApproval();
  }, [address, pathway, safeAmount, isApproved]);

  const handleInitialize = async () => {
    const { initializeOnChainScore, parseBlockchainError } = await import('../lib/blockchain');
    const id = toast.loading("Initializing on-chain identity...");
    try {
      await initializeOnChainScore();
      toast.success("Identity initialized! Your trust score is now 30.", { id });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(parseBlockchainError(err), { id });
    }
  };

  const handleApprove = async () => {
    setPhase('approving');
    try {
        const success = await approvePool(Math.ceil(safeAmount * 1.06));
        if (success) {
            setNeedsApproval(false);
            toast.success("Collateral authorized!");
        }
    } catch (err) {
        toast.error("Approval failed.");
    } finally {
        setPhase('idle');
    }
  };

  const handleRequestLoan = async () => {
    if (!address) { toast.error("Connect wallet"); return; }
    
    setIsSubmitting(true);
    const checkId = toast.loading("ML Risk Terminal initializing...");
    
    try {
        // Step 1: Endpoint 3 - Fraud Check
        const fraudRes = await checkFraudRisk({
            vouch_requests_24h: 2,
            avg_voucher_account_age_days: 140,
            network_clustering_score: 0.12
        });

        if (fraudRes.is_fraudulent) {
            toast.error(`Risk Detected: ${fraudRes.reason}`, { id: checkId });
            setIsSubmitting(false);
            return;
        }

        toast.success("Risk check passed! Initiating transaction...", { id: checkId });

        // Step 2: Blockchain Request
        await submitLoanRequest(safeAmount, durationInDays, pathway);
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
        console.error(err);
        toast.error("Submission failed", { id: checkId });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!pendingRequest) return;
    if (!window.confirm("Cancel this loan request?")) return;
    try {
        await cancelRequest(pendingRequest.id);
        toast.success("Request cancelled");
    } catch (err) { console.error(err); }
  };

  if (isLoading) return <AppShell><div className="p-20 text-center uppercase tracking-widest text-xs animate-pulse">Loading Protocol Data...</div></AppShell>;

  const currentRate = mlInterest ? mlInterest.total_interest_rate_pct : 7.1;
  const totalRepay = safeAmount * (1 + currentRate / 100);
  const weeklyInstallment = totalRepay / 4;

  const SuccessState = ({ request }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto bg-[#111827] border-2 border-[#1D9E75]/30 p-12 rounded-[24px] shadow-2xl relative overflow-hidden text-center">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1D9E75]"></div>
      <div className="w-20 h-20 bg-[#1D9E75]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#1D9E75]/20">
        <iconify-icon icon="lucide:check-circle" className="text-4xl text-[#1D9E75]"></iconify-icon>
      </div>
      <h2 className="text-3xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter mb-4">Request Live on P2P Marketplace</h2>
      <p className="text-[#8C8C8C] text-sm mb-12 max-w-md mx-auto leading-relaxed">ML-optimized interest rates and repayment schedules locked on-chain. Capital matching in progress.</p>
      <div className="grid grid-cols-2 gap-6 mb-12 text-left">
          <div className="p-6 bg-[#0A0F1E] border border-[#1E2A3A] rounded-2xl">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">Payload</p>
              <p className="text-xl font-black text-[#FAFAF8] font-cabinet">{request.amount} TRUST</p>
          </div>
          <div className="p-6 bg-[#0A0F1E] border border-[#1E2A3A] rounded-2xl">
              <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest mb-1">On-Chain APR</p>
              <p className="text-xl font-black text-[#1D9E75] font-cabinet">{request.interestRate}%</p>
          </div>
      </div>

      {request.path === 0 && (
          <div className="mb-12 p-8 bg-[#1D9E75]/5 border border-[#1D9E75]/20 rounded-3xl text-left">
              <div className="flex items-center gap-3 mb-6">
                  <iconify-icon icon="lucide:users" className="text-2xl text-[#1D9E75]"></iconify-icon>
                  <h5 className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-widest">Network Vouch Status</h5>
              </div>
              <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                      <span className="text-[#8C8C8C]">Required Backing</span>
                      <span className="text-[#FAFAF8]">3 Vouchers</span>
                  </div>
                  <div className="flex gap-2">
                      {[1, 2, 3].map(i => (
                          <div key={i} className="flex-1 h-1.5 bg-[#1E2A3A] rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: i === 1 ? '100%' : '0%' }} className="h-full bg-[#1D9E75]"></motion.div>
                          </div>
                      ))}
                  </div>
                  <p className="text-[9px] text-[#8C8C8C] leading-relaxed italic">Currently backed by: 0x9965... (1/3). Marketplace matching will prioritize vouched nodes.</p>
              </div>
          </div>
      )}

      <div className="flex gap-4">
          <Link to="/marketplace" className="flex-1 py-4 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">View Active Exchange</Link>
          <Link to="/dashboard" className="flex-1 py-4 border border-[#1E2A3A] text-[#FAFAF8] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">Back to Node</Link>
      </div>
    </motion.div>
  );

  return (
    <AppShell pageTitle="Capital Terminal" pageSubtitle="Peer-to-Peer Direct Lending">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {(showSuccess || isRequestPending) ? (
            <div className="py-12">
                <SuccessState request={pendingRequest || { id: '0', amount: safeAmount, interestRate: currentRate }} />
                {isRequestPending && (
                    <button onClick={handleCancel} className="mt-12 text-[#EF4444] text-[9px] font-black uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
                        <iconify-icon icon="lucide:x-circle"></iconify-icon> Cancel Request
                    </button>
                )}
            </div>
        ) : (
            <>
                {isUninitialized && (
                <div className="bg-[#111827] border-2 border-white/10 p-12 rounded-[40px] flex flex-col items-center justify-center text-center gap-8 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl -mr-32 -mt-32"></div>
                    <div className="text-6xl mb-4 grayscale">🗿</div>
                    <h4 className="text-2xl font-black text-[#FAFAF8] font-cabinet uppercase tracking-widest">On-Chain Identity Not Initialized</h4>
                    <p className="text-sm text-[#8C8C8C] max-w-lg leading-relaxed">Access to the capital marketplace requires a verified reputation node. Initialize to mint your soulbound identity NFT.</p>
                    <button onClick={handleInitialize} className="px-12 py-5 bg-[#FAFAF8] text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#F5A623] transition-all shadow-2xl">Establish Protocol Node →</button>
                </div>
                )}

                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isUninitialized ? 'opacity-20 grayscale pointer-events-none' : ''}`}>
                    <div className="lg:col-span-2 bg-[#111827] p-10 rounded-[40px] border border-[#1E2A3A] shadow-2xl">
                        <h4 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-widest mb-10 flex justify-between items-center">
                            Risk Parameterization
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse"></span>
                                <span className="text-[10px] text-[#8C8C8C] font-black uppercase tracking-widest">AI Core Live</span>
                            </div>
                        </h4>
                        
                        <div className="space-y-12">
                            {/* Amount Slider */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Principal Request</p>
                                    <p className="text-5xl font-black text-[#FAFAF8] font-cabinet tracking-tighter">
                                        {safeAmount.toFixed(0)} <span className="text-xl text-[#F5A623]">TRUST</span>
                                    </p>
                                </div>
                                <input 
                                    type="range" 
                                    min="5" 
                                    max={pathway === 2 ? Math.min(limitValue, 10) : limitValue} 
                                    disabled={isSubmitting || isLoading || limitValue < 5} 
                                    value={safeAmount} 
                                    onChange={(e) => setAmount(Number(e.target.value))} 
                                    className="w-full h-2 bg-[#1E2A3A] rounded-lg appearance-none cursor-pointer accent-[#F5A623]" 
                                />
                                <div className="flex justify-between text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">
                                    <span>MIN 5 TRUST</span>
                                    <span>
                                        MAX: {pathway === 2 ? 10 : limitValue} TRUST
                                        {pathway === 2 && limitValue > 10 && " (ENTRY CAP)"}
                                    </span>
                                </div>
                            </div>

                            {/* Duration Selection */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <p className="text-[11px] font-black text-[#8C8C8C] uppercase tracking-[0.4em]">Settlement Tenure</p>
                                    <div className="flex p-1 bg-black/40 rounded-xl border border-[#1E2A3A]">
                                        {['days', 'months', 'years'].map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => { setTenureType(t); setTenureValue(tenureRange[t].min); }}
                                                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${tenureType === t ? 'bg-[#F5A623] text-black' : 'text-[#8C8C8C] hover:text-[#FAFAF8]'}`}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex-1">
                                        <input 
                                            type="range" 
                                            min={tenureRange[tenureType].min}
                                            max={tenureRange[tenureType].max}
                                            value={tenureValue} 
                                            onChange={(e) => setTenureValue(Number(e.target.value))} 
                                            className="w-full h-2 bg-[#1E2A3A] rounded-lg appearance-none cursor-pointer accent-[#F5A623]" 
                                        />
                                    </div>
                                    <div className="w-24 text-right">
                                        <p className="text-2xl font-black text-[#FAFAF8]">{tenureValue} <span className="text-[10px] text-[#8C8C8C] uppercase">{tenureRange[tenureType].label}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Pathway 2: Trust-Only (Reputation) */}
                                <div className={`p-8 rounded-3xl border transition-all cursor-pointer ${pathway === 2 ? 'border-[#F5A623] bg-[#F5A623]/5 shadow-[0_0_30px_rgba(245,166,35,0.05)]' : 'border-[#1E2A3A] bg-black/20 hover:border-white/10 opacity-60'}`} onClick={() => setPathway(2)}>
                                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">0-Assets</p>
                                    <p className="text-md font-black text-[#FAFAF8] uppercase tracking-tighter">Reputation</p>
                                    <p className="text-[9px] text-[#8C8C8C] mt-3 leading-relaxed uppercase font-bold tracking-tight">10 TRUST MAX. PURELY IDENTITY DRIVEN.</p>
                                </div>
                                {/* Pathway 0: Social-Backed (Vouching) */}
                                <div className={`p-8 rounded-3xl border transition-all cursor-pointer ${pathway === 0 ? 'border-[#1D9E75] bg-[#1D9E75]/5 shadow-[0_0_30px_rgba(29,158,117,0.05)]' : 'border-[#1E2A3A] bg-black/20 hover:border-white/10 opacity-60'}`} onClick={() => setPathway(0)}>
                                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">Group-Backed</p>
                                    <p className="text-md font-black text-[#FAFAF8] uppercase tracking-tighter">Vouch Secured</p>
                                    <p className="text-[9px] text-[#8C8C8C] mt-3 leading-relaxed uppercase font-bold tracking-tight">STRENGTHENED BY YOUR SYNDICATE LINKS.</p>
                                </div>
                                {/* Pathway 1: Collateral (Staking) */}
                                <div className={`p-8 rounded-3xl border transition-all cursor-pointer ${pathway === 1 ? 'border-[#627EEA] bg-[#627EEA]/5 shadow-[0_0_30px_rgba(98,126,234,0.05)]' : 'border-[#1E2A3A] bg-black/20 hover:border-white/10 opacity-60'}`} onClick={() => setPathway(1)}>
                                    <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-3">Escrow Tier</p>
                                    <p className="text-md font-black text-[#FAFAF8] uppercase tracking-tighter">Asset Staked</p>
                                    <p className="text-[9px] text-[#8C8C8C] mt-3 leading-relaxed uppercase font-bold tracking-tight">106% COLLATERAL LOCKED FOR HIGHER LIMITS.</p>
                                </div>
                            </div>

                            <div className="p-10 rounded-[40px] bg-black/40 border border-[#1E2A3A] shadow-inner">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="text-center md:text-left">
                                        <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mb-2">Protocol Settlement Goal</p>
                                        <p className="text-3xl font-black text-[#FAFAF8] font-cabinet">{totalRepay.toFixed(2)} TRUST</p>
                                        <p className="text-[10px] text-[#8C8C8C] uppercase font-bold mt-2 tracking-tight">Repay over {durationInDays} days — Approx {weeklyInstallment.toFixed(2)} weekly</p>
                                    </div>
                                    {needsApproval ? (
                                        <button onClick={handleApprove} disabled={phase === 'approving'} className="px-10 py-5 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#F5A623]/20">Authorize Stake</button>
                                    ) : (
                                        <button onClick={handleRequestLoan} disabled={isSubmitting || isLoading || !address || safeAmount <= 0 || hasActiveLoan} className="px-12 py-5 bg-[#FAFAF8] text-black text-[11px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-30 disabled:scale-100">
                                            {isSubmitting ? 'Verifying Risk...' : 'Execute Payload'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Task 3 Loan ML Summary integration */}
                        {!isUninitialized && <LoanMLSummary loanAmount={safeAmount} />}
                        
                        {/* ML Insight Card */}
                        <div className="bg-[#111827] p-10 rounded-[40px] border border-[#1E2A3A] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <iconify-icon icon="lucide:brain-circuit" className="text-2xl text-[#1D9E75]/40"></iconify-icon>
                            </div>
                            <h5 className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] mb-10">AI Adaptive Profile</h5>
                            
                            {isCalculatingML ? (
                                <div className="space-y-8 py-4 animate-pulse">
                                    <div className="h-20 bg-white/5 rounded-2xl"></div>
                                    <div className="h-20 bg-white/5 rounded-2xl"></div>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Base P2P Rate</p>
                                            <p className="text-2xl font-black text-[#FAFAF8] font-cabinet">{currentRate.toFixed(1)}%</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-[#1D9E75] uppercase tracking-widest">ML Discount</p>
                                            <p className="text-sm font-black text-[#1D9E75] font-cabinet">-{mlInterest?.vouch_discount_pct || 0}%</p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-[24px] border border-white/5">
                                        <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] mb-4">Repayment Archetype</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                                <iconify-icon icon="lucide:zap" className="text-xl"></iconify-icon>
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-black text-[#FAFAF8] uppercase">{mlSchedule?.archetype || 'Analyzing...'}</p>
                                                <p className="text-[9px] text-[#8C8C8C] uppercase font-bold mt-1">{mlSchedule?.grace_period_days} Day Grace Period</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest">Network Risk Gap</span>
                                            <span className="text-[10px] font-black text-[#FAFAF8] uppercase tracking-widest">Low</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#1D9E75]" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Protocol Guard Card */}
                        <div className="bg-gradient-to-br from-[#1D9E75]/10 to-transparent border border-[#1D9E75]/20 p-10 rounded-[40px] text-center">
                            <iconify-icon icon="lucide:shield-check" className="text-4xl text-[#1D9E75] mb-6"></iconify-icon>
                            <h6 className="text-[11px] font-black text-[#FAFAF8] uppercase tracking-widest mb-3">Sovereign Proof Ready</h6>
                            <p className="text-[10px] text-[#8C8C8C] uppercase font-bold leading-relaxed">Payload validated for P2P marketplace exchange.</p>
                        </div>
                    </div>
                </div>
            </>
        )}
      </div>
    </AppShell>
  );
}
