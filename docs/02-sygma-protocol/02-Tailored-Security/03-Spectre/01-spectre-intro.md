---
slug: /tailoredsecurity/spectre/intro
id: tailoredsecurity-spectre-intro
title: Spectre
description: The following details how Spectre is utilized by Sygma.
---

:::info
The following details Sygma's Spectre (zero-knowledge light client) verification system.
:::

# Introduction To Spectre

Spectre implements a blockchain coprocessor to offload intensive computations from a constrained onchain execution layer to a more expansive offchain environment. Its purpose is to produce succinct proofs of [Gasper](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/) consensus that can be efficiently verified on a destination chain.

This model stands in contrast to the prevailing approach where a committee of relayers posts a [signature](../02-MPC/06-signing.md) (generated via [MPC](../02-MPC/02-mpc.md)) stating that the majority of them have detected a certain onchain event. 

The difference may appear subtle at first, so it's crucial to note that neither the threshold signature nor its generation process is concerned with specific consensus rules — they merely confirm the signer's assertions. In contrast, the coprocessor proofs are tailored to the exact computations being verified. Therefore, no valid proof can exist for a computation that halts, for instance, due to fraudulent inputs.

Spectre’s coprocessor proofs are cryptographic arguments of knowledge, that is, SNARKs (Succinct, Non-Interactive Arguments of Knowledge). A critical aspect of Spectre is that it does not rely on trusted intermediaries and makes no probabilistic economic assumptions.

Spectre consists of three main components:
- Spectre Prover
- Light-client Circuits
- Verifier Contracts

