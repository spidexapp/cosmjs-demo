const chain = {
	rpc: "http://localhost:26657",
	rest: "http://localhost:1317",
	chainId: "earth",
	chainName: "earth",
	stakeCurrency: {
		coinDenom: "EAR",
		coinMinimalDenom: "ear",
		coinDecimals: 6,
	},
	bech32Config: {
		bech32PrefixAccAddr: "cosmos",
		bech32PrefixAccPub: "cosmospub",
		bech32PrefixValAddr: "cosmosvaloper",
		bech32PrefixValPub: "cosmosvaloperpub",
		bech32PrefixConsAddr: "cosmosvalcons",
		bech32PrefixConsPub: "cosmosvalconspub",
	},
	bip44: { coinType: 118 },
	currencies: [
		{ coinDenom: "EAR", coinMinimalDenom: "ear", coinDecimals: 6 },
	],
	feeCurrencies: [
		{ coinDenom: "EAR", coinMinimalDenom: "ear", coinDecimals: 6 },
	],
	gasPriceStep: { low: 0.05, average: 0.125, high: 0.2 },
	features: ["stargate", "no-legacy-stdTx", "ibc-transfer", "ibc-go"],
};

export default chain
