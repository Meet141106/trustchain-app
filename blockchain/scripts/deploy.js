const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n🚀 Deploying TrustLend contracts with:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("   Deployer balance:", ethers.formatEther(balance), "MATIC\n");

  /* ── 1. Deploy StableToken ── */
  console.log("📦 Deploying StableToken...");
  const StableToken = await ethers.getContractFactory("StableToken");
  const token = await StableToken.deploy();
  await token.waitForDeployment();
  const tokenAddr = await token.getAddress();
  console.log("   ✅ StableToken:", tokenAddr);

  /* ── 2. Deploy LendingPool ── */
  console.log("📦 Deploying LendingPool...");
  const LendingPool = await ethers.getContractFactory("LendingPool");
  const pool = await LendingPool.deploy(tokenAddr);
  await pool.waitForDeployment();
  const poolAddr = await pool.getAddress();
  console.log("   ✅ LendingPool:", poolAddr);

  /* ── 3. Deploy VouchSystem ── */
  console.log("📦 Deploying VouchSystem...");
  const VouchSystem = await ethers.getContractFactory("VouchSystem");
  // Treasury = deployer address for demo (slash proceeds go here)
  const vouch = await VouchSystem.deploy(tokenAddr, deployer.address);
  await vouch.waitForDeployment();
  const vouchAddr = await vouch.getAddress();
  console.log("   ✅ VouchSystem:", vouchAddr);

  /* ── 4. Seed the pool with initial liquidity ── */
  console.log("\n💧 Seeding LendingPool with 100,000 TLD...");
  const seedAmount = ethers.parseUnits("100000", 18);
  const approveTx = await token.approve(poolAddr, seedAmount);
  await approveTx.wait();
  const depositTx = await pool.depositLiquidity(seedAmount);
  await depositTx.wait();
  console.log("   ✅ Pool seeded.");

  /* ── 5. Mint test tokens to deployer for demo ── */
  console.log("\n🪙  Minting 50,000 TLD to deployer for testing...");
  const testAmount = ethers.parseUnits("50000", 18);
  const mintTx = await token.mint(deployer.address, testAmount);
  await mintTx.wait();
  console.log("   ✅ Done.");

  /* ── 6. Write deployed addresses to frontend ── */
  const addresses = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployedAt: new Date().toISOString(),
    StableToken:  tokenAddr,
    LendingPool:  poolAddr,
    VouchSystem:  vouchAddr,
  };

  // Save inside /blockchain for reference
  fs.writeFileSync(
    path.join(__dirname, "../deployed.json"),
    JSON.stringify(addresses, null, 2)
  );

  // Also write to frontend lib directory
  const frontendPath = path.join(__dirname, "../../src/lib/contracts.json");
  fs.writeFileSync(frontendPath, JSON.stringify(addresses, null, 2));

  console.log("\n📋 deployed.json written.");
  console.log("📋 src/lib/contracts.json updated for frontend.\n");

  console.log("═══════════════════════════════════════════");
  console.log("  DEPLOYMENT COMPLETE");
  console.log("═══════════════════════════════════════════");
  console.log("  StableToken  :", tokenAddr);
  console.log("  LendingPool  :", poolAddr);
  console.log("  VouchSystem  :", vouchAddr);
  console.log("  Pool Liquidity: 100,000 TLD");
  console.log("═══════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
