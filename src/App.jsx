import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Landing             from './pages/Landing';
import ConnectWallet       from './pages/ConnectWallet';
import Onboarding          from './pages/Onboarding';
import Dashboard           from './pages/Dashboard';
import LoanFlow            from './pages/LoanFlow';
import RepayLoan           from './pages/RepayLoan';
import VouchInvite         from './pages/VouchInvite';
import Borrow              from './pages/Borrow';
import ActiveLoanDetail    from './pages/ActiveLoanDetail';
import Marketplace         from './pages/Marketplace';
import LoanRequestDetail   from './pages/LoanRequestDetail';
import LenderPortfolio     from './pages/LenderPortfolio';
import SovereignAudit      from './pages/SovereignAudit';
import ReputationBreakdown from './pages/ReputationBreakdown';
import TransactionHistory  from './pages/TransactionHistory';
import TrustNetworkGraph   from './pages/TrustNetworkGraph';

import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* ── Public entry flow (no wallet required) ── */}
            <Route path="/"           element={<Landing />} />
            <Route path="/connect"    element={<ConnectWallet />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* ── Protected core app (wallet required) ── */}
            <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/loan-flow"    element={<ProtectedRoute><LoanFlow /></ProtectedRoute>} />
            <Route path="/repay"        element={<ProtectedRoute><RepayLoan /></ProtectedRoute>} />
            <Route path="/invite-vouch" element={<ProtectedRoute><VouchInvite /></ProtectedRoute>} />
            <Route path="/borrow"       element={<ProtectedRoute><Borrow /></ProtectedRoute>} />
            <Route path="/loan/:id"     element={<ProtectedRoute><ActiveLoanDetail /></ProtectedRoute>} />
            <Route path="/marketplace"  element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            <Route path="/request/:id"  element={<ProtectedRoute><LoanRequestDetail /></ProtectedRoute>} />
            <Route path="/portfolio"    element={<ProtectedRoute><LenderPortfolio /></ProtectedRoute>} />
            <Route path="/audit"        element={<ProtectedRoute><SovereignAudit /></ProtectedRoute>} />
            <Route path="/reputation"   element={<ProtectedRoute><ReputationBreakdown /></ProtectedRoute>} />
            <Route path="/ledger"       element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
            <Route path="/network"      element={<ProtectedRoute><TrustNetworkGraph /></ProtectedRoute>} />

            {/* ── Fallback ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </HashRouter>
    </ThemeProvider>
  );
}
