---
slug: /protocol/ecosystem/btc
id: protocol-btc
title: Bitcoin Support
description: The following details Bitcoin support on Sygma.
draft: true
---

:::info
The following section details Sygma's compatibility with Bitcoin and its constituent layer-2's. 
:::

The Sygma protocol also supports Bitcoin and its constituent layer-2 networks. A key feature of stateful chains built in EVM and Substrate is the ability for them to generate event logs. These event logs are crucial to Sygma's relayer network: they interpret these logs, parses the messages within them, verifies the truthfulness of these computations, and posts them to the destination chains. However, Bitcoin and other UTXO-based chains generally do not have the concept of "state", much less the ability to produce event logs. 

