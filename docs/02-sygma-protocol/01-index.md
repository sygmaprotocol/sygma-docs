---
slug: /protocol
id: protocol-index
title: Sygma Protocol
description: The following details the architecture of Sygma.
---

:::info
The following section details the architecture of the Sygma protocol.
:::

The Sygma interoperability protocol is able to transfer both tokens and arbitrary data. This allows developers and users to transfer ERC-20 tokens, ERC-721 tokens, ERC-1155 tokens, and **Generic data.** Generic data can be used to bridge governance proposals or voting actions, for example, or any other contract call by transferring [calldata](https://ethereum.stackexchange.com/questions/52989/what-is-calldata).

Currently, the Sygma protocol is compatible with EVM and Substrate-based networks, but is proven to be easily extended to other networks such as Cosmos-based chains (Tendermint) as well.

The below diagram describes the typical transfer flow within the Sygma protocol. 

## Sygma Bridging Flow Diagram&#x20;

![](<../../static/assets/Bridging Diagram.png>)
