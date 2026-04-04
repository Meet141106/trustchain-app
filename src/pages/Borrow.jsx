import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function Borrow() {
  const [amount, setAmount] = useState(2500);
  const [duration, setDuration] = useState(12);
  const [loanType, setLoanType] = useState('solo');

  const durationLabel = duration <= 4 ? `${duration} Week${duration > 1 ? 's' : ''}` : `${Math.round(duration / 4)} Month${Math.round(duration / 4) > 1 ? 's' : ''}`;
  const interestRate = 4.2;
  const totalRepayment = (amount * (1 + interestRate / 100)).toFixed(2);
  const monthlyPayment = (totalRepayment / Math.max(1, Math.round(duration / 4))).toFixed(2);

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        {/* Amount input */}
        <div className="text-center">
          <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>Borrow Amount</p>
          <div className="flex items-center justify-center gap-2">
            <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.02em' }}>$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{
                background: 'transparent', fontSize: 48, fontWeight: 700,
                letterSpacing: '-0.02em', width: 192, textAlign: 'center',
                border: 'none', outline: 'none', color: 'var(--text-primary)'
              }}
            />
          </div>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 12, marginTop: 8 }}>Available limit: $5,000</p>
        </div>

        {/* Duration slider */}
        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-emphasis)',
          borderRadius: 'var(--radius-2xl)', padding: 24
        }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Duration</span>
            <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{durationLabel}</span>
          </div>
          <input
            type="range" min="1" max="24" value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{
              width: '100%',
              backgroundSize: `${((duration - 1) / 23) * 100}% 100%`,
              backgroundImage: 'linear-gradient(var(--gold), var(--gold))',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="flex justify-between" style={{ marginTop: 8 }}>
            <span className="text-micro" style={{ color: 'var(--text-tertiary)' }}>1 Week</span>
            <span className="text-micro" style={{ color: 'var(--text-tertiary)' }}>6 Months</span>
          </div>
        </div>

        {/* Solo / Group toggle */}
        <div className="toggle-group">
          <button
            className={`toggle-group__btn ${loanType === 'solo' ? 'toggle-group__btn--active' : 'toggle-group__btn--inactive'}`}
            onClick={() => setLoanType('solo')}
          >
            <iconify-icon icon="lucide:user" width="18" height="18"></iconify-icon>
            Solo Loan
          </button>
          <button
            className={`toggle-group__btn ${loanType === 'group' ? 'toggle-group__btn--active' : 'toggle-group__btn--inactive'}`}
            onClick={() => setLoanType('group')}
          >
            <iconify-icon icon="lucide:users" width="18" height="18"></iconify-icon>
            Group Loan
          </button>
        </div>

        {/* Details grid */}
        <div className="stats-grid">
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-emphasis)',
            borderRadius: 'var(--radius-2xl)', padding: 20
          }}>
            <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Interest Rate</p>
            <p style={{ fontSize: 20, fontWeight: 700 }}>
              {interestRate}% <span style={{ fontSize: 12, color: 'var(--emerald)', fontWeight: 400, marginLeft: 4 }}>-1% Rep Bonus</span>
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-emphasis)',
            borderRadius: 'var(--radius-2xl)', padding: 20
          }}>
            <p className="text-micro" style={{ color: 'var(--text-tertiary)', marginBottom: 4 }}>Collateral</p>
            <div className="flex items-center gap-1">
              <iconify-icon icon="lucide:shield-check" width="16" height="16" style={{ color: 'var(--gold)' }}></iconify-icon>
              <p style={{ fontSize: 20, fontWeight: 700 }}>None</p>
            </div>
          </div>
        </div>

        {/* Total repayment */}
        <div style={{
          background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)',
          borderRadius: 'var(--radius-2xl)', padding: 24
        }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Total Repayment</span>
            <span style={{ fontSize: 24, fontWeight: 700 }}>${totalRepayment}</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>${monthlyPayment} / month for {durationLabel}</p>
        </div>

        {/* CTA */}
        <Link to="/loan-confirm" className="btn-primary btn-primary--lg" id="request-loan-btn">
          <span>Request Loan</span>
          <iconify-icon icon="lucide:arrow-right" width="20" height="20"></iconify-icon>
        </Link>
      </div>
    </AppShell>
  );
}
