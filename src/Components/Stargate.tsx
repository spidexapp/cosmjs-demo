import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { StargateClient } from "@cosmjs/stargate";
import React, { useEffect, useState } from "react";
import chain from "../config/osmosis";
import { useInterval } from "../Hooks/useInterval";

function Stargate() {
	const [mnemonic, setMnemonic] = useState<any>();
	const [address, setAddress] = useState<any>();
	const [balance, setBalances] = useState<any>();
	const [allBalance, setAllBalances] = useState<any>();
	const [client, setClient] = useState<any>();
	const [height, setHeight] = useState<any>();
	const [chainId, setChainId] = useState<any>();
	const [account, setAccount] = useState<any>();
	const [block, setBlock] = useState<any>();

	const [timestamp, setTimestamp] = useState(0);
	useInterval(() => setTimestamp(new Date().getTime()), 1000);

	// 连接
	useEffect(() => {
		if (!chain) return;
		connect();
	}, [chain]);

	useEffect(() => {
		if (!address || !client) {
			return;
		}
		getBalance();
	}, [timestamp, address, client]);

	useEffect(() => {
		if (!address || !client) {
			return;
		}
		getOthers();
	}, [address, client]);

	// 助记词钱包
	const getAddressByMnemonic = async () => {
		if (!mnemonic) {
			return;
		}

		// Todo
	};

	// 余额查询
	const getBalance = async () => {

		//单币种查询
		
		// Todo

		//所有余额查询
		// Todo
	};


	// strageClient api
	const getOthers = async () => {
		if (!address) {
			return;
		}
		// Todo
	};

	// 连接
	const connect = async () => {
		// Todo
	};

	// 断开
	const disConnect = async () => {
		// Todo
	};

	return (
		<div className="stargate">
			<h2>StargateClient</h2>
			<label>
				<span>Chain: Osmosis </span>
				<button onClick={client?.queryClient ? disConnect : connect}>
					{client?.queryClient ? "断开" : "连接"}
				</button>
			</label>
			<div className="weight">
				<span>
					助记词: &nbsp;
					<input
						type="text"
						value={mnemonic}
						placeholder="mnemonic"
						onChange={(e) => setMnemonic(e.target.value.trim())}
					/>
					<button onClick={getAddressByMnemonic}>Add wallet</button>
				</span>
				&nbsp;&nbsp;
			</div>
			<div className="weight">
				<span style={{ whiteSpace: "nowrap" }}>余额: &nbsp;</span>
				<div>
					{allBalance?.map((item) => {
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
			<label>1、水龙头</label>
			<div>
				<span>
					Address: <b>{address}</b>{" "}
				</span>{" "}
				&nbsp;
				{address && (
					<a href="https://faucet.osmosis.zone/" target="_blank">
						获取
					</a>
				)}
			</div>
			<label>2、getChainId()</label>
			<div>
				<span>ChainId: {chainId} </span>
			</div>
			<label>3、getBalance()</label>
			<div>
				<span>Balance: </span>
				{parseFloat(String(balance?.amount / Math.pow(10, 6))).toFixed(2)}
				<span> {balance?.denom}</span>
			</div>
			<label>4、getAccount()</label>
			<div>{JSON.stringify(account)}</div>

			<label>5、getHeight()</label>
			<div>Height: {height}</div>
			<label>6、getBlock()</label>
			<div>Blockhash:{block?.id}</div>
			{/* <label>6、getQueryClient()</label>
			<div>queryClient: {JSON.stringify(queryAccount?.toString())}</div> */}
		</div>
	);
}

export default Stargate;
