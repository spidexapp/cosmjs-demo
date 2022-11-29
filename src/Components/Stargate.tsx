import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { StargateClient } from "@cosmjs/stargate";
import React, { useEffect, useState } from "react";
import { useInterval } from "../Hooks/useInterval";
import chain from "../config/osmosis";

function Stargate() {
	const [mnemonic, setMnemonic] = useState<any>(
		"fashion poverty deer morning repeat option solve mandate injury slide soon boy hospital isolate plate lion range dilemma text job awkward solve street blue"
	);
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

	useEffect(() => {
		if (!chain) {
			return;
		}
		connect();
	}, [chain]);

	useEffect(() => {
		if (!address || !client) {
			return;
		}
		getBalance();
	}, [timestamp,address, client]);

	useEffect(() => {
		if (!address || !client) {
			return;
		}
		getOthers();
	}, [address, client]);

	const getAddressByMnemonic = async () => {
		if (!mnemonic) {
			return;
		}
		const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic,{
			prefix: "OSMO",
		});
		const [firstAccount]= await wallet.getAccounts();

		setAddress(firstAccount.address);
	};

	const getBalance = async ()=>{
		const _balance = await client?.getBalance(
			address,
			chain.stakeCurrency.coinMinimalDenom
		);

		const _allBalance = await client?.getAllBalances(address);

		setAllBalances(_allBalance);
		setBalances(_balance);
	}

	const getOthers = async () => {
		if (!address) {
			return;
		}
		const _height = await client?.getHeight();
		
		const _chainId = await client?.getChainId();
		const _allBalance = await client?.getAllBalances(address);
		const _accounts = await client?.getAccount(address);
		const _block = await client?.getBlock(_height);

		console.log(_allBalance);
		setChainId(_chainId);
		
		setHeight(_height);
		setAccount(_accounts);
		setBlock(_block);
	};

	const connect = async () => {
		const _strageClient = await StargateClient.connect(chain.rpc);
		console.log(_strageClient);
		setClient(_strageClient);
	};

	const disConnect = async () => {
		const _strageClient = await client.disconnect();
		// console.log(_strageClient)
		setClient(_strageClient);
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
				<span>Address: <b>{address}</b> </span> &nbsp;
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
