---
slug: /sdk/examples/erc20/substrate-evm-example
id:  examples-erc20-substrate-evm-example
title: Substrate To EVM Token Transfer
description: Section that describes how to perform a Substrate to EVM token transfer.
sidebar_position: 3
draft: false
---


### Substrate to EVM token transfer example

In the following example, we will use the `TESTNET` environment to perform a cross-chain ERC-20 transfer with 0.5 sygUSD `sygUSD` tokens. The transfer will be initiated on the Substrate-side via the Tangle testnet and received on the EVM-side via the Sepolia Ethereum testnet.

This is an example script that demonstrates the functionality of the Sygma SDK and the wider Sygma ecosystem of relayers and bridge and handler contracts/pallets. The complete example can be found in this [repo](https://github.com/sygmaprotocol/sygma-sdk/tree/main/examples/substrate-to-evm-fungible-transfer).
S
### Prerequisites

Before running the script, ensure that you have the following:

- Node.js v18.20.4 (LTS)
- Yarn (version 4 or higher)
- The 12-word mnemonic for your Substrate development wallet
- An Ethereum wallet to receive tokens into (the example presets an existing wallet address already)
- A Substrate provider (in case the hardcoded WSS within the script does not work)
- A Substrate development wallet funded with [sygUSD tokens](../../../08-resources/01-environments/03-testnet/01-obtain-testnet-tokens.md)


### Getting sygUSD tokens
Obtaining [sygUSD tokens from faucet guide](../../../08-resources/01-environments/03-testnet/01-obtain-testnet-tokens.md)

### Getting started

1. Clone the repository 

Clone the sygma-sdk repository into a directory of your choice, and then `cd` into the folder:

```bash
git clone https://github.com/sygmaprotocol/sygma-sdk.git
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
yarn sdk:build
```

4. Usage

:::danger
We make use of the dotenv module to manage Substrate's private mnemonics with environment variables. Please note that accidentally committing a .env file containing private mnemonics to a wallet with real funds, onto GitHub, could result in the complete loss of your funds. **Never expose your private keys.**
:::

This example uses the `dotenv` module to import the Substrate 12-word private mnemonic. To run the example, you will need to configure your environment variable to include your Substrate test development account's [12-word seed](https://support.polkadot.network/support/solutions/articles/65000169731-polkadot-extension-how-can-i-view-my-mnemonic-phrase-). A `.env.sample` is provided as a template.

**DO NOT COMMIT YOUR MNEMONIC WITH REAL FUNDS TO GITHUB. DOING SO COULD RESULT IN COMPLETE LOSS OF YOUR FUNDS.**

Create a `.env` file in the substrate-to-evm example folder:

```bash
# From the root of the cloned repository
cd examples/substrate-to-evm-fungible-transfer
touch .env
```

Replace the placeholder values in the script for `PRIVATE_MNEMONIC` and `RECIPIENT_ADDRESS` with your own.

`PRIVATE_MNEMONIC="YOUR TWELVE WORD MNEMONIC HERE WITH SPACES"`
`RECIPIENT_ADDRESS="YOUR EVM ADDRESS"`

   
To send a Substrate token transfer from Substrate to EVM, run:

```bash
cd examples/substrate-to-evm-fungible-transfer
yarn run transfer
```

The example will use `@polkadot/keyring` in conjunction with the sygma-sdk to create a transfer from Tangle to Sepolia with the `sygUSD` token. It will be received on Sepolia as a `sygUSD` token.

### Script functionality

This example script performs the following steps:

- Initializes the SDK by importing the required packages and defining the constants for the script.

```ts
import dotenv from "dotenv";

dotenv.config();

const MNEMONIC = process.env.PRIVATE_MNEMONIC;
if (!MNEMONIC) {
    throw new Error("Missing environment variable: PRIVATE_MNEMONIC");
}

const TANGLE_CHAIN_ID = 3799;
const SEPOLIA_CHAIN_ID = 11155111;

const RECIPIENT_ADDRESS =
    process.env.RECIPIENT_ADDRESS || "0xE39bb23F17a2cf7C9a8C4918376A32036A8867db";  // Replace with your EVM recipient address
const RESOURCE_ID_SYGMA_USD =
    "0x0000000000000000000000000000000000000000000000000000000000002000";
const SYGMA_EXPLORER_URL = "https://scan.test.buildwithsygma.com";
const TANGLE_RPC_URL =
    process.env.SOURCE_SUBSTRATE_RPC_URL ?? "wss://rpc.tangle.tools";

const getSygmaExplorerTransferUrl = (params: {
    blockNumber: number;
    extrinsicIndex: number;
}): string =>
    `${SYGMA_EXPLORER_URL}/transfer/${params.blockNumber}-${params.extrinsicIndex}`;
```

- Configures the dotenv module and sets the `MNEMONIC` as a value to be pulled from the `.env` file.

```ts
import dotenv from "dotenv";

dotenv.config();

const MNEMONIC = process.env.PRIVATE_MNEMONIC;

if (!MNEMONIC) {
  throw new Error("Missing environment variable: PRIVATE_MNEMONIC");
}
```

- Defines the main Substrate transfer function, including the connection to the blockchain using a WebSocket provider, initializing the asset transfer instance, and setting up the keyring and account from the mnemonic phrase.

```ts
const substrateTransfer = async (): Promise<void> => {
    // Make sure to account with native tokens
    const keyring = new Keyring({ type: "sr25519" });
    await cryptoWaitReady();
    const account = keyring.addFromUri(MNEMONIC);
    const wsProvider = new WsProvider(TANGLE_RPC_URL);
    const api = await ApiPromise.create({ provider: wsProvider });

    const transferParams: SubstrateAssetTransferRequest = {
        source: TANGLE_CHAIN_ID,
        destination: SEPOLIA_CHAIN_ID,
        sourceNetworkProvider: api,
        sourceAddress: account.address,
        resource: RESOURCE_ID_SYGMA_USD,
        amount: BigInt(5) * BigInt(1e17),
        destinationAddress: RECIPIENT_ADDRESS,
    };

    const transfer = await createSubstrateFungibleAssetTransfer(transferParams);
};
```

- Constructs a transfer object that calculates the fee, then builds, signs, and sends the transaction.

```ts
const transferTx = await transfer.getTransferTransaction();
const unsub = await transferTx.signAndSend(account, (result) => {})
```

- Logs the current status of the transaction, and if it's included in a block or finalized, outputs the respective block hash.

```ts
const unsub = await transferTx.signAndSend(account, (results) => {
    const { status } = results;
    console.log(`Current status is ${status.toString()}`);

    if (status.isInBlock) {
        console.log(
            `Transaction included at blockHash ${status.asInBlock.toString()}`,
        );
    } else if (status.isFinalized) {
        const blockNumber = results.blockNumber?.toNumber();
        const extrinsicIndex = results.txIndex;

        if (blockNumber && extrinsicIndex) {
            console.log(
                `Transaction finalized at blockHash ${status.asFinalized.toString()}`,
            );
            console.log(
                `Explorer URL: ${getSygmaExplorerTransferUrl({ blockNumber, extrinsicIndex })}`,
            );
        }
        unsub();
        process.exit(0);
    }
});
```

- And finally call the substrateTransfer method

```ts
substrateTransfer()
  .catch((e) => console.log(e))
  .finally(() => {});
```