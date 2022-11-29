import {
	assertIsDeliverTxSuccess,
	SigningStargateClient,
} from "@cosmjs/stargate";
import React, { useEffect, useState } from "react";
import osmo from "../config/osmosis";

function Keplr() {
	const [chain, setChain] = useState<any>(osmo);
	const [selected, setSelected] = useState<any>("OSMO");
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
		setChain(osmo);
	}, [selected]);

	useEffect(() => {
		if (!address && !client) {
			return;
		}
		getBalance();
	}, [address, client, sendHash]);

	//所有余额查询
	const getBalance = async () => {
		if (client) {
			// todo
			// setBalances(_balances);
		}
	};

	const getTx = async () => {
		if (client) {
			// todo
			// setTxRes(txRes);
		}
	};

	// 转账
	const sendToken = async () => {
		if (client) {
			// 构造消息
			//todo

			try {
				// 发送token
				//todo

				// assertIsDeliverTxSuccess(result);
				
			} catch (error) {
				alert("失败! " + error.toString());
				console.error(error);
			}
		}
	};

	const connectWallet = async () => {
		// init keplr wallet
		if (!window.keplr || !window.getOfflineSigner) {
			return;
		}

		// add your chain to keplr
		
		// console.log(client);
		// setAddress(accounts[0].address);
		// setClient(client);
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
						{/* <option value="MARS">MARS</option>
						<option value="SPX">SPX</option> */}
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
