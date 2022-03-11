/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { config } = require("./config");

const solidity = {
	version: "0.8.7",
	settings: {
		optimizer: {
			enabled: true,
			runs: 200,
		},
	},
};

const networks = {
	// mainnet: {
	// 	url: config.mainnetAlchemyURL,
	// 	accounts: [config.mainnetPrivateKey],
	// },
	// ropsten: {
	// 	url: config.ropstenAlchemyURL,
	// 	accounts: [config.ropstenPrivateKey],
	// },
	rinkeby: {
		url: config.rinkebyAlchemyURL,
		accounts: [config.rinkebyPrivateKey],
	},
};

const etherscan = {
	apiKey: config.etherscanAPIKey,
};

module.exports = {
	solidity,
	networks,
	etherscan,
};
