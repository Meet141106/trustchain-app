import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useWallet } from '../context/WalletContext';
import { useLendingPool } from '../hooks/useLendingPool';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function RequestPending() {
  const { walletAddress: address } = useWallet();
  const { pendingRequest, isRequestPending, cancelRequest, isLoading } = useLendingPool();
  const navigate = useNavigate();

  const handleCancel = async () => {
    if (!pendingRequest) return;
    if (!window.confirm("Cancel this loan request?")) return;
    try {
        await cancelRequest(pendingRequest.id);
        toast.success("Request cancelled");
        navigate('/borrow');
    } catch (err) {
        console.error(err);
    }
  };

  if (isLoading) return <AppShell><Skeleton h="400px" /></AppShell>;
  
  if (!isRequestPending) {
      return (
        <AppShell pageTitle="Request Status">
             <div className="py-20 text-center uppercase tracking-widest text-xs animate-pulse text-[#8C8C8C]">
                No pending request found. <Link to="/borrow" className="text-[#F5A623] underline ml-2">Submit one here.</Link>
             </div>
        </AppShell>
      );
  }

  return (
    <AppShell pageTitle="Pending Request" pageSubtitle="Real-time Status Monitoring">
      <div className="max-w-4xl mx-auto py-12 space-y-12 pb-24">
        
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-[#F5A623]/10 rounded-full flex items-center justify-center border border-[#F5A623]/20">
                    <iconify-icon icon="lucide:loader-2" className="text-4xl text-[#F5A623] animate-spin"></iconify-icon>
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-[#F5A623]/5 rounded-full animate-ping scale-150"></div>
            </div>
            <h2 className="text-3xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter mb-3">Awaiting Funding</h2>
            <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-[0.2em] mb-12">Your request is currently live in the P2P marketplace</p>

            <div className="w-full flex justify-center gap-12 mb-10 px-10">
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1D9E75] border-2 border-[#111827] flex items-center justify-center text-white mb-3">
                         <iconify-icon icon="lucide:check" className="text-sm"></iconify-icon>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1D9E75]">Submitted</p>
                </div>
                <div className="w-full h-px bg-[#1E2A3A] mt-4 flex-1"></div>
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#F5A623] border-2 border-[#111827] flex items-center justify-center text-black mb-3 animate-pulse shadow-[0_0_15px_rgba(245,166,35,0.4)]">
                         <iconify-icon icon="lucide:search" className="text-sm"></iconify-icon>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#F5A623]">Marketplace</p>
                </div>
                <div className="w-full h-px bg-[#1E2A3A] mt-4 flex-1"></div>
                <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1E2A3A] border-2 border-[#111827] flex items-center justify-center text-[#8C8C8C] mb-3">
                         <iconify-icon icon="lucide:circle" className="text-xs"></iconify-icon>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C]">Funded</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111827] p-10 rounded-[28px] border border-[#1E2A3A] flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter mb-8">Request Details</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Amount</p>
                            <p className="text-lg font-black font-cabinet text-[#FAFAF8]">{pendingRequest.amount} TRUST</p>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">APR</p>
                            <p className="text-lg font-black font-cabinet text-[#1D9E75]">{pendingRequest.interestRate}%</p>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Duration</p>
                            <p className="text-lg font-black font-cabinet text-[#FAFAF8]">{pendingRequest.duration} Days</p>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Expires In</p>
                            <p className="text-xs font-black text-[#EF4444] uppercase tracking-widest animate-pulse">47h 58m</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex gap-4">
                    <button onClick={() => navigate('/marketplace')} className="flex-1 py-4 bg-[#F5A623] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">View My Card</button>
                    <button onClick={handleCancel} className="flex-1 py-4 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-[#EF4444]/5 transition-all">Cancel</button>
                </div>
            </div>

            <div className="bg-[#111827] p-10 rounded-[28px] border border-[#1E2A3A] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <iconify-icon icon="lucide:share-2" className="text-6xl text-[#FAFAF8]"></iconify-icon>
                </div>
                <h3 className="text-xl font-black font-cabinet text-[#FAFAF8] uppercase tracking-tighter mb-3">Boost Funding</h3>
                <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest mb-10 leading-relaxed max-w-xs text-left">Share your request with the Vouch network to find a direct lender faster.</p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 flex flex-col items-center">
                    <div className="w-32 h-32 bg-white rounded-xl mb-6 flex items-center justify-center p-3">
                        {/* Placeholder for QR code logic */}
                        <div className="w-full h-full bg-black/10 rounded-sm flex items-center justify-center">
                             <iconify-icon icon="lucide:qr-code" className="text-6xl text-black"></iconify-icon>
                        </div>
                    </div>
                    <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-widest">Request Node QR</p>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`I'm requesting ${pendingRequest.amount} TRUST on TrustLend at ${pendingRequest.interestRate}% APR — fund my loan and earn interest https://trustlend.fi/request/${pendingRequest.id}`);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="w-full py-4 border border-white/20 text-[#FAFAF8] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                    <iconify-icon icon="lucide:copy" className="text-sm"></iconify-icon>
                    Copy Link
                </button>
            </div>
        </div>

        <div className="text-center pt-10">
            <Link to="/dashboard" className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest hover:text-[#FAFAF8] transition-all flex items-center justify-center gap-2">
                <iconify-icon icon="lucide:arrow-left"></iconify-icon>
                Return to Personal Dashboard
            </Link>
        </div>

      </div>
    </AppShell>
  );
}
