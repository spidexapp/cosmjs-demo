import { coin, coins } from "@cosmjs/proto-signing";
import {
	assertIsDeliverTxSuccess,
	SigningStargateClient,
} from "@cosmjs/stargate";
import React, { useEffect, useState } from "react";
import chain from "../config/mars";

function Keplr() {
	const rpc = chain.rpc;
	const [chainId, setChainId] = useState<any>(chain.chainId);
	const [client, setClient] = useState<any>();
	const [address, setAddress] = useState<any>();

	const [balances, setBalances] = useState<any>();
	const [recipent, setRecipent] = useState<any>();
	const [ibcRecipent, setIbcRecipent] = useState<any>();
	const [tx, setTx] = useState<any>();
	const [sendHash, setSendHash] = useState<any>();
	const [sendIbcHash, setSendIbcHash] = useState<any>();
	const [txRes, setTxRes] = useState<any>();

	useEffect(() => {
		if (!address && !client) {
			return;
		}
		getBalance();
	}, [address, client, sendHash]);

	const getBalance = async () => {
		if (client) {
			const _balances = await client?.getAllBalances(address);
			console.log(_balances)
			setBalances(_balances);
		}
	};

	const getTx = async () => {
		if (client) {
			const txRes = await client.getTx(tx.trim());
			console.log(txRes);
			setTxRes(txRes);
		}
	};

	const sendToken = async () => {
		if (client) {
			const convertAmount = 10 * 1e6;
			const amount = {
				denom: chain.stakeCurrency.coinMinimalDenom,
				amount: convertAmount.toString(),
			};
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
				const result = await client?.sendTokens(
					address.trim(),
					recipent.trim(),
					[amount],
					fee,
					""
				);
				assertIsDeliverTxSuccess(result);
				alert("交易成功! " + result?.transactionHash);
				setSendHash(result?.transactionHash);
				console.log(result);
			} catch (error) {
				alert("失败! " + error.toString());
				console.error(error);
			}
		}
	};

	const sendIbcToken = async () => {
		const convertCoin = 10 * 1e6;
		const transferAmount = coin(
			convertCoin,
			chain.stakeCurrency.coinMinimalDenom
		);
		const fee = {
			amount: coins(1, chain.feeCurrencies[0].coinMinimalDenom),
			gas: "200000",
		};
		const result = await client.sendIbcTokens(
			address.trim(),
			ibcRecipent.trim(),
			transferAmount,
			"transfer",
			"channel-1",
			undefined,
			Math.floor(Date.now() / 1000) + 60,
			fee,
			""
		);
		console.log(result);
		assertIsDeliverTxSuccess(result);

		console.log(result);
	};

	const connectWallet = async () => {
		// init keplr wallet
		if (!window.keplr || !window.getOfflineSigner) {
			return;
		}

		// add your chain to keplr
		await window.keplr.experimentalSuggestChain(chain);
		await window.keplr.enable(chainId);

		const offlineSigner = window.getOfflineSigner?.(chainId);
		const accounts = await offlineSigner?.getAccounts();
		const client = await SigningStargateClient.connectWithSigner(
			rpc,
			offlineSigner
		);
		// console.log(client);
		setAddress(accounts[0].address);
		setClient(client);
	};

	return (
		<div className="keplr">
			<h2>Keplr Wallet</h2>
			<label>
				<span>ChainId: {chain.chainId?.toLocaleUpperCase()} </span>
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
							<div className="ell">
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
				<button onClick={sendToken}>发送 10 token</button>
				<div>hash: {sendHash}</div>
			</div>
			<label>2、getTx()</label>
			<div>
				<input
					type="text"
					value={tx}
					placeholder="tx hash"
					onChange={(e) => setTx(e.target.value)}
				/>
				&nbsp;
				<button onClick={getTx}>查询</button>
			</div>
			<div className="tx">txRes:{JSON.stringify(txRes)}</div>
			<label>3、sendIbcTokens() & broadcastTx</label>
			<div>
				<input
					type="text"
					value={ibcRecipent}
					placeholder="address"
					onChange={(e) => setIbcRecipent(e.target.value)}
				/>
				&nbsp;
				<button onClick={sendIbcToken}>发送 10 token</button>
			</div>
		</div>
	);
}

export default Keplr;
