import { Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="shrink-0 pt-14 px-8 z-10">
      <Link to="/" className="flex items-center gap-2 no-underline text-inherit">
        <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center shadow-lg shadow-[#F5A623]/20">
          <Landmark className="text-[#0A0F1E] w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">TrustLend</span>
      </Link>
    </header>
  );
}
