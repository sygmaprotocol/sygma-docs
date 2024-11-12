---
slug: /sdk/quickstart/gmp
id: quickstart-gmp
title: Generic Message Passing (GMP)
description: The following section details how to perform GMP transfers.
sidebar_position: 4
draft: false
---

:::info
In the examples below `Ethers` v5 was used. If you were to use v6, keep in mind the differences between versions.
:::

# Generic Message Passing (GMP)

Generic messages can be transferred between EVM chains using the Sygma SDK. To facilitate the transfer, the following steps are required:

1. Specify generic message transfer parameters and create an instance of `GenericMessageTransfer` using `createCrossChainContractCall` method from `@buildwithsygma/evm` package.
2. Sign and send the transfer transaction.

There are a few requirements for the Destination chain contract function that gets called. Refer to the [Generic Message Passing documentation](../../02-sygma-protocol/06-generic.md) for details.

## 1. Create and initialize the transfer object

To initialize the generic message transfer object, the following parameters need to be supplied:

- An `EIP-1193` compatible EVM provider
- Environment variable `SYGMA_ENV` needs to be set as `mainnet` or `testnet`
- Address, `ABI` of the contract and the function that will be invoked on the destination chain.

```typescript
const gmpTransfer = await createCrossChainContractCall<
  typeof sepoliaBaseStorageContract,
  "store"
>({
  gasLimit: BigInt(0),
  functionParameters: ["0x<addr1>", "0x<addr2>", BigInt(1)],
  functionName: "store",
  destinationContractAbi: sepoliaBaseStorageContract,
  destinationContractAddress: "0x4bE595ab5A070663B314970Fc10C049BBA0ad489",
  maxFee: BigInt("3000000"),
  source: 11155111, // Sepolia
  destination: 84532, // Base Sepolia
  sourceNetworkProvider: eip1193CompatibleProvider,
  sourceAddress: "<source_evm_wallet_address>",
  resource:
    "0x0000000000000000000000000000000000000000000000000000000000000600",
});
```

## 2. Sign and send the transfer transaction

```typescript
const transaction = await gmpTransfer.getTransferTransaction();
const tx = await wallet.sendTransaction(transaction);
await tx.wait();
```

A full example of the above can be found [here](https://github.com/sygmaprotocol/sygma-sdk/blob/main/examples/evm-to-evm-generic-message-transfer/src/transfer.ts)
