import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function DisputeScreen() {
  const [reason, setReason] = useState('');

  return (
    <AppShell pageTitle="Community Arbitration" pageSubtitle="Resolution protocols & peer review panels">
      <div className="p-4 md:p-8 lg:p-12 max-w-[900px] mx-auto space-y-12">
        
        {/* Header Info */}
        <div className="bg-white p-10 rounded-[3rem] border border-[#E8E8E8] luxury-shadow space-y-6">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                 <iconify-icon icon="lucide:gavel" className="text-3xl"></iconify-icon>
              </div>
              <div>
                 <h2 className="font-cabinet text-2xl font-black text-[#1A1A1A] tracking-tight">Active File: #TR-4421-ARB</h2>
                 <p className="text-[#8C8C8C] text-xs font-medium">Bespoke Mediation Protocol • 48h Resolution Window</p>
              </div>
           </div>
           
           <p className="text-[11px] text-[#8C8C8C] leading-relaxed font-medium">
              Community arbitration initiates a formal review by three randomly selected Peer Guardians. Your credit facility remains frozen during the audit. False claims will result in immediate Reputation Slashing.
           </p>
        </div>

        {/* Arbitration Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
           <div className="md:col-span-12 space-y-10">
              {/* Category of Hardship */}
              <div className="space-y-6">
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Nature of Application</p>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Repayment Hardship', 'AI Misclassification', 'Syndicate Conflict'].map(r => (
                       <button 
                          key={r}
                          onClick={() => setReason(r)}
                          className={`p-6 rounded-3xl border transition-all text-left group ${reason === r ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-xl' : 'bg-white border-[#E8E8E8] text-[#8C8C8C] hover:border-[#D4AF37]/50'}`}
                       >
                          <div className={`w-8 h-8 rounded-lg mb-4 flex items-center justify-center ${reason === r ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'bg-[#FAFAF8] text-[#8C8C8C]'}`}>
                             <iconify-icon icon={r === 'Repayment Hardship' ? 'lucide:heart-handshake' : r === 'AI Misclassification' ? 'lucide:brain-circuit' : 'lucide:users'}></iconify-icon>
                          </div>
                          <span className={`text-[11px] font-black uppercase tracking-widest ${reason === r ? 'text-white' : 'text-[#1A1A1A]'}`}>{r}</span>
                       </button>
                    ))}
                 </div>
              </div>

              {/* Documentation */}
              <div className="space-y-6">
                 <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Hardship Documentation (Evidence)</p>
                 <div className="relative">
                    <textarea 
                       placeholder="Please elucidate the specific circumstances regarding the repayment delay. Include any relevant contextual data for the Peer Guardian review panel..."
                       className="w-full min-h-[200px] bg-white border border-[#E8E8E8] rounded-[2.5rem] p-10 text-sm font-medium text-[#1A1A1A] luxury-shadow outline-none focus:border-[#D4AF37] transition-all resize-none placeholder:text-[#8C8C8C]/50"
                    />
                    <div className="absolute bottom-6 right-6 flex items-center gap-4">
                       <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAFAF8] border border-[#E8E8E8] text-[10px] font-black uppercase tracking-widest text-[#8C8C8C] hover:bg-white hover:text-[#1A1A1A] transition-all">
                          <iconify-icon icon="lucide:paperclip"></iconify-icon> Attach IPFS Node
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="pt-8 flex flex-col sm:flex-row gap-6">
           <Link to="/dashboard" className="flex-1 py-5 rounded-full border border-[#E8E8E8] text-[#8C8C8C] font-black uppercase text-[10px] tracking-widest text-center hover:bg-[#FAFAF8] transition-all">
              Cancel Submission
           </Link>
           <button className="flex-[2] py-5 rounded-full gold-gradient text-white font-black uppercase text-[10px] tracking-widest text-center luxury-shadow hover:scale-105 transition-all">
              Submit to Arbitration Panel
           </button>
        </div>
      </div>
    </AppShell>
  );
}
