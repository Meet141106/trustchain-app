import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import WalletSelection from './pages/WalletSelection';
import CreditAssessment from './pages/CreditAssessment';
import BorrowerDashboard from './pages/BorrowerDashboard';
import Borrow from './pages/Borrow';
import GroupLending from './pages/GroupLending';
import Repayment from './pages/Repayment';
import LenderDashboard from './pages/LenderDashboard';
import Marketplace from './pages/Marketplace';
import TransactionHistory from './pages/TransactionHistory';
import NftShowcase from './pages/NftShowcase';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Onboarding flow (no bottom nav) */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/wallet" element={<WalletSelection />} />

        {/* Main app screens (with bottom nav via AppShell) */}
        <Route path="/dashboard" element={<BorrowerDashboard />} />
        <Route path="/credit" element={<CreditAssessment />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/group" element={<GroupLending />} />
        <Route path="/repay" element={<Repayment />} />
        <Route path="/lender" element={<LenderDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/history" element={<TransactionHistory />} />
        <Route path="/profile" element={<NftShowcase />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
