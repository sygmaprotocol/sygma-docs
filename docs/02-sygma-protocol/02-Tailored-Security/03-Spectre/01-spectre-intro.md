---
slug: /tailoredsecurity/spectre/intro
id: tailoredsecurity-spectre-intro
title: Introduction To Spectre
description: The following details how Spectre is utilized by Sygma.
draft: false
---

:::info
The following details Sygma's Spectre verification system utilizing zero-knowledge (zk) proofs of consensus between EVM domains.
:::

Whereas Sygma's secure [MPC](../02-MPC/02-mpc.md) architecture provides low cost, high speed, and moderately secure attestation of cross-chain messaging events, Sygma's **zero knowledge (zk) light node, Spectre**, offers a trust-minimized, highly secure verification system that offers high speeds and low cost (at scale) in zk verification. 

Spectre implements a blockchain coprocessor to offload intensive computations from a constrained onchain execution layer to a more expansive offchain environment. Its purpose is to produce succinct proofs of [Gasper](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/) consensus that can be efficiently verified on a destination chain.

This model stands in contrast to the prevailing approach where a committee of relayers post a [signature](../02-MPC/06-signing.md) (generated via [MPC](../02-MPC/02-mpc.md)) stating that the majority of them have detected a certain onchain event. 

It's crucial to note that neither the threshold signature nor its generation process is concerned with specific consensus rules — they merely confirm the signer's assertions. In contrast, the coprocessor proofs are tailored to the exact computations being verified. Therefore, no valid proof can exist for a computation that halts, for instance, due to fraudulent inputs.

Spectre’s coprocessor proofs are cryptographic arguments of knowledge, or **SNARKs** (Succinct, Non-Interactive Arguments of Knowledge). A critical aspect of Spectre is that it does not rely on trusted intermediaries and makes no probabilistic economic assumptions.

Spectre consists of three main components:
- **Spectre Prover**
- **Light-client Circuits**
- **Verifier Contracts**

## Spectre Prover

The prover generates a zero-knowledge proof by performing the necessary computations without revealing any information apart from the validity of a statement. This component utilizes a fork of the [Halo2 proving stack](https://github.com/privacy-scaling-explorations/halo2). 

## Light-client Circuits

Circuits in the context of ZK proofs refers to the arithmetic circuit that defines the computation being proved. These circuits are a way to describe computations in terms that are suitable for cryptographic proofs. In Spectre, circuits are implemented using the [halo2-lib](https://github.com/axiom-crypto/halo2-lib) circuit development framework, which ensures that the circuits are both efficient and secure. The circuits specify the series of arithmetic operations that the prover must perform to generate a valid proof. For Spectre, these circuits specifically handle operations related to verifying the Ethereum Light Client protocol. This library contains a number of non-trivial optimization tricks, while its readable SDK prevents most of the soundness bugs and improves auditability.

![](<../../../../static/assets/spectre_lightclient_benchmark.png>)

## Verifier Contract

"Verifier Contracts" are smart contracts deployed on a blockchain that verify the proofs submitted by the prover. These contracts contain the logic necessary to validate the proofs without having to redo the computation. In Spectre, these contracts are auto-generated and can handle proofs related to the consensus rules of the Ethereum blockchain as modified by the [Altair hardfork](https://ethereum.org/en/history/#altair). The verifier contract checks the proof provided by the prover using only a small amount of data and confirms whether the proof is correct, thereby ensuring that the computation was performed accurately and without tampering.
