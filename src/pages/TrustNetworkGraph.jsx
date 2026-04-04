import React, { useState } from 'react';
import AppShell from '../components/AppShell';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function TrustNetworkGraph() {
  const { isDarkMode } = useTheme();
  const [hoveredNode, setHoveredNode] = useState(null);

  // Mock data for nodes
  const nodes = [
    { id: 'me', label: 'You', x: 50, y: 50, type: 'center', score: 812 },
    { id: 'n1', label: 'Noir Node 84', x: 30, y: 30, type: 'vouch', score: 950 },
    { id: 'n2', label: 'Syndicate 402', x: 70, y: 25, type: 'vouch', score: 880 },
    { id: 'n3', label: 'Artisan Hub', x: 75, y: 65, type: 'circle', score: 720 },
    { id: 'n4', label: 'Global Oracle', x: 25, y: 70, type: 'protocol', score: 1000 },
    { id: 'n5', label: 'Circle Delta', x: 50, y: 15, type: 'circle', score: 640 },
    { id: 'n6', label: 'Capital Node', x: 15, y: 50, type: 'vouch', score: 890 }
  ];

  const connections = [
    { from: 'me', to: 'n1' },
    { from: 'me', to: 'n2' },
    { from: 'me', to: 'n3' },
    { from: 'me', to: 'n4' },
    { from: 'n1', to: 'n5' },
    { from: 'n2', to: 'n5' },
    { from: 'me', to: 'n6' }
  ];

  return (
    <AppShell pageTitle="Trust Network Graph" pageSubtitle="Visualizing decentralized reputation architecture">
      <div className="max-w-7xl mx-auto space-y-12 pb-24">
        
        {/* Graph Container */}
        <div className={`aspect-[16/9] md:aspect-[21/9] rounded-[4rem] border transition-all duration-500 relative overflow-hidden group luxury-shadow
          ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8]'}`}>
          
          <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#D4AF37 0.5px, transparent 0.5px)', 
              backgroundSize: '30px 30px' 
            }}
          />

          <svg className="w-full h-full p-20 overflow-visible">
            {/* Connection Lines */}
            {connections.map((conn, idx) => {
              const start = nodes.find(n => n.id === conn.from);
              const end = nodes.find(n => n.id === conn.to);
              return (
                <motion.line
                  key={idx}
                  x1={`${start.x}%`} y1={`${start.y}%`}
                  x2={`${end.x}%`} y2={`${end.y}%`}
                  stroke={isDarkMode ? "#333" : "#E8E8E8"}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.1 }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.5 }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={`${node.x}%`} cy={`${node.y}%`}
                  r={node.type === 'center' ? 30 : 20}
                  fill={node.type === 'center' ? '#D4AF37' : (isDarkMode ? '#000' : '#FFF')}
                  stroke={node.type === 'center' ? 'none' : '#D4AF37'}
                  strokeWidth="2"
                  className="transition-all duration-300 hover:r-[35]"
                />
                <text
                  x={`${node.x}%`} y={`${node.y + (node.type === 'center' ? 6 : 4)}%`}
                  textAnchor="middle"
                  className={`text-[10px] font-black uppercase tracking-tighter pointer-events-none
                    ${node.type === 'center' ? 'fill-black' : (isDarkMode ? 'fill-white' : 'fill-[#1A1A1A]')}`}
                >
                  {node.label.charAt(0)}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* Floating UI Overlays */}
          <div className="absolute top-10 left-10 space-y-4">
            <div className={`px-6 py-3 rounded-full border luxury-shadow backdrop-blur-md
              ${isDarkMode ? 'bg-black/60 border-[#333] text-white' : 'bg-white/80 border-[#E8E8E8] text-[#1A1A1A]'}`}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest font-cabinet">Network Operational</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 right-10">
            <div className={`p-8 rounded-[2.5rem] border luxury-shadow backdrop-blur-md w-72 transition-all duration-500
              ${isDarkMode ? 'bg-black/80 border-[#D4AF37]/30 text-white' : 'bg-white/90 border-[#D4AF37]/20 text-[#1A1A1A]'}`}>
              {hoveredNode ? (
                <div className="space-y-3 animate-fadeIn">
                  <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest font-cabinet">{hoveredNode.type} NODE</p>
                  <h4 className="text-xl font-black font-cabinet tracking-tight">{hoveredNode.label}</h4>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest pt-2">
                    <span className="text-[#8C8C8C]">Quotient</span>
                    <span className="text-[#10B981] font-mono">{hoveredNode.score}</span>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] font-black text-[#8C8C84] uppercase tracking-widest leading-relaxed text-center font-cabinet italic">
                  Hover nodes to investigate the human trust architecture
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`p-8 rounded-[3rem] border transition-all duration-500
            ${isDarkMode ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E8E8E8] luxury-shadow'}`}>
            <h5 className={`text-sm font-black font-cabinet tracking-tight mb-6 uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Architectural Roles</h5>
            <div className="space-y-4">
              {[
                { label: 'Sovereign Node', color: '#D4AF37' },
                { label: 'Verification Syndicate', color: '#10B981' },
                { label: 'Reputation Circle', color: '#6366F1' }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] font-cabinet">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-2 p-10 rounded-[3rem] border transition-all duration-500
            ${isDarkMode ? 'bg-black border-[#333]' : 'bg-[#1A1A1A] text-white luxury-shadow'}`}>
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                <iconify-icon icon="lucide:network" className="text-4xl"></iconify-icon>
              </div>
              <div>
                <h4 className="text-2xl font-black font-cabinet tracking-tight mb-2">Protocol Connectivity</h4>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  Your profile is actively anchored by <span className="text-[#D4AF37]">6 High-Fidelity Nodes</span>. This connectivity provides a <span className="text-white font-black underline decoration-[#D4AF37]">1.8x multiplier</span> to your capital borrowing velocity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
