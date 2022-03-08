import * as dotenv from "dotenv";

// import { HardhatUserConfig } from "hardhat/config";
import config from "./config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    // mainnet: {
    //   url: config.mainnetAlchemyURL,
    //   accounts: [config.mainnetPrivateKey],
    // },

    // ropsten: {
    //   url: config.ropstenAlchemyURL,
    //   accounts: [config.ropstenPrivateKey],
    // },

    rinkeby: {
      url: config.rinkebyAlchemyURL,
      accounts: [config.rinkebyPrivateKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },

  etherscan: {
    apiKey: config.etherscanAPIKey,
  },
};
