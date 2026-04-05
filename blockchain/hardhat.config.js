require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { 
  PRIVATE_KEY_DEPLOYER, 
  PRIVATE_KEY_BORROWER, 
  PRIVATE_KEY_LENDER, 
  PRIVATE_KEY_VOUCHER, 
  AMOY_RPC_URL, 
  LOCAL_RPC_URL 
} = process.env;

const ALL_KEYS = [
  PRIVATE_KEY_DEPLOYER,
  PRIVATE_KEY_BORROWER,
  PRIVATE_KEY_LENDER,
  PRIVATE_KEY_VOUCHER
].filter(Boolean).map(k => k.startsWith("0x") ? k : `0x${k}`);

module.exports = {
  solidity: {
    version: "0.8.25",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      evmVersion: "cancun",
      viaIR: true,
    },
  },

  networks: {
    hardhat: {
      chainId: 31337,
      // Save chain state to disk
      forking: undefined,
      saveDeployments: true,
    },
    localhost: {
      url: LOCAL_RPC_URL || "http://192.168.10.186:8545",
      chainId: 31337,
    },
    amoy: {
      url: AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
      chainId: 80002,
      accounts: ALL_KEYS
    },
  },

  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "",
  },

  paths: {
    sources:   "./contracts",
    artifacts: "./artifacts",
  },
};
