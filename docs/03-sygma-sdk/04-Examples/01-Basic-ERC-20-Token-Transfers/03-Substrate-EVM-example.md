---
slug: /sdk/examples/erc20/substrate-evm-example
id: examples-erc20-substrate-evm-example
title: Substrate To EVM Token Transfer
description: Section that describes how to perform a Substrate to EVM token transfer.
sidebar_position: 3
draft: false
---

:::warning
Please be aware that the Rococo-Phala testnet is currently down due to ongoing maintenance by the Phala team as they migrate their testnet to Paseo. Stay tuned for further updates.
:::

### EVM-to-Substrate token transfer example

In the following example, we will use the `TESTNET` environment to perform a cross-chain ERC-20 transfer with 0.5 sygUSD `sygUSD` tokens. The transfer will be initiated on the Substrate-side via the Rococo-Phala testnet and received on the EVM-side via the Sepolia Ethereum testnet.

This is an example script that demonstrates the functionality of the Sygma SDK and the wider Sygma ecosystem of relayers and bridge and handler contracts/pallets. The complete example can be found in this [repo](https://github.com/sygmaprotocol/sygma-sdk/tree/main/examples/substrate-to-evm-fungible-transfer).

### Prerequisites

Before running the script, ensure that you have the following:

- Node.js v18
- Yarn (version 3.4.1 or higher)
- The 12-word mnemonic for your Substrate development wallet
- An Ethereum wallet to receive tokens into (the example presets an existing wallet address already)
- A Substrate provider (in case the hardcoded WSS within the script does not work)
- A Substrate development wallet funded with `sygUSD` tokens

import App from '../../../../src/Faucet/App';

<App />
<br/>

:::danger
We make use of the dotenv module to manage Substrate's private mnemonics with environment variables. Please note that accidentally committing a .env file containing private mnemonics to a wallet with real funds, onto GitHub, could result in the complete loss of your funds. **Never expose your private keys.**
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

This example uses the `dotenv` module to import the Substrate 12-word private mnemonic. To run the example, you will need to configure your environment variable to include your Substrate test development account's [12-word seed](https://support.polkadot.network/support/solutions/articles/65000169731-polkadot-extension-how-can-i-view-my-mnemonic-phrase-). A `.env.sample` is provided as a template.

**DO NOT COMMIT YOUR MNEMONIC WITH REAL FUNDS TO GITHUB. DOING SO COULD RESULT IN COMPLETE LOSS OF YOUR FUNDS.**

Create a `.env` file in the substrate-to-evm example folder:

```bash
cd examples/substrate-to-evm-fungible-transfer
touch .env
```

Replace between the quotation marks your 12-word mnemonic:

`PRIVATE_MNEMONIC="YOUR TWELVE WORD MNEMONIC HERE WITH SPACES"`

Replace the placeholder value in the script for `recipient` with your preferred destination EVM address.

To send a Substrate token transfer from Substrate to EVM, run:

```bash
cd examples/substrate-to-evm-fungible-transfer
yarn run transfer
```

The example will use `@polkadot/keyring` in conjunction with the sygma-sdk to create a transfer from Rococo-Phala to Sepolia with the `sygUSD` token. It will be received on Sepolia as a `sygUSD` token.

### Script functionality

This example script performs the following steps:

- Initializes the SDK by importing the required packages and defining the constants for the script.

```ts
import type { SubstrateAssetTransferRequest } from "@buildwithsygma/substrate";
import { createSubstrateFungibleAssetTransfer } from "@buildwithsygma/substrate";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import dotenv from "dotenv";

const MNEMONIC = process.env.PRIVATE_MNEMONIC;
if (!MNEMONIC) {
  throw new Error("Missing environment variable: PRIVATE_MNEMONIC");
}

const SEPOLIA_CHAIN_ID = 11155111;
const TANGLE_CHAIN_ID = 3799;

const RESOURCE_ID_SYGMA_USD =
  "0x0000000000000000000000000000000000000000000000000000000000002000";
const recipient = "<evm_recipient_address>";
const TANGLE_RPC_URL =
  process.env.SOURCE_SUBSTRATE_RPC_URL ?? "wss://rpc.tangle.tools";
```

Note: In the case of a substrate transfer, mnmeonic is required.

- Constant and function to retrieve Sygma scanner URL (Optional)

```ts
const SYGMA_EXPLORER_URL = "https://scan.test.buildwithsygma.com";
const getSygmaExplorerTransferUrl = (params: {
  blockNumber: number;
  extrinsicIndex: number;
}): string =>
  `${SYGMA_EXPLORER_URL}/transfer/${params.blockNumber}-${params.extrinsicIndex}`;
```

- Create substrate provider and wallet to be able to send transactions and query data

```ts
const keyring = new Keyring({ type: "sr25519" });
await cryptoWaitReady();
const account = keyring.addFromUri(MNEMONIC);
const wsProvider = new WsProvider(TANGLE_RPC_URL);
const api = await ApiPromise.create({ provider: wsProvider });
```

- Prepare fungible token transfer parameters and create a transfer object

```ts
const transferParams: SubstrateAssetTransferRequest = {
  source: TANGLE_CHAIN_ID,
  destination: SEPOLIA_CHAIN_ID,
  sourceNetworkProvider: api,
  sourceAddress: account.address,
  resource: RESOURCE_ID_SYGMA_USD,
  amount: BigInt(1) * BigInt(1e18),
  destinationAddress: recipient,
  environment: process.env.SYGMA_ENV,
};
```

- Send the transaction and wait for confirmation

```ts
const transfer = await createSubstrateFungibleAssetTransfer(transferParams);
const transferTx = await transfer.getTransferTransaction();

const unsub = await transferTx.signAndSend(account, (results) => {
  const { status } = results;

  if (status.isFinalized) {
    const blockNumber = results.blockNumber?.toNumber();
    const extrinsicIndex = results.txIndex;

    if (blockNumber && extrinsicIndex) {
      console.log(
        `Explorer URL: ${getSygmaExplorerTransferUrl({
          blockNumber,
          extrinsicIndex,
        })}`
      );
    }
  }
});
```
