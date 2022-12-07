## Cosmjs 前端实践

<img width="1417" alt="image" src="https://user-images.githubusercontent.com/14268015/204499271-c5d6edd6-61bd-45c7-bd58-9e08131d7a9a.png">

## 相关资料

- [ignite doc](https://docs.ignite.com)
- [cosmjs](https://github.com/cosmos/cosmjs)
- [keplr doc](https://docs.keplr.app/)
- [comsjs doc](https://cosmos.github.io/cosmjs/latest/stargate/index.html)
- [example chain](https://github.com/spidexapp/planet)
- [about cosmos](https://daniel520.gitee.io/daniel-blog/zh/Block%20Chain/Cosmos/10.Cosmos%E7%99%BD%E7%9A%AE%E4%B9%A6.html#%E8%B7%A8%E9%93%BE%E9%80%9A%E4%BF%A1-ibc)

## 基本要求
```
   - react 
   - cosmos 链的基础知识
   - @cosmjs/stargate sdk
   - Keplr chrome 插件

```


## Get start

```
 1、npm install 
 2、yarn start
```

## 克隆此仓库 按照步骤实现

```
   - 安装keplr
   - 使用osmosis 测试链 链配置在config 目录
   - 添加链到keplr, axelar 添加（建议使用js 自行添加） https://docs.axelar.dev/resources/keplr
   - 导入助记词到钱包 / 或创建账户
   - 拿到地址 水龙头获取token https://faucet.osmosis.zone/#/
```


## 请实现以下需求

### 

```ts
   基本的查询api实现 和 发送交易、交易hash 查询
      - connect/ disconnect
      - mnemonic wallet
      - faucet，
      - getHeight，
      - getBalance,
      - getBlock,
      - add chain to keplr,
      - connect keplr
      - sendToken,
      - broadcastTx
```

### keplr 钱包
<img width="361" alt="image" src="https://user-images.githubusercontent.com/14268015/201254328-008dbedd-524b-41a6-9e3e-52bd06999ecd.png">

#### FAQ : 如果有疑问，请联系教研组
