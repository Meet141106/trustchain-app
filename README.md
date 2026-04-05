# TrustLend — AI-Governed Decentralized P2P Lending

> Credit without banks. Trust without borders.

A decentralized micro-lending platform that enables 
secure borrowing and lending for individuals without 
access to formal banking — replacing traditional credit 
systems with on-chain reputation, community trust, 
and adaptive AI risk scoring.

## The Problem
1.4 billion adults globally remain unbanked.
Existing DeFi lending requires crypto collateral 
that the unbanked don't have.
TrustLend solves this with Trust Score as collateral.

## Architecture

```
Frontend (React + Vite)
        │
        ├── Supabase (Real-time marketplace data)
        ├── ML API (FastAPI — AI risk engine)  
        └── Blockchain (Hardhat / Polygon Amoy)
                ├── TrustToken.sol (ERC-20)
                ├── ReputationNFT.sol (Soulbound)
                ├── LendingPool.sol (Core engine)
                ├── VouchSystem.sol (Social guarantee)
                └── StableToken.sol (Mock stable)
```

## ML Models
| Endpoint | Model | Purpose |
|----------|-------|---------|
| /api/v1/trust-score | Random Forest | Credit scoring 0-100 |
| /api/v1/fraud-check | Isolation Forest | Sybil detection |
| /api/v1/repayment-schedule | K-Means | Earning archetype |
| /api/v1/interest-rate | Rule-based | Dynamic APR |

## Quick Start (Local)

### Prerequisites
- Node.js 18+
- Python 3.11+
- MetaMask browser extension

### 1. Clone & Install
```bash
git clone https://github.com/Meet141106/trustchain-app.git
cd trustchain-app
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Fill in your Supabase URL and anon key in .env
```

### 3. Start Blockchain
```bash
npm run blockchain:start
# Starts Hardhat node + deploys contracts + seeds demo data
```

### 4. Start ML API
```bash
cd ml-api
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### 5. Start Frontend
```bash
# In new terminal, from project root
npm run dev
```

### 6. Add MetaMask Network
```
Network Name: TrustLend Local
RPC URL:      http://127.0.0.1:8545
Chain ID:     31337
Symbol:       ETH
```

### 7. Import Demo Wallets
```
Borrower: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Lender:   0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
(Keys available in Hardhat node output)
```

### 8. Verify All Systems
Visit: http://localhost:5173/diagnostics

## Deployment

### ML API → Render.com
1. Go to render.com → New Web Service
2. Connect this GitHub repo
3. Set Root Directory: ml-api
4. Build: pip install -r requirements.txt
5. Start: uvicorn app:app --host 0.0.0.0 --port $PORT
6. Add environment variables in Render dashboard
7. Update VITE_ML_API_URL in .env

### Frontend → Vercel
1. Go to vercel.com → Import Git Repository
2. Connect this GitHub repo
3. Add all VITE_ environment variables
4. Deploy

## Smart Contracts (Local)
| Contract | Address |
|----------|---------|
| TrustToken | 0x5FbDB2315678afecb367f032d93F642f64180aa3 |
| ReputationNFT | 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 |
| VouchSystem | 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 |
| LendingPool | 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 |

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Blockchain**: Solidity, Hardhat, OpenZeppelin, Ethers.js v6
- **AI/ML**: FastAPI, Scikit-learn, XGBoost, Pandas
- **Database**: Supabase (PostgreSQL + Real-time)
- **Network**: Polygon (Amoy Testnet)

## License
MIT
