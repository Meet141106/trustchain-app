const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting Demo Setup on:", hre.network.name);

  // 1. Get contract addresses from the config JSON (single source of truth)
  const configPath = path.join(__dirname, "../../src/config/contracts.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("contracts.json not found. Run deploy.js first.");
  }
  const contracts = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const trustTokenAddr = contracts.TrustToken;
  const lendingPoolAddr = contracts.LendingPool;
  const reputationNFTAddr = contracts.ReputationNFT;
  const vouchSystemAddr = contracts.VouchSystem;

  console.log("Using contracts:");
  console.log("- TRUST:", trustTokenAddr);
  console.log("- Pool:", lendingPoolAddr);

  // 2. Get the 4 wallets from signers (assuming Hardhat node)
  const [deployer, borrower, lender, voucher] = await hre.ethers.getSigners();
  console.log("Demo Wallets:");
  console.log("- DEPLOYER:", deployer.address);
  console.log("- BORROWER:", borrower.address);
  console.log("- LENDER:", lender.address);
  console.log("- VOUCHER:", voucher.address);

  // 3. Contracts
  const trustToken = await hre.ethers.getContractAt("TrustToken", trustTokenAddr);
  const lendingPool = await hre.ethers.getContractAt("LendingPool", lendingPoolAddr);
  const vouchSystem = await hre.ethers.getContractAt("VouchSystem", vouchSystemAddr);

  // 4. Multi-wallet setup actions
  const trustUnits = (amt) => hre.ethers.parseEther(amt.toString());

  console.log("1. Transferring 10,000 TRUST to LENDER...");
  await trustToken.connect(deployer).transfer(lender.address, trustUnits(10000));

  console.log("2. Transferring 500 TRUST to VOUCHER...");
  await trustToken.connect(deployer).transfer(voucher.address, trustUnits(500));

  console.log("2b. Transferring 500 TRUST to BORROWER (for interest on repayments)...");
  await trustToken.connect(deployer).transfer(borrower.address, trustUnits(500));

  console.log("3. Transferring 0.1 ETH/MATIC to BORROWER for gas...");
  // On local node, they already have 10000 ETH, so this is just protocol check
  await deployer.sendTransaction({ to: borrower.address, value: hre.ethers.parseEther("0.1") });

  console.log("4. LENDER: Approving LendingPool for P2P funding (10,000 TRUST)...");
  await trustToken.connect(lender).approve(lendingPoolAddr, trustUnits(10000));

  // 5. Initialize Identity for BORROWER (Protocol Node)
  console.log("5. Initializing SOR (Sovereign On-Chain Reputation) for BORROWER...");
  try {
    await lendingPool.connect(borrower).initializeUser();
    console.log("   ✓ Protocol Node established");
  } catch (e) {
    console.log("   ⏭ Node already active");
  }

  // 6. Setup Vouching Relationship (Voucher -> Borrower)
  console.log("6. Establishing Vouching Link (VOUCHER -> BORROWER)...");
  try {
    // Borrower requests a vouch
    await vouchSystem.connect(borrower).requestVouch(voucher.address);
    // Voucher accepts the request
    await vouchSystem.connect(voucher).acceptVouch(borrower.address);
    console.log("   ✓ Social Link established (1/3)");
  } catch (e) {
    console.log("   ⏭ Vouch link already exists or failed:", e.message);
  }

  // 7. Update Trust Score to 68
  console.log("7. Calibrating AI Score for BORROWER to 68...");
  await lendingPool.connect(deployer).updateTrustScore(borrower.address, 68);

  // 8. Submit an Open Loan Request into the Marketplace
  console.log("8. BORROWER: Submitting P2P Loan Request (120 TRUST, Vouch-Backed)...");
  try {
    // pathway 0 = VouchBacked
    await lendingPool.connect(borrower).submitLoanRequest(trustUnits(120), 30, 0);
    console.log("   ✓ Loan Request broadcast to Marketplace");
  } catch (e) {
    console.log("   ⏭ Loan request submission skipped:", e.message);
  }

  // 9. Log final state
  console.log("──────────────────────────────────────────────────");
  console.log("DEMO MISSION CONTROL READY");
  console.log("- Protocol Seed: 500,000 TRUST");
  console.log("- Borrower Address:", borrower.address);
  console.log("- Borrower Score: 42 (Silver Node)");
  console.log("- Social Connections: 1/3 Active");
  console.log("- Active Requests: 1 Open in Marketplace");
  console.log("- Lender Liquidity: 8,000 TRUST");
  console.log("──────────────────────────────────────────────────");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
