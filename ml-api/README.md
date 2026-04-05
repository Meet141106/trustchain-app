# TrustLend AI Engine: Parameter Architecture

TrustLend replaces traditional credit bureaus with a decentralized, behavioral AI engine. Below is the technical breakdown of the features engineered for our machine learning models, explaining why each data point was selected and how it serves the unbanked.

## 1. AI Trust Score Calculator (Random Forest)
This model defines a user's financial identity without requiring a traditional bank account or credit history. It outputs a score from 0–100.

| Parameter | Weight | Reason for Selection | How it Helps the Protocol |
| :--- | :--- | :--- | :--- |
| `repayment_history` | 30% | The most direct indicator of creditworthiness. Did they pay back what they owed? | Creates a hard, mathematical baseline for reliability. Rewards consistency and harshly punishes default. |
| `repayment_speed` | 20% | Paying on time is good; paying early shows surplus capital and high financial discipline. | Differentiates "average" from "excellent" borrowers, accelerating score growth for responsible users. |
| `voucher_quality` | 15% | Social capital is the collateral of the unbanked. A vouch from a highly trusted user is worth more. | Prevents bad actors from gaming the system by having low-reputation wallets vouch for them. |
| `loan_to_repay_ratio` | 15% | Measures debt burden (Total Borrowed vs. Total Repaid). | Prevents the platform from trapping vulnerable users in a cycle of insurmountable debt. |
| `vouch_balance` | 10% | A healthy peer-to-peer network requires give and take (Vouches Given vs. Received). | Identifies and penalizes "leechers" who extract social capital without putting their own stakes on the line. |
| `tx_frequency` | 10% | Active wallets belong to real humans doing real economic activity. | Acts as a passive proof-of-humanity check, ensuring the wallet isn't a dormant shell. |

---

## 2. Adaptive Repayment Scheduler (K-Means Clustering)
This model shifts the platform from a rigid traditional bank to a humane, empathetic DeFi protocol by identifying earning archetypes.

| Parameter | Reason for Selection | How it Helps the Protocol |
| :--- | :--- | :--- |
| `tx_per_month` | Tells us *how often* the user generates income or moves money. | Separates gig workers (high frequency) from salary workers so the protocol maps to their life. |
| `avg_days_between_tx` | Reveals the "dry spells" in a user's cash flow. | Identifies agricultural/seasonal earners who need extended grace periods before repayment is due. |

---

## 3. Fraud & Sybil Check (Isolation Forest + Rules)
The security layer that protects individual lenders from organized extraction and bot rings.

| Parameter | Reason for Selection | How it Helps the Protocol |
| :--- | :--- | :--- |
| `vouch_reqs_24h` | Normal humans ask 2–3 friends for a vouch. Bots run scripts to ask 50. | Acts as an immediate, hard-rule tripwire to freeze accounts exhibiting spam velocity. |
| `avg_voucher_age` | Sybil attackers generate hundreds of fresh wallets in seconds to fake consensus. | Ensures a user's trust network is backed by historically active participants, not Day-1 burner wallets. |
| `network_density` | Organic networks are sprawling. Scammers create isolated, closed-loop rings. | Anomaly detection mathematically flags unnatural "islands" of vouching activity for community review. |

---

## 4. Dynamic Interest Rate Engine (P2P Algorithmic Pricing)
Calculates a fair, risk-adjusted yield for the individual lender funding a specific P2P loan.

| Parameter | Reason for Selection | How it Helps the Protocol |
| :--- | :--- | :--- |
| `trust_score` | Represents the historical behavioral risk of the borrower. | Incentivizes borrowers to build their score, as a higher score directly lowers their interest rate. |
| `loan_duration_days` | Measures the time-value of money. Locking up capital longer carries higher opportunity cost. | Ensures lenders are fairly compensated with higher yield for long-term P2P lockups. |
| `vouch_coverage_pct` | The percentage of the loan backed by voucher stakes. | If a loan is 100% backed by vouchers, it is risk-free for the lender, drastically lowering the interest rate. |
