import { Link } from 'react-router-dom';

export default function WalletSelection() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-satoshi flex flex-col selection:bg-[#D4AF37] selection:text-white relative overflow-hidden">
      {/* Decorative luxury elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#F5F3F0] to-transparent pointer-events-none"></div>
      <div className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full gold-gradient opacity-5 blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-[#D4AF37] opacity-[0.03] blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <header className="p-12 md:p-16 flex justify-between items-center z-10">
        <Link to="/" className="flex items-center gap-4 text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.3em] hover:text-[#1A1A1A] transition-all group">
          <iconify-icon icon="lucide:arrow-left" className="text-lg group-hover:-translate-x-2 transition-transform"></iconify-icon> Protocol Manifest
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center shadow-xl">
             <iconify-icon icon="lucide:crown" className="text-[#D4AF37] text-2xl"></iconify-icon>
          </div>
          <span className="font-cabinet font-black text-xl tracking-tight text-[#1A1A1A]">AETHERFI</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-12 z-10 -mt-20">
        <div className="w-full max-w-2xl text-center mb-16 space-y-6">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 luxury-shadow mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#D4AF37]">Identity Synchronization</span>
           </div>
          <h1 className="font-cabinet text-6xl md:text-8xl font-black tracking-tighter leading-none animate-fade-in-up">
            Authorize Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1A1A] via-[#444] to-[#1A1A1A]">Sovereign Vault</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8C8C8C] max-w-xl mx-auto leading-relaxed font-medium animate-fade-in-up animate-delay-1">
            Access elite credit facilities by securely linking your on-chain reputation through our partner archways.
          </p>
        </div>

        <div className="w-full max-w-lg space-y-6 animate-fade-in-up animate-delay-2">
          {/* MetaMask */}
          <Link to="/setup" className="flex items-center gap-8 p-10 bg-white rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow hover:border-[#D4AF37]/50 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAF8] rounded-full group-hover:scale-150 transition-transform duration-700 -z-10"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#FAFAF8] flex items-center justify-center border border-[#E8E8E8] transition-all group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:rotate-12">
              <iconify-icon icon="logos:metamask-icon" className="text-4xl"></iconify-icon>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-black font-cabinet tracking-tight">MetaMask</h3>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Foundational Node</p>
            </div>
            <iconify-icon icon="lucide:arrow-right" className="text-2xl text-[#8C8C8C] group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all"></iconify-icon>
          </Link>

          {/* WalletConnect */}
          <Link to="/setup" className="flex items-center gap-8 p-10 bg-white rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow hover:border-[#D4AF37]/50 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAF8] rounded-full group-hover:scale-150 transition-transform duration-700 -z-10"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#FAFAF8] flex items-center justify-center border border-[#E8E8E8] transition-all group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:rotate-12">
              <iconify-icon icon="logos:walletconnect" className="text-3xl"></iconify-icon>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-black font-cabinet tracking-tight">WalletConnect</h3>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Mobile Architecture</p>
            </div>
            <iconify-icon icon="lucide:arrow-right" className="text-2xl text-[#8C8C8C] group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all"></iconify-icon>
          </Link>

          {/* Cold / HW */}
          <Link to="/setup" className="flex items-center gap-8 p-10 bg-white rounded-[3.5rem] border border-[#E8E8E8] luxury-shadow hover:border-[#D4AF37]/50 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAFAF8] rounded-full group-hover:scale-150 transition-transform duration-700 -z-10"></div>
            <div className="w-16 h-16 rounded-2xl bg-[#FAFAF8] flex items-center justify-center border border-[#E8E8E8] transition-all group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:rotate-12">
               <iconify-icon icon="lucide:shield-check" className="text-3xl text-[#1A1A1A] group-hover:text-white"></iconify-icon>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-black font-cabinet tracking-tight">Hardware Node</h3>
              <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-widest mt-1">Maximum Integrity</p>
            </div>
            <iconify-icon icon="lucide:arrow-right" className="text-2xl text-[#8C8C8C] group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all"></iconify-icon>
          </Link>
        </div>

        {/* Security disclaimer */}
        <div className="mt-20 flex items-center gap-6 px-10 py-6 bg-white rounded-[2.5rem] border border-[#E8E8E8] luxury-shadow max-w-lg">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
             <iconify-icon icon="lucide:lock" className="text-2xl"></iconify-icon>
          </div>
          <p className="text-[10px] font-black text-[#8C8C8C] uppercase tracking-[0.2em] leading-relaxed">
            Zero-Custody Protocol: <br/>
            <span className="text-[#1A1A1A]">AetherFi TrustLend</span> never stores or audits private keys or seed phrases.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-16 text-center z-10 animate-fade-in opacity-50 hover:opacity-100 transition-opacity">
        <p className="text-[9px] font-black text-[#8C8C8C] uppercase tracking-[0.4em] mb-6">Security Infrastructure & Audits</p>
        <div className="flex justify-center items-center gap-12 grayscale">
          <span className="font-black text-xs tracking-[0.1em]">OPENZEPPELIN</span>
          <span className="font-black text-xs tracking-[0.1em] italic underline decoration-[#D4AF37] decoration-2 underline-offset-4">TRUSTED NODE</span>
          <span className="font-black text-xs tracking-[0.1em]">QUANTSTAMP</span>
        </div>
      </footer>
    </div>
  );
}
