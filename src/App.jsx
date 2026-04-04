import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import WalletSelection from './pages/WalletSelection';
import DashboardBorrower from './pages/DashboardBorrower';
import BorrowScreen from './pages/BorrowScreen';
import LoanConfirmation from './pages/LoanConfirmation';
import DashboardLender from './pages/DashboardLender';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import RepayScreen from './pages/RepayScreen';
import GroupLending from './pages/GroupLending';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Onboarding />} />
          <Route path="/wallet-selection" element={<WalletSelection />} />
          <Route path="/borrower-dashboard" element={<DashboardBorrower />} />
          <Route path="/borrow" element={<BorrowScreen />} />
          <Route path="/loan-confirm" element={<LoanConfirmation />} />
          <Route path="/repay" element={<RepayScreen />} />
          <Route path="/lender-dashboard" element={<DashboardLender />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groups" element={<GroupLending />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
