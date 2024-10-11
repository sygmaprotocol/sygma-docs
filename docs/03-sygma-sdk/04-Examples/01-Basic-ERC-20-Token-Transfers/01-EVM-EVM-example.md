---
slug: /sdk/examples/erc20/evm-example
id: examples-erc20-evm-example
title: EVM To EVM Token Transfer
description: Section that describes how to perform an EVM to EVM token transfer.
sidebar_position: 1
draft: false
---

### EVM-to-EVM token transfer example

In the following example, we will use the `TESTNET` environment to perform a cross-chain ERC-20 transfer with 1 testnet `USDC` token. The transfer will be initiated on the EVM-side via the Cronos testnet and received on the EVM-side via the Sepolia Ethereum testnet.

This is an example script that demonstrates the functionality of the Sygma SDK and the wider Sygma ecosystem of relayers and bridge and handler contracts. The complete example can be found in this [repo](https://github.com/sygmaprotocol/sygma-sdk/tree/main/examples/evm-to-evm-fungible-transfer).

### Prerequisites

Before running the script, ensure that you have the following:

- Node.js v18
- Yarn (version 3.4.1 or higher)
- The [exported private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) of your development wallet
- Testnet ETH for gas
- An Ethereum [provider](https://www.infura.io/) (in case the hardcoded RPC within the script does not work)
- A development wallet funded with `ERC20LRTest` tokens from the [Sygma faucet](https://faucet-ui-stage.buildwithsygma.com/) (you can use the UI below; please allow some time for minting as testnet may be congested)

import App from '../../../../src/Faucet/App';

<App />
<br/>

:::danger
We make use of the dotenv module to manage exported private keys with environment variables. Please note that accidentally committing a .env file containing private keys to a wallet with real funds, onto GitHub, could result in the complete loss of your funds. **Never expose your private keys.**
:::

### Getting started

1. Clone the repository

Clone the sygma-sdk repository into a directory of your choice, and then `cd` into the folder:

```bash
git clone git@github.com:sygmaprotocol/sygma-sdk.git
cd sygma-sdk/
```

2. Install dependencies

Install the project dependencies by running:

```bash
yarn install
```

3. Build the SDK

Build the SDK by running the following command:

```bash
yarn build
```

4. Usage

This example uses the `dotenv` module to retrieve private keys. To run the example, you will need to configure your environment variable to include your test development account's [exported private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key). A `.env.sample` is provided as a template.

**DO NOT COMMIT PRIVATE KEYS WITH REAL FUNDS TO GITHUB. DOING SO COULD RESULT IN COMPLETE LOSS OF YOUR FUNDS.**

Create a `.env` file in the evm-to-evm example folder:

```bash
cd examples/evm-to-evm-fungible-transfer
touch .env
```

Replace between the quotation marks your exported private key:

`PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE"`

To send an ERC-20 example transfer from EVM to EVM, run:

```bash
cd examples/evm-to-evm-fungible-transfer
yarn run transfer
```

The example will use `ethers` in conjunction with the sygma-sdk to create a transfer from Cronos to Sepolia with the `ERC20LRTST` token. It will be received on Sepolia as the `ERC20LRTST` token.

### Script functionality

This example script performs the following steps:

- Import required libraries from the dependencies.

```ts
import { getSygmaScanLink, type Eip1193Provider } from "@buildwithsygma/core";
import {
  createFungibleAssetTransfer,
  FungibleTransferParams,
} from "@buildwithsygma/evm";
import dotenv from "dotenv";
import { Wallet, providers } from "ethers";
import Web3HttpProvider from "web3-providers-http";
```

- Read contents of the `.env` file using `dotenv`. The script throws an error if the private key is not provided

```ts
dotenv.config();
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw new Error("Missing environment variable: PRIVATE_KEY");
```

- Define transfer contants like destination chain ID, source chain ID, recipient address, resource ID and RPC Urls

```ts
const SEPOLIA_CHAIN_ID = 11155111;
const BASE_SEPOLIA_CHAIN_ID = 84532;
const RESOURCE_ID =
  "0x0000000000000000000000000000000000000000000000000000000000001200";
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";
```

- Constant and function to retrieve explorer URL (Optional)

```ts
const explorerUrls: Record<number, string> = {
  [SEPOLIA_CHAIN_ID]: "https://sepolia.etherscan.io",
};
const getTxExplorerUrl = (params: {
  txHash: string;
  chainId: number;
}): string => `${explorerUrls[params.chainId]}/tx/${params.txHash}`;
```

- Create Ethereum provider and wallet to be able to send transactions and query data

```ts
const web3Provider = new Web3HttpProvider(SEPOLIA_RPC_URL);
const ethersWeb3Provider = new providers.Web3Provider(web3Provider);
const wallet = new Wallet(privateKey ?? "", ethersWeb3Provider);
const sourceAddress = await wallet.getAddress();
const destinationAddress = await wallet.getAddress();
```

- Prepare fungible token transfer parameters and create a transfer object

```ts
const params: FungibleTransferParams = {
  source: SEPOLIA_CHAIN_ID,
  destination: BASE_SEPOLIA_CHAIN_ID,
  sourceNetworkProvider: web3Provider as unknown as Eip1193Provider,
  resource: RESOURCE_ID,
  amount: BigInt(1) * BigInt(1e6),
  recipientAddress: destinationAddress,
  sourceAddress: sourceAddress,
  environment: Environment.TESTNET,
};

const transfer = await createFungibleAssetTransfer(params);
```

- Get and complete approval transactions

```ts
const approvals = await transfer.getApprovalTransactions();
for (const approval of approvals) {
  const response = await wallet.sendTransaction(approval);
  await response.wait();
}
```

- Complete the transfer transaction

```ts
const transferTx = await transfer.getTransferTransaction();
const response = await wallet.sendTransaction(transferTx);
await response.wait();
```
