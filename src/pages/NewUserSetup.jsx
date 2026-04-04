import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NewUserSetup() {
  const [role, setRole] = useState('borrower');
  const [name, setName] = useState('');
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    setScanning(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3500); // Simulate high-fidelity risk scan
  };

  if (scanning) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-satoshi flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
        {/* Animated luxury background */}
        <div className="absolute top-1/2 left-1/2 -get-translate-x-1/2 -get-translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37] opacity-[0.05] blur-[150px] animate-pulse"></div>
        
        <div className="relative z-10 space-y-12 max-w-lg w-full">
          <div className="relative inline-block mx-auto">
            {/* High-end scanning animation */}
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#D4AF37]/20 flex items-center justify-center relative shadow-2xl bg-white/50 backdrop-blur-xl">
               <div className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
               <div className="absolute inset-8 rounded-full border border-[#D4AF37]/10 flex items-center justify-center">
                  <iconify-icon icon="lucide:brain-circuit" className="text-6xl text-[#D4AF37] animate-pulse"></iconify-icon>
               </div>
            </div>
            {/* Floating particles or indicators */}
            <div className="absolute -top-4 -right-10 px-6 py-2 bg-[#1A1A1A] rounded-full border border-white/10 shadow-xl animate-bounce">
               <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">AI Scoring Protocol...</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-cabinet text-4xl md:text-6xl font-black tracking-tighter leading-none">
               Calibrating <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] via-[#444] to-[#1A1A1A]">Reputation Matrix</span>
            </h2>
            <p className="text-[#8C8C8C] font-black text-[10px] leading-relaxed uppercase tracking-[0.4em] max-w-sm mx-auto">
              Our autonomous risk engine is synthesizing your social capital and transaction fidelity into a sovereign credit profile.
            </p>
          </div>

          <div className="w-full h-1.5 bg-[#F5F3F0] rounded-full overflow-hidden luxury-shadow-sm">
            <div className="h-full bg-gradient-to-r from-[#D4AF37] via-[#A3832B] to-[#D4AF37] animate-progress" style={{ width: '100%', animationDuration: '3.5s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-satoshi flex flex-col selection:bg-[#D4AF37] selection:text-white relative overflow-hidden">
      {/* Decorative luxury elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#F5F3F0] to-transparent pointer-events-none"></div>
      <div className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full gold-gradient opacity-5 blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="p-12 md:p-16 flex justify-between items-center z-10">
        <Link to="/wallet" className="flex items-center gap-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] hover:text-[#1A1A1A] transition-all group">
          <iconify-icon icon="lucide:arrow-left" className="text-lg group-hover:-translate-x-2 transition-transform"></iconify-icon> Protocol Entry
        </Link>
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shadow-xl group-hover:rotate-12 duration-500">
             <iconify-icon icon="lucide:crown" className="text-[#D4AF37] text-2xl"></iconify-icon>
          </div>
          <span className="font-cabinet font-black text-xl tracking-tight text-[#1A1A1A]">AETHERFI</span>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-12 z-10 -mt-20 py-12">
        <div className="w-full max-w-3xl text-center mb-16 space-y-6">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 luxury-shadow mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#D4AF37]">Profile Personalization</span>
           </div>
          <h1 className="font-cabinet text-6xl md:text-8xl font-black tracking-tighter leading-none animate-fade-in-up">
            Define Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] via-[#444] to-[#1A1A1A]">Engagement Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8C8C8C] max-w-2xl mx-auto leading-relaxed font-medium animate-fade-in-up animate-delay-1">
             Synchronize your digital handle and core objective within the Aether TrustLend ecosystem.
          </p>
        </div>

        <div className="w-full max-w-2xl space-y-12">
          {/* Form Section */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] ml-10">Choose Your Handle</label>
            <div className="relative group">
               <input 
                 type="text" 
                 placeholder="e.g. SOUVEREIGN_NODE_7"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full px-10 py-8 rounded-[3.5rem] bg-white border border-[#E8E8E8] luxury-shadow outline-none font-cabinet font-black text-2xl tracking-tight focus:border-[#D4AF37] transition-all placeholder:text-[#F5F3F0] text-[#1A1A1A]"
               />
               <iconify-icon icon="lucide:at-sign" className="absolute right-10 top-1/2 -translate-y-1/2 text-2xl text-[#E8E8E8] group-focus-within:text-[#D4AF37] transition-colors"></iconify-icon>
            </div>
          </div>

          <div className="space-y-6">
             <label className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] ml-10">Strategic Mandate</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'borrower', title: 'Sovereign Credit', desc: 'Secure unsecured micro-loans via reputation', icon: 'lucide:arrow-down-to-line' },
                { id: 'lender', title: 'Community Growth', desc: 'Deploy liquidity into verified unbanked pools', icon: 'lucide:bar-chart-3' },
              ].map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => setRole(opt.id)}
                  className={`relative flex flex-col p-10 rounded-[3.5rem] border transition-all duration-700 text-left group overflow-hidden ${
                    role === opt.id 
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] luxury-shadow scale-[1.05] z-10' 
                    : 'bg-white border-[#E8E8E8] hover:border-[#D4AF37]/50'
                  }`}
                >
                  {role === opt.id && (
                     <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 shadow-xl ${
                    role === opt.id ? 'bg-[#D4AF37] text-[#1A1A1A] rotate-12' : 'bg-[#FAFAF8] text-[#8C8C8C] border border-[#E8E8E8]'
                  }`}>
                     <iconify-icon icon={opt.icon} className="text-3xl"></iconify-icon>
                  </div>
                  <div>
                    <h4 className={`font-cabinet font-black text-2xl tracking-tight mb-2 ${role === opt.id ? 'text-white' : 'text-[#1A1A1A]'}`}>{opt.title}</h4>
                    <p className={`text-[10px] font-black uppercase tracking-widest leading-relaxed ${role === opt.id ? 'text-white/40' : 'text-[#8C8C8C]'}`}>{opt.desc}</p>
                  </div>
                  {role === opt.id && (
                     <div className="mt-8 flex items-center gap-2">
                        <iconify-icon icon="lucide:check-circle-2" className="text-[#D4AF37] text-xl"></iconify-icon>
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Active Objective</span>
                     </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="p-16 sticky bottom-0 z-20 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <button 
            onClick={handleContinue} 
            className="w-full py-6 rounded-full bg-[#1A1A1A] text-white font-black text-[12px] uppercase tracking-[0.4em] luxury-shadow hover:bg-[#D4AF37] hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed group active:scale-95"
            disabled={!name}
          >
            Authenticate Protocol <iconify-icon icon="lucide:lock" className="text-lg group-hover:rotate-12 transition-transform ml-2"></iconify-icon>
          </button>
        </div>
      </footer>
    </div>
  );
}
