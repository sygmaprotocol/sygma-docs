---
slug: /sdk/quickstart/substrate-token-transfer
id: quickstart-substrate-token-transfer
title: Substrate Token Transfers
description: Section that describes how to transfer token from or to a Substrate network.
sidebar_position: 3
draft: false
---

# Substrate to EVM Fungible token transfer

Transferring assets from Substrate-based chains to EVM-based chains can be achieved using the Sygma SDK. To facilitate the transfer, the following steps are required:

1. Specify transfer parameters such as amount, recipient address, token, destination chain and use the method `createSubstrateFungibleAssetTransfer` from `@buildwithsygma/substrate` to create an instance of `SubstrateFungibleAssetTransfer`
2. Sign and send the transfer transaction using `polkadot.js`

## 1. Create and initialize the transfer object

To initialize the asset transfer object, the following parameters need to be supplied:

- An instance of the PolkadotJS `ApiPromise` object
- Environment variable `SYGMA_ENV` needs to be set as `mainnet` or `testnet`

```typescript
const fungibleTokenTransfer = await createSubstrateFungibleAssetTransfer({
  source: 5232, // Phala
  destination: 1, // Ethereum Mainnet
  sourceNetworkProvider: apiPromise,
  sourceAddress: "<substrate_address>",
  resource:
    "0x0000000000000000000000000000000000000000000000000000000000000001", // PHA resource ID more resources can be found here: https://github.com/sygmaprotocol/sygma-shared-configuration/blob/main/mainnet/shared-config-mainnet.json
  amount: BigInt(1) * BigInt(1e12),
  destinationAddress: "<evm_recipient_address>",
});
```

## 2. Sign and send transfer transaction

```typescript
const tx = await fungibleTokenTransfer.getTransferTransaction();
await transferTx.signAndSend(account, (results) => {
  const { status } = results;
  console.log(`Current status is ${status.toString()}`);
});
```

A full example of the above can be found [here](https://github.com/sygmaprotocol/sygma-sdk/blob/main/examples/substrate-to-evm-fungible-transfer/src/transfer.ts)
