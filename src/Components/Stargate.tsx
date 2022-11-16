import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import React, { useEffect, useState } from "react";
import chain from "../config/earth";

function Stargate() {
	const [address, setAddress] = useState<any>();
	const [balance, setBalances] = useState<any>();
	const [allBalance, setAllBalances] = useState<any>();
	const [client, setClient] = useState<any>();
	const [height, setHeight] = useState<any>();
	const [chainId, setChainId] = useState<any>();
	const [account, setAccount] = useState<any>();
	const [block, setBlock] = useState<any>();
	const rpc = chain.rpc;

	const mnemonic =
		"vapor unaware before reject west riot chimney truck coffee goddess chalk film vapor involve rib drum balance tell where during flag violin word bulb";

	useEffect(() => {
		getAddressByMnemonic();
	}, [mnemonic]);

	useEffect(() => {
		if (!address && !client) {
			return;
		}
		getOthers();
	}, [address, client]);

	const getAddressByMnemonic = async () => {
		const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
		const _client = await SigningStargateClient.connectWithSigner(rpc, wallet);
		const [firstAccount] = await wallet.getAccounts();
		const _chainId = await _client?.getChainId();
		setChainId(_chainId);
		setAddress(firstAccount.address);
	};

	const getOthers = async () => {
		const _height = await client?.getHeight();
		const _balance = await client?.getBalance(
			address,
			chain.stakeCurrency.coinMinimalDenom
		);
		const _allBalance = await client?.getAllBalances(address);
		const _accounts = await client?.getAccount(address);
		const _block = await client?.getBlock(_height);

		console.log(_allBalance);
		setBalances(_balance);
		setAllBalances(_allBalance);
		setHeight(_height);
		setAccount(_accounts);
		setBlock(_block);
	};

	const connect = async () => {
		const _strageClient = await StargateClient.connect(rpc);
		// console.log(_strageClient)
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
				<span>ChainId: {chainId?.toLocaleUpperCase()} </span>
				<button onClick={balance?.amount ? disConnect : connect}>
					{balance?.amount ? "断开" : "连接"}
				</button>
			</label>
			<div className="weight">
				<span>地址: {address} </span>&nbsp;
				<a href="http://localhost:4500/#/" target="_blank">
					水龙头
				</a>
			</div>
			<div className="weight">
				<span style={{ whiteSpace: "nowrap" }}>余额: &nbsp;</span>
				<div>
					{allBalance?.map((item) => {
						return (
							<div className="ell">
								{parseFloat(String(item?.amount / Math.pow(10, 6))).toFixed(
									2
								)}&nbsp;
								{item?.denom}
							</div>
						);
					})}
				</div>
			</div>
			<hr />
			<label>1、getChainId()</label>
			<div>
				<span>chainId: {chainId} </span>
			</div>
			<label>2、getBalance()</label>
			<div>
				<span>balance: </span>
				{parseFloat(String(balance?.amount / Math.pow(10, 6))).toFixed(2)}
				<span> {balance?.denom}</span>
			</div>
			<label>3、getAccount()</label>
			<div>{JSON.stringify(account)}</div>

			<label>4、getHeight()</label>
			<div>height: {height}</div>
			<label>5、getBlock()</label>
			<div>blockhash:{block?.id}</div>
			{/* <label>6、getQueryClient()</label>
			<div>queryClient: {JSON.stringify(queryAccount?.toString())}</div> */}
		</div>
	);
}

export default Stargate;
