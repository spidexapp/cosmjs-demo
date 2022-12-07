const spidex = {
	chainId: "spidex_9111-1",
	chainName: "Spidex Testnet",
	rpc: "https://rpc.testnet.spidex.app",
	rest: "https://rest.testnet.spidex.app",
	stakeCurrency: {
		coinDenom: "SPX",
		coinMinimalDenom: "aspx",
		coinDecimals: 18,
	},
	bip44: {
    coinType: 60
	},
	bech32Config: {
		bech32PrefixAccAddr: "spx",
		bech32PrefixAccPub: "spxpub",
		bech32PrefixValAddr: "spxvaloper",
		bech32PrefixValPub: "spxvaloperpub",
		bech32PrefixConsAddr: "spxvalcons",
		bech32PrefixConsPub: "spxvalconspub",
	},
	currencies: [
		{
			coinDenom: "SPX",
			coinDecimals: 18,
			coinMinimalDenom: "aspx",
		},
		{
			coinDenom: "OSMO",
			coinDecimals: 6,
			coinMinimalDenom: "uosmo",
		},
	],
	feeCurrencies: [
		{
			coinDenom: "SPX",
			coinMinimalDenom: "aspx",
			coinDecimals: 18,
		},
	],
	features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
};

export default spidex;
