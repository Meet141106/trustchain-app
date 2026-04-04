import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import FilterChips from '../components/FilterChips';
import StatusBadge from '../components/StatusBadge';

const filterItems = ['All', 'Loans', 'Repayments', 'Rewards'];

const transactions = [
  {
    type: 'Repayment', date: 'Oct 24, 2023', amount: '$1,250.00',
    status: 'Confirmed', statusVariant: 'success',
    iconBg: 'rgba(45,212,191,0.1)', iconColor: 'var(--teal)', icon: 'lucide:arrow-up-right',
    titleColor: 'var(--teal)',
    hash: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', hasExplorer: true
  },
  {
    type: 'Borrow', date: 'Oct 22, 2023', amount: '$2,000.00',
    status: 'Confirmed', statusVariant: 'success',
    iconBg: 'rgba(255,255,255,0.05)', iconColor: 'white', icon: 'lucide:arrow-down-left',
    titleColor: 'white',
    hash: '0xb4cf539739df2c5dacb4c659f2488d7a250d5630', hasExplorer: true
  },
  {
    type: 'Risk Warning', date: 'Oct 20, 2023', amount: '-',
    status: 'System', statusVariant: 'danger',
    iconBg: 'rgba(239,68,68,0.1)', iconColor: 'var(--red)', icon: 'lucide:alert-triangle',
    titleColor: 'var(--red)', danger: true,
    detail: 'Your health factor dropped below 1.2. Please add collateral to avoid potential liquidation of your active loan position.',
    actionLabel: 'Manage Collateral', actionColor: 'var(--red)'
  },
  {
    type: 'Reward', date: 'Oct 15, 2023', amount: '$45.20',
    status: 'Pending', statusVariant: 'warning',
    iconBg: 'rgba(245,166,35,0.1)', iconColor: 'var(--gold)', icon: 'lucide:star',
    titleColor: 'var(--gold)',
    detail: 'Rewards are processed every 14 days. This will be available for withdrawal on Oct 29.',
    actionLabel: 'Reward Details', actionColor: 'var(--gold)'
  },
  {
    type: 'Borrow', date: 'Sep 30, 2023', amount: '$500.00',
    status: 'Confirmed', statusVariant: 'success',
    iconBg: 'rgba(255,255,255,0.05)', iconColor: 'white', icon: 'lucide:arrow-down-left',
    titleColor: 'white',
    hash: '0x39df2c5dacb4c659f2488d7a250d5630b4cf5397', hasExplorer: true
  },
];

export default function TransactionHistory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <AppShell>
      <h1 className="text-h2" style={{ marginBottom: 24 }}>History</h1>

      <div style={{ marginBottom: 16 }}>
        <FilterChips items={filterItems} active={activeFilter} onSelect={setActiveFilter} />
      </div>

      <div className="flex flex-col gap-2">
        {transactions.map((tx, i) => (
          <div key={i} className={`tx-row ${tx.danger ? 'tx-row--danger' : ''}`}>
            <div className="tx-row__header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <div className="flex items-center gap-4">
                <div className="tx-row__icon" style={{ background: tx.iconBg }}>
                  <iconify-icon icon={tx.icon} width="20" height="20" style={{ color: tx.iconColor }}></iconify-icon>
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: tx.titleColor }}>{tx.type}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p style={{ fontWeight: 700, fontSize: 16, color: tx.danger ? '#F87171' : 'var(--text-primary)' }}>{tx.amount}</p>
                <StatusBadge variant={tx.statusVariant}>{tx.status}</StatusBadge>
              </div>
            </div>

            {openIndex === i && (
              <div className="tx-row__details">
                {tx.hash && (
                  <>
                    <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Transaction Hash</p>
                    <p className="font-mono" style={{
                      fontSize: 12, color: 'var(--text-secondary)',
                      background: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 8,
                      wordBreak: 'break-all', marginBottom: 16
                    }}>{tx.hash}</p>
                  </>
                )}
                {tx.detail && (
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>{tx.detail}</p>
                )}
                {tx.hasExplorer && (
                  <a href="#" className="flex items-center justify-center gap-2" style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>
                    View on explorer
                    <iconify-icon icon="lucide:external-link" width="14" height="14"></iconify-icon>
                  </a>
                )}
                {tx.actionLabel && !tx.hasExplorer && (
                  <button className="flex items-center justify-center gap-2 w-full" style={{
                    fontSize: 12, fontWeight: 700, color: tx.actionColor,
                    background: tx.danger ? 'rgba(239,68,68,0.05)' : 'transparent',
                    padding: 8, borderRadius: 8
                  }}>
                    {tx.actionLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Immutable note */}
      <div className="flex flex-col items-center text-center" style={{ padding: '32px 24px 16px' }}>
        <iconify-icon icon="lucide:shield" width="24" height="24" style={{ color: 'var(--text-muted)', marginBottom: 8 }}></iconify-icon>
        <p className="text-micro" style={{ color: 'var(--text-tertiary)', lineHeight: 1.8, letterSpacing: '0.1em' }}>
          All transactions are immutable<br />and publicly verifiable on-chain.
        </p>
      </div>
    </AppShell>
  );
}
