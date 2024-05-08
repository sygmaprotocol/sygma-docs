---
slug: /protocol/ecosystem/evm
id: protocol-evm
title: EVM Support
description: The following details EVM support on Sygma.
---

:::info
The following section details Sygma's compatibility with EVM chains via its ecosystem of smart contracts. 
:::

A list of currently supported EVM chains and their deployed addresses can be found in [Environments](../../../08-reference/01-environments/01-index.md).

Sygma uses Solidity smart contracts to enable transfers to and from Ethereum Virtual machine (EVM) compatible chains. These contracts consist of a core bridge contract (Bridge.sol) and a set of handler contracts (ERC20Handler.sol, ERC721Handler.sol, PermissionedGenericHandler.sol, PermissionlessGenericHandler.sol). The bridge contract is responsible for initiating and executing proposed transfers. The handlers are used by the bridge contract to interact with other existing contracts.