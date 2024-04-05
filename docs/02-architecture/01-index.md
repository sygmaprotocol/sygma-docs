---
slug: /architecture
id: architecture-index
title: Architecture
description: The following details the architecture of Sygma.
---

:::info
The following details the architecture of Sygma.
:::

The Sygma messaging protocol is able to transfer arbitrary data. This allows us to transfer not only ERC-20 tokens, but also ERC-721 (e.g. NFTs), in addition to something else we refer to as: **Generic data.** Generic data can be used to bridge governance proposals or voting actions, for example, or any other contract call by transferring [calldata](https://ethereum.stackexchange.com/questions/52989/what-is-calldata).

Currently, the Sygma protocol is compatible with EVM and Substrate-based networks, but is proven to be easily extended to other networks such as Cosmos-based chains (Tendermint) as well.

Sygma Bridging Flow Diagram&#x20;

![](<../../static/assets/Bridging Diagram.png>)
