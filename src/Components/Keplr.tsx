import {
	assertIsDeliverTxSuccess,
	SigningStargateClient,
} from "@cosmjs/stargate";
import React, { useEffect, useState } from "react";
import osmo from "../config/osmosis";

function Keplr() {
	const [chain, setChain] = useState<any>(osmo);
	const [selected, setSelected] = useState<string>("OSMO");
	const [client, setClient] = useState<any>();
	const [address, setAddress] = useState<any>();

	const [balances, setBalances] = useState<any>();
	const [recipent, setRecipent] = useState<any>();
	const [tx, setTx] = useState<any>();
	const [sendHash, setSendHash] = useState<any>();
	const [txRes, setTxRes] = useState<any>();

	// 初始化 chain
	useEffect(() => {
		setChain(osmo);
	}, [selected]);

	// 查寻余额
	useEffect(() => {
		if (!address && !client) {
			return;
		}
		getBalances();
	}, [address, client, sendHash]);

	// 余额查询  Todo
	const getBalances = async () => {
		if (client) {
			const _balance = await client.getAllBalances(address);
			console.log(_balance);
			setBalances(_balance);
		}
	};

	// txhash查询  Todo
	const getTx = async () => {
		const result = await client.getTx(tx);
		console.log(result);
		setTxRes(result);
	};

	// 转账 Todo
	const sendToken = async () => {
		if (!client) return;

		const convertAmount = 10 * 1e6;
		const amount = [
			{
				denom: chain.stakeCurrency.coinMinimalDenom,
				amount: convertAmount.toString(),
			},
		];

		const fee = {
			amount: [
				{
					denom: chain.stakeCurrency.coinMinimalDenom,
					amount: chain.gasPriceStep.average,
				},
			],
			gas: "200000",
		};

		try {
			const result = await client.sendTokens(
				address,
				recipent,
				amount,
				fee,
				""
			);
			assertIsDeliverTxSuccess(result);
			console.log(result);
			if (result.code == 0) {
				alert(
					"transfer success, height:" +
						result.height +
						"hash:" +
						result.transactionHash
				);
				setTx(result.transactionHash);
			}
		} catch (e) {
			console.log(e);
		}
	};

	// 连接keplr钱包  Todo
	const connectWallet = async () => {
		if (!window.keplr || !window.getOfflineSigner) {
			return;
		}

		await window.keplr.experimentalSuggestChain(chain);
		await window.keplr.enable(chain.chainId);

		const offlineSigner = window.keplr.getOfflineSigner(chain.chainId);

		const accounts = await offlineSigner.getAccounts();
		const client = await SigningStargateClient.connectWithSigner(
			chain.rpc,
			offlineSigner
		);

		// add your chain to keplr
		setAddress(accounts[0].address);
		setClient(client);
	};

	return (
		<div className="keplr">
			<h2>Keplr Wallet</h2>
			<label>
				<span>
					Chain: &nbsp;
					<select
						className="select"
						value={selected}
						onChange={(e) => setSelected(e.target.value)}
					>
						<option value="OSMO">OSMO</option>
						<option value="SPX">SPX</option>
					</select>
				</span>{" "}
				&nbsp;
				<button onClick={connectWallet}>
					{address ? "已连接" : "连接keplr"}
				</button>
			</label>
			<div className="weight">地址：{address}</div>
			<div className="weight">
				<span style={{ whiteSpace: "nowrap" }}>余额: &nbsp;</span>
				<div>
					{balances?.map((item) => {
						return (
							<div className="ell" key={item.denom}>
								{parseFloat(String(item?.amount / Math.pow(10, 6))).toFixed(2)}
								&nbsp;
								{item?.denom}
							</div>
						);
					})}
				</div>
			</div>
			<hr />
			<label>1、sendTokens() & broadcastTx</label>
			<div>
				<input
					type="text"
					value={recipent}
					placeholder="address"
					onChange={(e) => setRecipent(e.target.value)}
				/>
				&nbsp;
				<button onClick={sendToken}>
					发送 10 {chain.feeCurrencies[0].coinMinimalDenom}
				</button>
			</div>
			<label>2、getTx()</label>
			<div>
				<span>{tx}</span>
				&nbsp;
				<button onClick={getTx}>查询</button>
			</div>
			<div className="tx">txRes:{JSON.stringify(txRes)}</div>
			{/* <label>3、sendIbcTokens() & broadcastTx</label>
			<div>
				<input
					type="text"
					value={ibcRecipent}
					placeholder="address"
					onChange={(e) => setIbcRecipent(e.target.value)}
				/>
				&nbsp;
				<button onClick={sendIbcToken}>
					发送 10 {chain.feeCurrencies[0].coinMinimalDenom}
				</button>
			</div> */}
		</div>
	);
}

export default Keplr;
