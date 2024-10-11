---
slug: /sdk/quickstart/transfertoken
id: quickstart-transfertoken
title: EVM Token Transfers
description: The following section details how to perform a cross-chain token transfer.
sidebar_position: 2
draft: false
---

:::info
In the examples below `Ethers` v5 was used. If you were to use v6, keep in mind the differences between versions.
:::

# Transferring a fungible asset between EVM chains

Transferring assets between EVM-based chains can be achieved using the Sygma SDK. To facilitate the transfer, the following steps are required:

1. Specify transfer parameters such as amount, recipient address, token, destination chain and use the method `createFungibleAssetTransfer` from `@buildwithsygma/evm` to create an instance of `FungibleAssetTransfer`
2. Check for any approvals required, and if required sign and broadcast these transactions.
3. Prepare, sign, and send the Transfer transaction to the Source network node

## 1. Create and initialize the transfer object

To initialize the asset transfer object, the following parameters are required:

- An EIP1193 compatible EVM provider
- Environment variable `SYGMA_ENV` needs to be set as `mainnet` or `testnet`

```typescript
const fungibleTokenTransfer = await createFungibleAssetTransfer({
  source: 1, // Ethereum Mainnet
  destination: 8453, // Base
  sourceNetworkProvider: eip1193CompatibleProvider,
  resource:
    "0x0000000000000000000000000000000000000000000000000000000000000002", // ETH Resource ID can be found here: https://github.com/sygmaprotocol/sygma-shared-configuration/blob/0e3470df4935ae3cce8b44f496723070ff3b3d1c/mainnet/shared-config-mainnet.json
  amount: BigInt(1) * BigInt(1e17),
  recipientAddress: "",
  sourceAddress: sourceAddress, // source wallet address
});
```

## 2. Send Approval transactions

You can check if approvals are required for your transfer. If there are approvals required for the transfer, you can sign the transaction and send it.

```typescript
const approvals = await fungibleTokenTransfer.getApprovalTransactions();
for (const approval of approvals) {
  const tx = await wallet.sendTransaction(approval);
  await tx.wait();
}
```

## 3. Send transfer transaction

Once all the approvals have been confirmed you can finally send the actual fungible token transfer transaction.

```typescript
const transfer = await transfer.getTransferTransaction();
const tx = await wallet.sendTransaction(transfer);
await tx.wait();
```

### Checking transaction hash

The response object returned by the sendTransaction method contains a hash property. This transaction hash is logged to the console, and it can be used to look up the transaction on a block explorer.

```typescript
console.log("Sent transfer with hash: ", tx.hash);
```

A full example of the above can be found [here](https://github.com/sygmaprotocol/sygma-sdk/blob/main/examples/evm-to-evm-fungible-transfer/src/transfer.ts)
