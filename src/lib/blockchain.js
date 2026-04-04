/**
 * blockchain.js — TrustLend ethers.js integration layer
 *
 * Wraps all smart-contract interactions behind clean async functions.
 * Import individual functions wherever needed in the React app.
 *
 * Usage:
 *   import { createLoan, repayLoan } from './blockchain';
 */

import { ethers } from 'ethers';
import ADDRESSES from './contracts.json';

/* ══════════════════════════════════════════
   MINIMAL ABIs (only functions we call)
═══════════════════════════════════════════ */

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint256 amount) returns (bool)',
];

const LENDING_POOL_ABI = [
  'function depositLiquidity(uint256 amount)',
  'function createLoan(uint256 amount) returns (uint256)',
  'function approveLoan(uint256 loanId)',
  'function repayLoan(uint256 loanId)',
  'function markDefault(uint256 loanId)',
  'function getLoan(uint256 loanId) view returns (tuple(uint256 id, address borrower, uint256 amount, uint8 status, uint256 createdAt))',
  'function getBorrowerLoans(address borrower) view returns (uint256[])',
  'function totalLiquidity() view returns (uint256)',
  'function getPoolBalance() view returns (uint256)',
  'event LoanCreated(uint256 indexed loanId, address indexed borrower, uint256 amount)',
  'event LoanApproved(uint256 indexed loanId, address indexed borrower, uint256 amount)',
  'event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 amount)',
];

const VOUCH_SYSTEM_ABI = [
  'function stakeForBorrower(address borrower, uint256 amount) returns (uint256)',
  'function releaseStake(uint256 vouchId)',
  'function slashStake(uint256 vouchId)',
  'function getVouch(uint256 vouchId) view returns (tuple(uint256 id, address voucher, address borrower, uint256 amount, bool released, bool slashed))',
  'function getBorrowerVouches(address borrower) view returns (uint256[])',
  'function getTotalActiveStake(address borrower) view returns (uint256)',
  'event VouchStaked(uint256 indexed vouchId, address indexed voucher, address indexed borrower, uint256 amount)',
  'event VouchReleased(uint256 indexed vouchId, address indexed voucher, uint256 amount)',
  'event VouchSlashed(uint256 indexed vouchId, address indexed voucher, uint256 amount)',
];

/* ══════════════════════════════════════════
   PROVIDER / SIGNER HELPERS
═══════════════════════════════════════════ */

/** Returns a read-write signer from MetaMask. Throws if not connected. */
export async function getSigner() {
  if (!window.ethereum) throw new Error('MetaMask not found. Please install it.');
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
}

/** Returns just a read-only provider (no wallet needed). */
export function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask not found.');
  return new ethers.BrowserProvider(window.ethereum);
}

/** Returns contract instances bound to a signer. */
async function getContracts() {
  const signer = await getSigner();
  return {
    token: new ethers.Contract(ADDRESSES.StableToken, ERC20_ABI, signer),
    pool:  new ethers.Contract(ADDRESSES.LendingPool, LENDING_POOL_ABI, signer),
    vouch: new ethers.Contract(ADDRESSES.VouchSystem, VOUCH_SYSTEM_ABI, signer),
    signer,
  };
}

/** Convert a human-readable amount to token units (18 decimals). */
const toUnits = (n) => ethers.parseUnits(String(n), 18);

/** Convert token units back to a readable number. */
const fromUnits = (n) => parseFloat(ethers.formatUnits(n, 18));

/* ══════════════════════════════════════════
   CONTRACT NOT DEPLOYED GUARD
═══════════════════════════════════════════ */

function checkDeployed() {
  if (!ADDRESSES.LendingPool) {
    throw new Error(
      'Contracts not deployed yet. Run: cd blockchain && npm run deploy:local'
    );
  }
}

/* ══════════════════════════════════════════
   STABLE TOKEN FUNCTIONS
═══════════════════════════════════════════ */

/**
 * Get the TLD token balance of an address.
 * @param {string} address Wallet address to query.
 * @returns {Promise<number>} Balance in human-readable units.
 */
export async function getTokenBalance(address) {
  checkDeployed();
  const provider = getProvider();
  const token = new ethers.Contract(ADDRESSES.StableToken, ERC20_ABI, provider);
  const bal = await token.balanceOf(address);
  return fromUnits(bal);
}

/* ══════════════════════════════════════════
   LENDING POOL FUNCTIONS
═══════════════════════════════════════════ */

/**
 * Lender deposits tokens into the pool.
 * @param {number} amount Human-readable token amount.
 * @returns {Promise<{txHash: string}>}
 */
export async function depositLiquidity(amount) {
  checkDeployed();
  const { token, pool } = await getContracts();
  const units = toUnits(amount);

  // Step 1: approve pool to spend tokens
  console.log('⏳ Approving token spend...');
  const approveTx = await token.approve(ADDRESSES.LendingPool, units);
  await approveTx.wait();

  // Step 2: deposit
  console.log('⏳ Depositing liquidity...');
  const depositTx = await pool.depositLiquidity(units);
  const receipt = await depositTx.wait();

  console.log('✅ Liquidity deposited:', receipt.hash);
  return { txHash: receipt.hash };
}

/**
 * Borrower creates a loan request.
 * @param {number} amount Human-readable token amount to borrow.
 * @returns {Promise<{loanId: number, txHash: string}>}
 */
