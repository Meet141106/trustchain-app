import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function TopHeader({ pageTitle = 'Dashboard', pageSubtitle = 'Overview', walletAddress = '0x71...3D2E', toggleMobile }) {
  const { isDarkMode } = useTheme();

  return (
    <header className={`sticky top-0 z-30 transition-all duration-500 h-24 md:h-28 flex items-center justify-between px-8 md:px-16 border-b 
      ${isDarkMode 
        ? 'bg-[#1A1A1A]/60 backdrop-blur-xl border-[#333]' 
        : 'bg-white/60 backdrop-blur-xl border-[#F5F3F0]'}`}>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleMobile} 
          className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-[#1A1A1A] text-white shadow-xl active:scale-90 transition-transform dark:bg-[#D4AF37] dark:text-black"
        >
          <iconify-icon icon="lucide:menu" className="text-xl"></iconify-icon>
        </button>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h1 className={`text-xl md:text-3xl font-black font-cabinet tracking-tighter leading-none 
            ${isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>
            {pageTitle}
          </h1>
          <div className="hidden md:flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[10px] md:text-xs text-[#8C8C8C] font-black uppercase tracking-[0.3em] leading-none whitespace-nowrap">
              {pageSubtitle}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 md:gap-10">
        <ThemeToggle />
        
        <div className={`hidden xl:flex items-center gap-8 border-r pr-10
          ${isDarkMode ? 'text-[#8C8C8C] border-[#333]' : 'text-[#8C8C8C] border-[#F5F3F0]'}`}>
          <div className="group cursor-pointer">
            <iconify-icon icon="lucide:search" className={`text-2xl transition-all group-hover:scale-110 
              ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-[#1A1A1A]'}`}></iconify-icon>
          </div>
          <div className="group cursor-pointer relative">
            <iconify-icon icon="lucide:bell" className={`text-2xl transition-all group-hover:scale-110 
              ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-[#1A1A1A]'}`}></iconify-icon>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-white dark:border-[#1A1A1A]"></span>
          </div>
        </div>
        
        <button 
          id="connect-wallet-btn" 
          className="flex items-center gap-4 px-6 py-3.5 md:px-10 md:py-4 rounded-full bg-[#1A1A1A] text-white hover:bg-[#D4AF37] transition-all duration-500 font-black text-[10px] md:text-xs tracking-[0.3em] uppercase luxury-shadow active:scale-95 group dark:bg-[#D4AF37] dark:text-black dark:hover:bg-white"
        >
          <span className="hidden sm:inline group-hover:translate-x-1 transition-transform">{walletAddress}</span> 
          <iconify-icon icon="lucide:wallet" className="text-xl"></iconify-icon>
        </button>
      </div>
    </header>
  );
}
