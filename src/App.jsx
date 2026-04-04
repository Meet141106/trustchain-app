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

// NEW 20 FILES
import OnboardingWalkthrough from './pages/OnboardingWalkthrough';
import NewUserSetup from './pages/NewUserSetup';
import LoanConfirmation from './pages/LoanConfirmation';
import LoanSuccess from './pages/LoanSuccess';
import ActiveLoanDetail from './pages/ActiveLoanDetail';
import RepaymentSuccess from './pages/RepaymentSuccess';
import LiquidationWarning from './pages/LiquidationWarning';
import CreateGroup from './pages/CreateGroup';
import VouchForMember from './pages/VouchForMember';
import GroupLoanRequest from './pages/GroupLoanRequest';
import LoanRequestDetail from './pages/LoanRequestDetail';
import LenderPortfolio from './pages/LenderPortfolio';
import YieldWithdrawal from './pages/YieldWithdrawal';
import ScoreBreakdown from './pages/ScoreBreakdown';
import TierUpgrade from './pages/TierUpgrade';
import ShareableLoanRequest from './pages/ShareableLoanRequest';
import Notifications from './pages/Notifications';
import DisputeScreen from './pages/DisputeScreen';
import Settings from './pages/Settings';
import InviteFriends from './pages/InviteFriends';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Onboarding flow (no bottom nav) */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/walkthrough" element={<OnboardingWalkthrough />} />
        <Route path="/wallet" element={<WalletSelection />} />
        <Route path="/setup" element={<NewUserSetup />} />

        {/* Borrower flow */}
        <Route path="/dashboard" element={<BorrowerDashboard />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/loan-confirm" element={<LoanConfirmation />} />
        <Route path="/loan-success" element={<LoanSuccess />} />
        <Route path="/active-loan" element={<ActiveLoanDetail />} />
        <Route path="/repay" element={<Repayment />} />
        <Route path="/repay-success" element={<RepaymentSuccess />} />
        <Route path="/liquidation" element={<LiquidationWarning />} />

        {/* Group Lending flow */}
        <Route path="/group" element={<GroupLending />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/vouch" element={<VouchForMember />} />
        <Route path="/group-vote" element={<GroupLoanRequest />} />

        {/* Lender flow */}
        <Route path="/lender" element={<LenderDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/loan-detail" element={<LoanRequestDetail />} />
        <Route path="/portfolio" element={<LenderPortfolio />} />
        <Route path="/withdraw" element={<YieldWithdrawal />} />

        {/* Identity & Reputation */}
        <Route path="/credit" element={<CreditAssessment />} />
        <Route path="/profile" element={<NftShowcase />} />
        <Route path="/score-breakdown" element={<ScoreBreakdown />} />
        <Route path="/tier-upgrade" element={<TierUpgrade />} />

        {/* Utility & Settings */}
        <Route path="/history" element={<TransactionHistory />} />
        <Route path="/share" element={<ShareableLoanRequest />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dispute" element={<DisputeScreen />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/invite" element={<InviteFriends />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