export async function createLoan(amount) {
  checkDeployed();
  const { pool } = await getContracts();
  const units = toUnits(amount);

  console.log('⏳ Creating loan on-chain...');
  const tx = await pool.createLoan(units);
  const receipt = await tx.wait();

  // Parse the LoanCreated event to get the loanId
  const event = receipt.logs
    .map((log) => { try { return pool.interface.parseLog(log); } catch { return null; } })
    .find((e) => e?.name === 'LoanCreated');

  const loanId = event ? Number(event.args.loanId) : null;
  console.log('✅ Loan created. ID:', loanId, '| Tx:', receipt.hash);
  return { loanId, txHash: receipt.hash };
}

/**
 * Owner approves and funds a pending loan.
 * @param {number} loanId
 * @returns {Promise<{txHash: string}>}
 */
export async function approveLoan(loanId) {
  checkDeployed();
  const { pool } = await getContracts();

  console.log(`⏳ Approving loan #${loanId}...`);
  const tx = await pool.approveLoan(loanId);
  const receipt = await tx.wait();

  console.log('✅ Loan approved:', receipt.hash);
  return { txHash: receipt.hash };
}

/**
 * Borrower repays their active loan.
 * @param {number} loanId
 * @param {number} amount Repayment amount (must match loan.amount).
 * @returns {Promise<{txHash: string}>}
 */
export async function repayLoan(loanId, amount) {
  checkDeployed();
  const { token, pool } = await getContracts();
  const units = toUnits(amount);

  // Step 1: approve pool to pull repayment
  console.log('⏳ Approving repayment...');
  const approveTx = await token.approve(ADDRESSES.LendingPool, units);
  await approveTx.wait();

  // Step 2: repay
  console.log(`⏳ Repaying loan #${loanId}...`);
  const tx = await pool.repayLoan(loanId);
  const receipt = await tx.wait();

  console.log('✅ Loan repaid:', receipt.hash);
  return { txHash: receipt.hash };
}

/**
 * Fetch a single loan from the chain.
 * @param {number} loanId
 * @returns {Promise<{id, borrower, amount, status, createdAt}>}
 */
export async function getLoanOnChain(loanId) {
  checkDeployed();
  const provider = getProvider();
  const pool = new ethers.Contract(ADDRESSES.LendingPool, LENDING_POOL_ABI, provider);
  const loan = await pool.getLoan(loanId);
  const STATUS = ['Pending', 'Active', 'Repaid', 'Defaulted'];
  return {
    id:        Number(loan.id),
    borrower:  loan.borrower,
    amount:    fromUnits(loan.amount),
    status:    STATUS[Number(loan.status)],
    createdAt: Number(loan.createdAt),
  };
}

/**
 * Get all loan IDs for a borrower.
 * @param {string} borrowerAddress
 * @returns {Promise<number[]>}
 */
export async function getBorrowerLoanIds(borrowerAddress) {
  checkDeployed();
  const provider = getProvider();
  const pool = new ethers.Contract(ADDRESSES.LendingPool, LENDING_POOL_ABI, provider);
  const ids = await pool.getBorrowerLoans(borrowerAddress);
  return ids.map(Number);
}

/**
 * Get the pool's total available liquidity.
 * @returns {Promise<number>}
 */
export async function getPoolLiquidity() {
  checkDeployed();
  const provider = getProvider();
  const pool = new ethers.Contract(ADDRESSES.LendingPool, LENDING_POOL_ABI, provider);
  const liq = await pool.totalLiquidity();
  return fromUnits(liq);
}

/* ══════════════════════════════════════════
   VOUCH SYSTEM FUNCTIONS
═══════════════════════════════════════════ */

/**
 * Voucher stakes tokens to back a borrower.
 * @param {string} borrowerAddress
 * @param {number} amount Token amount to stake.
 * @returns {Promise<{vouchId: number, txHash: string}>}
 */
export async function stakeForBorrower(borrowerAddress, amount) {
  checkDeployed();
  const { token, vouch } = await getContracts();
  const units = toUnits(amount);

  // Step 1: approve vouch contract to pull tokens
  console.log('⏳ Approving vouch stake...');
  const approveTx = await token.approve(ADDRESSES.VouchSystem, units);
  await approveTx.wait();

  // Step 2: stake
  console.log(`⏳ Staking ${amount} TLD for ${borrowerAddress}...`);
  const tx = await vouch.stakeForBorrower(borrowerAddress, units);
  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log) => { try { return vouch.interface.parseLog(log); } catch { return null; } })
    .find((e) => e?.name === 'VouchStaked');

  const vouchId = event ? Number(event.args.vouchId) : null;
  console.log('✅ Vouch staked. ID:', vouchId, '| Tx:', receipt.hash);
  return { vouchId, txHash: receipt.hash };
}

/**
 * Get total active stake backing a borrower.
 * @param {string} borrowerAddress
 * @returns {Promise<number>}
 */
export async function getTotalActiveStake(borrowerAddress) {
  checkDeployed();
  const provider = getProvider();
  const vouch = new ethers.Contract(ADDRESSES.VouchSystem, VOUCH_SYSTEM_ABI, provider);
  const stake = await vouch.getTotalActiveStake(borrowerAddress);
  return fromUnits(stake);
}

/* ══════════════════════════════════════════
   NETWORK UTILS
═══════════════════════════════════════════ */

/**
 * Ask MetaMask to switch to Polygon Mumbai.
 */
export async function switchToMumbai() {
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '0x13881',
      chainName: 'Polygon Mumbai Testnet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    }],
  });
}

/**
 * Ask MetaMask to switch to Polygon Amoy (new testnet).
 */
export async function switchToAmoy() {
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '0x13882',
      chainName: 'Polygon Amoy Testnet',
      nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
      rpcUrls: ['https://rpc-amoy.polygon.technology'],
      blockExplorerUrls: ['https://amoy.polygonscan.com'],
    }],
  });
}
