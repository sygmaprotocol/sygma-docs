---
slug: /protocol/ecosystem/evm
id: protocol-evm
title: EVM Support
description: The following details EVM support on Sygma.
---

:::info
The following section details Sygma's compatibility with EVM chains via its ecosystem of smart contracts. 
:::

Sygma uses Solidity smart contracts to enable transfers to and from Ethereum Virtual machine (EVM) compatible chains. These contracts consist of a core bridge contract (`Bridge.sol`), and a set of handler contracts (e.g. `ERC20Handler.sol`, `ERC721Handler.sol`, `PermissionlessGenericHandler.sol`, `FeeHandlerRouter.sol`, `BasicFeeHandler.sol`). [Different verification systems](../../02-Tailored-Security/01-index.md) also require separate sets of smart contracts. These onchain components establish a relationship with the offchain actors via generation and detection of onchain contract events. 

## Sygma's Smart Contracts

### Bridge 

The bridge contract is responsible for initiating and executing proposed transfers. It facilitates and manages cross-chain transfer of assets and messages by recording and verifying `deposit`, `executeProposals`, and other events. The actual handling of the deposits/withdrawals is handled by the appropriate handler contracts. The `Bridge.sol` contract serves as the primary gateway for a cross-chain interaction. 

### Handlers

The handlers are used by the bridge contract to interact with other existing contracts. For example, the `ERC20Handler` contract handles fungible ERC-20 tokens, enabling their deposit, withdrawal, and management within the protocol. On the other hand, the `PermissionlessGenericHandler` contract processes generic message deposits and their execution. It is designed to handle complex data encoding for executing transactions across chains.

Beyond contracts handling asset/message types, there are handler contracts that route fees (`FeeHandlerRouter`) and collect/manage fees (`BasicFeeHandler`, `PercentageFeeHandler`) based on the destination `domain` and `resourceID` (see below for more on domains and resources).

For more information on both the Bridge and Handler contracts, please visit the [sygma-solidity](https://github.com/sygmaprotocol/sygma-solidity) repo.

### Spectre

Sygma's zk verification system, [Spectre](../../02-Tailored-Security/03-Spectre/01-spectre-intro.md), implements a separate set of smart contracts, including the Bridge and Handler contracts discussed previously. Additionally, Spectre implements Spectre-specific smart contracts such as `Spectre`, the `SpectreProxy`, `AccessControlSegregator`, `Router`, and `Executor`.  Crucially, the `Spectre` and `SpectreProxy` contracts follow Ethereum's sync committee rotations, allowing lightweight verification of source computation. On the other hand, the `Executor`contract is responsible for receiving 1) block header proofs from the offchain Spectre relayer node and 2) execution submissions and inclusion proofs from the offchain inclusion prover, and then finally "executing" on a cross-chain interaction. 

For more information on these contracts, please visit the [sygma-x-solidity](https://github.com/sygmaprotocol/sygma-x-solidity) repo.

## Resources and Domains 



## MPC Environment Configuration

Each domain is defined with:

- `domainID`: a string representing the domain ID
- `MPCAddress`: a string representing the MPC address. If omitted `endKeygen` will not be called as part of the migration script.
- `fee`: an object containing a definition of the fee handlers that will be deployed.The current limitation is that only one BasicFeeHandler and one DynamicERC20FeeHandlerEVM can be deployed using the migration script.
  - `basic`: fee handler properties that will be configured after deployment
    - `fee`: a string representing a fee amount
  - `oracle`: fee handler properties that will be configured after deployment
    - `gasUsed`: a string representing a amount of units of gas that should be used for calculating transaction cost
    - `feePercentage`: a number representing the percentage of the total deposited amount that will be taken as a fee (this is only applicable if the calculated transaction cost is smaller than the fee calculated as a percentage of the deposited amount)
- `access`: an object containing access control information used for transferring admin access as the final step of the migration. If omitted, this migration step will be skipped.
  - `feeHandlerAdmin`: an address to which admin access for all deployed fee handlers will be renounced
  - `feeRouterAdmin`: an address to which admin access for deployed fee router will be renounced
  - `accessControl`: an object representing an access control map (each property defines specific function and address that will be granted access to this function)
- `erc721`: an array of ERC721 tokens, with the following properties:
  - `name`: a string representing the name of the token
  - `symbol`: a string representing the symbol of the token
  - `uri`: a string representing the URI of the metadata
  - `resourceID`: a string representing Sygma's cross-chain resourceID
  - `feeType`: a string representing the type of fee handler that should be registered for this token for all destination networks (oracle or basic)
- `erc20`: an array of ERC20 tokens, with the following properties:
  - `name`: a string representing the name of the token
  - `symbol`: a string representing the symbol of the token
  - `resourceID`: a string representing Sygma's cross-chain resourceID
  - `feeType`: a string representing the type of fee handler that should be registered for this token for all destination networks (oracle or basic)
  - `strategy`: a string representing the token issuance strategy (mb for mint/burn or lr for lock/release)
  - `decimals`: a string representing the number of decimals for the token
- `permissionedGeneric`: an array of permissioned generic resources, with the following properties:
  - `resourceID`: a string representing Sygma's cross-chain resourceID
  - `feeType`: a string representing the type of fee handler that should be registered for this resource for all destination networks (oracle or basic)
  - `depositFunctionSig`: a string representing the deposit function signature
  - `depositorOffset`: a number representing the depositor offset
  - `executeFunctionSig`: a string representing the function signature of the function that should be called on execution
- `permissionlessGeneric`: permissionless generic handler deployment definition:
  - `resourceID`: a string representing Sygma's cross-chain resourceID
  - `feeType`: a string representing the type of fee handler that should be registered for this resource for all destination networks (oracle or basic)