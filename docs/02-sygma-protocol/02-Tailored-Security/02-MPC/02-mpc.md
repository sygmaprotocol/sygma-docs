---
slug: /tailoredsecurity/mpc/intro
id: tailoredsecurity-mpc-intro
title: MPC
description: The following details how MPC is utilized by Sygma.
---

:::info
The following details the base relayer node implementation using multi-party computation.
:::

**Secure multi-party computation (MPC)** represents a powerful next step in digital asset security because it eliminates the risk of a single point of compromise.

Instead of relying on [Multisigs](https://en.wikipedia.org/wiki/Multisignature) or other, older ways of key management that either expose [relayer](../../03-relayers.md) identities or introduce easily exploitable single points-of-failure, relayers for Sygma run a secure MPC ceremony each time a user wishes to bridge funds or transfer arbitrary data. In this way, MPC enables multiple parties to carry out a distributed computation on their secret inputs without revealing anything but the output.&#x20;

MPC was introduced as a solution for the **[Two Billionaires Problem](https://en.wikipedia.org/wiki/Yao%27s_Millionaires%27_problem)** (Bob and Alice; how to decide who is richer without showing their exact funds, a specific problem which is a Boolean predicate).

The multi-party computation (MPC) model that Sygma employs includes a number of trusted relayer nodes operating under [a trusted federation](https://blog.chainsafe.io/bridges-in-crypto-space-12e158f5fd1e). These trusted relayer nodes are run by reputable entities in the web3 space.

For a detailed research piece, please see [Multi-Party Computation: The Next Generation of Crypto Security](https://blog.buildwithsygma.com/multi-party-computation/) from our blog.
