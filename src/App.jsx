import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Borrow from './pages/Borrow';
import ActiveLoanDetail from './pages/ActiveLoanDetail';
import Marketplace from './pages/Marketplace';
import LoanRequestDetail from './pages/LoanRequestDetail';
import LenderPortfolio from './pages/LenderPortfolio';
import SovereignAudit from './pages/SovereignAudit';
import ReputationBreakdown from './pages/ReputationBreakdown';
import TransactionHistory from './pages/TransactionHistory';
import TrustNetworkGraph from './pages/TrustNetworkGraph';

import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AnimatePresence mode="wait">
          <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/loan/:id" element={<ActiveLoanDetail />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/request/:id" element={<LoanRequestDetail />} />
        <Route path="/portfolio" element={<LenderPortfolio />} />
        <Route path="/audit" element={<SovereignAudit />} />
        <Route path="/reputation" element={<ReputationBreakdown />} />
        <Route path="/ledger" element={<TransactionHistory />} />
        <Route path="/network" element={<TrustNetworkGraph />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </AnimatePresence>
      </HashRouter>
    </ThemeProvider>
  );
}
