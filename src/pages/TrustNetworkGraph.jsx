import React, { useEffect, useRef, useState } from 'react';
import AppShell from '../components/AppShell';
import { useVouchSystem } from '../hooks/useVouchSystem';
import { useReputationNFT } from '../hooks/useReputationNFT';
import { useWallet } from '../context/WalletContext';
import { useNotifications } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';

const shortAddr = (a = '') => a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '—';

export default function TrustNetworkGraph() {
  const { 
    vouches, 
    vouchRequests, 
    vouchGivenCount, 
    vouchReceivedCount, 
    requestVouch, 
    acceptVouch, 
    rejectVouch,
    isLoading 
  } = useVouchSystem();
  const { trustScore } = useReputationNFT();
  const { walletAddress: address } = useWallet();
  const { notifications } = useNotifications();
  const navigate = useNavigate();
  const svgRef = useRef(null);
  
  const [targetAddress, setTargetAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter notifications for vouch requests
  const incomingRequests = notifications.filter(n => n.type === 'vouch_request' && !n.read);

  useEffect(() => {
    if (!svgRef.current || !address) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = 500;
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const container = svg.append("g");

    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => container.attr("transform", event.transform)));

    const nodes = [
      { id: address, label: "Me", score: Number(trustScore), isCenter: true, type: 'borrower' }
    ];
    const links = [];

    vouches.forEach(v => {
      nodes.push({ id: v.voucher, label: shortAddr(v.voucher), score: 70, type: 'voucher' });
      links.push({ source: address, target: v.voucher });
    });

    // Add placeholders if < 3
    for (let i = vouches.length; i < 3; i++) {
        const gid = `ghost-${i}`;
        nodes.push({ id: gid, label: 'Empty Slot', type: 'ghost' });
        links.push({ source: address, target: gid, isGhost: true });
    }

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-600))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = container.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => d.isGhost ? "#1E2A3A" : "#F5A623")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", d => d.isGhost ? "4,4" : "none");

    const node = container.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));

    node.append("circle")
      .attr("r", d => d.isCenter ? 35 : 22)
      .attr("fill", d => d.type === 'ghost' ? "transparent" : d.isCenter ? "#F5A623" : "#0A0F1E")
      .attr("stroke", d => d.type === 'ghost' ? "#1E2A3A" : d.isCenter ? "#D4AF37" : "#F5A623")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", d => d.type === 'ghost' ? "3,3" : "none");

    node.append("text")
      .attr("dy", d => d.isCenter ? 55 : 40)
      .attr("text-anchor", "middle")
      .attr("fill", "#8C8C8C")
      .attr("font-size", "9px")
      .attr("font-weight", "900")
      .text(d => d.label);

    node.filter(d => d.isCenter).append("text")
      .attr("dy", 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("font-size", "16px")
      .attr("font-weight", "900")
      .text(d => d.score);

    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [vouches, address, trustScore]);

  const handleRequest = async () => {
      if (!targetAddress) return;
      setIsSubmitting(true);
      try { await requestVouch(targetAddress); setTargetAddress(''); } catch(e){}
      setIsSubmitting(false);
  };

  return (
    <AppShell pageTitle="Syndicate Mesh" pageSubtitle="Real-time Network Visualizer">
      <div className="max-w-7xl mx-auto space-y-10 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Mesh Graph */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#111827] rounded-[32px] border border-[#E8E8E8] dark:border-[#1E2A3A] relative overflow-hidden h-[500px] shadow-2xl">
                <div className="absolute top-10 left-10 z-20">
                    <span className="px-4 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#F5A623]">
                        Protocol Visualization
                    </span>
                </div>
                <svg ref={svgRef} className="w-full h-full cursor-move"></svg>
            </div>

            {/* Network Capacity */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#111827] p-8 rounded-[32px] border border-[#1E2A3A] flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1">Vouches Received</p>
                        <p className="text-3xl font-black text-[#FAFAF8]">{vouchReceivedCount} <span className="text-[#1E2A3A]">/ 3</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/10 flex items-center justify-center text-[#F5A623]">
                        <iconify-icon icon="lucide:user-check" className="text-2xl"></iconify-icon>
                    </div>
                </div>
                <div className="bg-[#111827] p-8 rounded-[32px] border border-[#1E2A3A] flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] mb-1">Vouches Given</p>
                        <p className="text-3xl font-black text-[#FAFAF8]">{vouchGivenCount} <span className="text-[#1E2A3A]">/ 3</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#1D9E75]/10 flex items-center justify-center text-[#1D9E75]">
                        <iconify-icon icon="lucide:shield-check" className="text-2xl"></iconify-icon>
                    </div>
                </div>
            </div>
          </div>

          {/* Right: Actions & Requests */}
          <div className="space-y-8">
            
            {/* Request Link */}
            <div className="bg-white dark:bg-[#111827] p-8 rounded-[32px] border border-[#E8E8E8] dark:border-[#1E2A3A] shadow-xl">
                 <h4 className="text-[11px] font-black uppercase tracking-widest text-[#FAFAF8] mb-6 flex items-center gap-2">
                    <iconify-icon icon="lucide:plus-circle" className="text-[#F5A623]"></iconify-icon>
                    Establish New Link
                 </h4>
                 <div className="space-y-4">
                    <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-[#8C8C8C] block mb-2 px-1">Voucher's Wallet Address</label>
                        <input 
                            value={targetAddress}
                            onChange={(e) => setTargetAddress(e.target.value)}
                            placeholder="0x..."
                            className="w-full bg-black border border-[#1E2A3A] rounded-2xl px-5 py-4 text-xs font-mono text-[#FAFAF8] focus:border-[#F5A623] transition-all"
                        />
                    </div>
                    <button 
                        onClick={handleRequest}
                        disabled={isSubmitting || !targetAddress || vouchReceivedCount >= 3}
                        className="w-full py-5 bg-[#F5A623] text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-[#F5A623]/20">
                        {isSubmitting ? 'Transmitting...' : 'Request Vouch Link'}
                    </button>
                    {vouchReceivedCount >= 3 && (
                        <p className="text-center text-[9px] text-[#EF4444] font-black uppercase tracking-widest">Protocol limit reached (3/3)</p>
                    )}
                 </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-[#111827] border border-[#1E2A3A] rounded-[32px] overflow-hidden shadow-xl">
                <div className="p-8 border-b border-[#1E2A3A] flex justify-between items-center">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#FAFAF8]">Pending Approvals</h4>
                    <span className="px-2 py-0.5 rounded bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-black">{incomingRequests.length}</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {incomingRequests.length === 0 ? (
                        <div className="p-12 text-center">
                            <iconify-icon icon="lucide:inbox" className="text-4xl text-[#1E2A3A] mb-4"></iconify-icon>
                            <p className="text-[10px] text-[#8C8C8C] uppercase font-bold tracking-widest leading-loose">No inbound requests at the moment</p>
                        </div>
                    ) : (
                        incomingRequests.map((req, i) => (
                            <div key={i} className="p-6 border-b border-[#1E2A3A] last:border-0 bg-white/5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-black border border-[#1E2A3A] flex items-center justify-center text-[#FAFAF8] text-xs font-black">
                                            {req.data?.from?.slice(2,4).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black font-mono text-[#FAFAF8]">{shortAddr(req.data?.from)}</p>
                                            <p className="text-[9px] text-[#8C8C8C] uppercase font-bold mt-0.5">Asks for your vouch</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => acceptVouch(req.data?.from)}
                                            className="flex-1 py-3 bg-[#1D9E75] text-black text-[10px] font-black underline-offset-4 rounded-xl active:scale-95 transition-all">
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => rejectVouch(req.data?.from)}
                                            className="flex-1 py-3 border border-[#1E2A3A] text-[#8C8C8C] text-[10px] font-black rounded-xl hover:border-[#EF4444] hover:text-[#EF4444] active:scale-95 transition-all">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
