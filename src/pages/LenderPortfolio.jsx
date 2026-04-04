import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const activeInvestments = [
  { id: 1, borrower: '#2941', amount: '$1,200', apy: '14%', earned: '$24.50', endsIn: '12 Days', status: 'Healthy', color: 'var(--emerald)' },
  { id: 2, borrower: '#1082', amount: '$2,500', apy: '11%', earned: '$18.20', endsIn: '4 Days', status: 'At Risk', color: 'var(--gold)' },
  { id: 3, borrower: '#9931', amount: '$500', apy: '8.5%', earned: '$4.10', endsIn: '24 Days', status: 'Healthy', color: 'var(--emerald)' },
];

export default function LenderPortfolio() {
  return (
    <AppShell backTo="/lender" backLabel="Home">
       <h1 className="text-h2" style={{ marginBottom: 24 }}>Active Investments</h1>

       <div className="flex flex-col gap-4">
          {activeInvestments.map((inv) => (
             <div key={inv.id} className="glass-card" style={{ padding: 20, borderLeft: `4px solid ${inv.color}` }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
                   <div>
                      <p style={{ fontWeight: 700, fontSize: 16 }}>Borrower {inv.borrower}</p>
                      <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Ends in {inv.endsIn}</p>
                   </div>
                   <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 700, color: inv.color }}>
                      {inv.status}
                   </div>
                </div>

                <div className="stats-grid--3" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                   <div>
                      <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Principal</p>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{inv.amount}</p>
                   </div>
                   <div>
                      <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>APY Rate</p>
                      <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--gold)' }}>{inv.apy}</p>
                   </div>
                   <div>
                      <p className="text-micro" style={{ color: 'var(--text-tertiary)' }}>Earned</p>
                      <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--emerald)' }}>+{inv.earned}</p>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </AppShell>
  );
}
