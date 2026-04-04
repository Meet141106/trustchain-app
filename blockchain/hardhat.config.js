require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000001";
const MUMBAI_RPC   = process.env.MUMBAI_RPC_URL  || "https://rpc-mumbai.maticvigil.com";
const AMOY_RPC     = process.env.AMOY_RPC_URL    || "https://rpc-amoy.polygon.technology";
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    /* Local Hardhat node — for fast iteration */
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },

    /* Polygon Mumbai (legacy testnet — may be slow) */
    mumbai: {
      url: MUMBAI_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      gasPrice: 30_000_000_000, // 30 gwei
    },

    /* Polygon Amoy (new official Polygon testnet) */
    amoy: {
      url: AMOY_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 80002,
    },
  },

  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
    },
  },

  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
};
