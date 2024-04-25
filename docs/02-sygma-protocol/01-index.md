---
slug: /protocol
id: protocol-index
title: Sygma Protocol
description: The following details the architecture of Sygma.
---

:::info
The following section details the architectural components of the Sygma protocol.
:::

The Sygma interoperability protocol is able to transfer both tokens and arbitrary data. This allows developers and users to transfer ERC-20 tokens, ERC-721 tokens, ERC-1155 tokens, and **[Generic data](./06-generic.md).** Generic data can be used to bridge governance proposals or voting actions, for example, or any other contract call by transferring [calldata](https://ethereum.stackexchange.com/questions/52989/what-is-calldata).

Sygma uses an offchain [relayer](./03-relayers.md) network to verify events on one chain that are to be posted to a destination chain. These relayer nodes, or agents, use a variety of verification systems to determine canon across chains. You can read more about this feature under [Tailored Security](./02-Tailored-Security/01-index.md).

Currently, the Sygma protocol is compatible with [EVM](./04-Supported-Ecosystems/EVM/) and [Substrate](./04-Supported-Ecosystems/Substrate/)-based networks, but is proven to be easily extended to other networks such as [Cosmos](./04-Supported-Ecosystems/Cosmos/)-based chains (Tendermint) and [Bitcoin](./04-Supported-Ecosystems/Bitcoin/) as well.

The below diagram describes the typical transfer flow within the Sygma protocol. 

## Sygma Bridging Flow Diagram&#x20;

![](<../../static/assets/Bridging Diagram.png>)
