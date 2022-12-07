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

	// 余额查询
	useEffect(() => {
		if (!address || !client) {
			return;
		}
		getBalance();
	}, [timestamp, address, client]);

	// stargate基础api
	useEffect(() => {
		if (!address || !client) {
			return;
		}
		getOthers();
	}, [address, client]);

	// 助记词钱包 Todo
	const getAddressByMnemonic = async () => {};

	// 余额查询 Todo
	const getBalance = async () => {
		//单币种查询 Todo
	};

	// strageClient 基础 api 使用 Todo
	const getOthers = async () => {
		// 1、getChainId
		// 2、getBalance
		// 3、getAccount
		// 4、getHeight
		// 5、getBlock
		// 6、getAllBalances
		// 7、getSequence
	};

	// connect client Todo
	const connect = async () => {};

	// disconnect client Todo
	const disConnect = async () => {};

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
				{parseFloat(String(balance?.amount / Math.pow(10, 6))).toFixed(2)}
				<span> {balance?.denom}</span>
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
			<label>7、getAllBalances()</label>
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
			<label>8、getSequence()</label>
			<div></div>
			{/* <label>9、getQueryClient()</label>
			<div>queryClient: {JSON.stringify(queryAccount?.toString())}</div> */}
		</div>
	);
}

export default Stargate;
