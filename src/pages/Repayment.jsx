import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

export default function Repayment() {
  const [method, setMethod] = useState('full');

  return (
    <AppShell>
      {/* Timer */}
      <div className="flex flex-col items-center justify-center text-center" style={{ padding: '32px 0' }}>
        <p className="text-micro" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Time Remaining</p>
        <div style={{
          position: 'relative', width: 192, height: 192, borderRadius: '50%',
          border: '4px solid rgba(239,68,68,0.3)',
          boxShadow: '0 0 30px rgba(239,68,68,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="text-center">
            <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--red)', letterSpacing: '-0.02em' }}>01:04</div>
            <div className="text-micro" style={{ color: 'rgba(239,68,68,0.6)' }}>Day : Hours</div>
          </div>
          <svg style={{ position: 'absolute', width: '100%', height: '100%', padding: 8, transform: 'rotate(-90deg)' }}>
            <circle cx="50%" cy="50%" r="45%" stroke="var(--red)" strokeWidth="4" fill="transparent" strokeDasharray="283" strokeDashoffset="220" />
          </svg>
        </div>
        <p className="flex items-center gap-1" style={{ marginTop: 16, color: '#F87171', fontWeight: 500 }}>
          <iconify-icon icon="lucide:alert-circle" width="16" height="16"></iconify-icon>
          Repayment due very soon
        </p>
      </div>

      {/* Streak badge */}
      <div className="flex items-center gap-4" style={{
        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-emphasis)',
        borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 24
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, #F97316, #DC2626)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(234,88,12,0.2)'
        }}>
          <iconify-icon icon="lucide:flame" width="24" height="24" style={{ color: 'white' }}></iconify-icon>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700 }}>3 on-time payments</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Keep your streak to unlock Gold Tier!</p>
        </div>
      </div>

      {/* Loan summary */}
      <div style={{
        background: 'var(--navy-panel)', borderRadius: 'var(--radius-2xl)',
        padding: 24, border: '1px solid var(--border-subtle)', marginBottom: 24
      }}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Borrowed Amount</span>
            <span style={{ fontWeight: 500 }}>$250.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Interest Accrued</span>
            <span style={{ fontWeight: 500 }}>$4.50</span>
          </div>
          <div className="divider" />
          <div className="flex justify-between items-center">
            <span style={{ fontWeight: 700 }}>Total Amount Due</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.02em' }}>$254.50</span>
          </div>
        </div>
      </div>

      {/* Repayment method */}
      <div className="flex flex-col gap-3" style={{ marginBottom: 32 }}>
        <p className="text-micro" style={{ color: 'var(--text-secondary)', marginLeft: 4, marginBottom: 8 }}>Repayment Method</p>

        <label
          className={`radio-card ${method === 'full' ? 'radio-card--selected' : ''}`}
          onClick={() => setMethod('full')}
        >
          <div className="flex items-center gap-3">
            <div className={`radio-dot ${method === 'full' ? 'radio-dot--selected' : ''}`}>
              {method === 'full' && <div className="radio-dot__inner" />}
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: 14, display: 'block' }}>Full Amount</span>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>$254.50 (Recommended)</span>
            </div>
          </div>
          {method === 'full' && <iconify-icon icon="lucide:check-circle" width="18" height="18" style={{ color: 'var(--gold)' }}></iconify-icon>}
        </label>

        <label
          className={`radio-card ${method === 'partial' ? 'radio-card--selected' : ''}`}
          onClick={() => setMethod('partial')}
        >
          <div className="flex items-center gap-3">
            <div className={`radio-dot ${method === 'partial' ? 'radio-dot--selected' : ''}`}>
              {method === 'partial' && <div className="radio-dot__inner" />}
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: 14, display: 'block', color: 'var(--text-secondary)' }}>Partial Repayment</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Choose custom amount</span>
            </div>
          </div>
        </label>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-4">
        <Link to="/repay-success" className="btn-primary" id="repay-now-btn" style={{ boxShadow: 'var(--shadow-gold)' }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Repay Now</span>
          <iconify-icon icon="lucide:arrow-right" width="20" height="20"></iconify-icon>
        </Link>
        <div className="text-center" style={{ maxWidth: 280, margin: '0 auto' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 11, lineHeight: 1.6 }}>
            <iconify-icon icon="lucide:trending-up" width="14" height="14" style={{ color: 'var(--teal)', verticalAlign: 'middle' }}></iconify-icon>
            {' '}On-time repayment will boost your reputation score by <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>+15 points</span> and increase your borrow limit.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
