import { useState } from 'react';
import AppShell from '../components/AppShell';
import FilterChips from '../components/FilterChips';

const filters = ['All Requests', 'Low Risk', 'High Yield', 'Group Loans'];

const loanRequests = [
  {
    id: 'TR-9421', risk: 'Low Risk', riskColor: 'var(--emerald)', borderColor: 'var(--emerald)',
    riskIcon: 'lucide:shield-check', stars: 4.5, amount: '$1,200', currency: 'USDT',
    desc: 'Verified Personal Loan', apy: '8.5%', apyColor: 'var(--emerald)',
    term: '3 mo', collateral: 'Reputation', primary: true
  },
  {
    id: 'TR-8820', risk: 'Medium Risk', riskColor: '#FBBF24', borderColor: '#F59E0B',
    riskIcon: 'lucide:alert-circle', stars: 3, amount: '$3,500', currency: 'USDT',
    desc: 'Micro-Entrepreneurial Credit', apy: '14.2%', apyColor: '#FBBF24',
    term: '6 mo', collateral: 'ETH', primary: false
  },
  {
    id: 'TR-1255', risk: 'High Yield', riskColor: '#FB7185', borderColor: '#F43F5E',
    riskIcon: 'lucide:trending-up', stars: 2, amount: '$8,200', currency: 'USDT',
    desc: 'Mumbai Circle #4 (Group Loan)', apy: '22.5%', apyColor: '#FB7185',
    term: '12 mo', collateral: 'Group', primary: false
  },
];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex gap-1">
      {Array(full).fill(0).map((_, i) => <iconify-icon key={`f${i}`} icon="mdi:star" width="14" height="14" style={{ color: 'var(--gold)' }} />)}
      {half && <iconify-icon icon="mdi:star-half-full" width="14" height="14" style={{ color: 'var(--gold)' }} />}
      {Array(empty).fill(0).map((_, i) => <iconify-icon key={`e${i}`} icon="mdi:star-outline" width="14" height="14" style={{ color: 'var(--text-muted)' }} />)}
    </div>
  );
}

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState('All Requests');

  return (
    <AppShell>
      {/* Title */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <h1 className="text-h2">Marketplace</h1>
        <button className="flex items-center gap-1" style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700 }}>
          <iconify-icon icon="lucide:sliders-horizontal" width="18" height="18"></iconify-icon>
          Sort
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 24 }}>
        <FilterChips items={filters} active={activeFilter} onSelect={setActiveFilter} />
      </div>

      {/* Loan cards */}
      <div className="flex flex-col gap-4">
        {loanRequests.map((loan) => (
          <div key={loan.id} className="loan-card loan-card--bordered" style={{ borderLeftColor: loan.borderColor }}>
            <div className="flex justify-between items-start" style={{ marginBottom: 16 }}>
              <div>
                <span className="text-micro" style={{ color: 'var(--text-tertiary)', display: 'block', marginBottom: 4 }}>Request ID: #{loan.id}</span>
                <div className="flex items-center gap-1" style={{ color: loan.riskColor, fontWeight: 700, fontSize: 12 }}>
                  <iconify-icon icon={loan.riskIcon} width="14" height="14"></iconify-icon>
                  {loan.risk}
                </div>
              </div>
              <StarRating rating={loan.stars} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
                {loan.amount} <span style={{ fontSize: 14, color: 'var(--text-tertiary)', fontWeight: 400 }}>{loan.currency}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{loan.desc}</div>
            </div>

            <div className="stats-grid--3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <div className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>APY</div>
                <div style={{ fontWeight: 700, color: loan.apyColor }}>{loan.apy}</div>
              </div>
              <div>
                <div className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Term</div>
                <div style={{ fontWeight: 700 }}>{loan.term}</div>
              </div>
              <div>
                <div className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Collateral</div>
                <div style={{ fontWeight: 700 }}>{loan.collateral}</div>
              </div>
            </div>

            {loan.primary ? (
              <button className="btn-primary" style={{ height: 48, fontSize: 14, borderRadius: 'var(--radius-md)' }} id={`fund-loan-${loan.id}`}>
                Fund This Loan
              </button>
            ) : (
              <button className="btn-outline-gold" id={`fund-loan-${loan.id}`}>
                Fund This Loan
              </button>
            )}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
