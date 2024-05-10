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

# Introduction To Sygma's Spectre

<!-- TODO: 6.5 minutes aka every epoch proofs are sent to ethereum -->

Whereas Sygma's secure [MPC](../02-MPC/02-mpc.md) architecture provides low cost, high speed, and moderately secure attestation of cross-chain messaging events, Sygma's **zero knowledge (zk) light client coprocessor, Spectre**, offers a trust-minimized, highly secure verification system that brings high speeds and low cost (at scale) in zk verification to EVM-based environments. At a high level, the verification system is implemented via 1) a set of Spectre-specific contract addresses (or equivalent in other ecosystems), 2) a Spectre-specific relayer, 3) and an inclusion prover. The Spectre relayer, upon detection of an onchain event, submits zk-SNARK proofs of source chain block headers to an executor contract on the destination chain. A separate offchain inclusion prover must also submit the execution with the zk proof of the inclusion to the executor. If valid, the execution will then be posted to the destination chain, signifying the end of a Spectre-verified cross-chain interaction.

## What Is Spectre?

Spectre implements a blockchain coprocessor to offload intensive computations from a constrained onchain execution layer to a more expansive offchain environment. Its purpose is to produce succinct proofs of [Gasper](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/) consensus that can be efficiently verified on a destination chain. 

This model stands in contrast to the prevailing approach where a committee of relayers post a [signature](../02-MPC/06-signing.md) (generated via [MPC](../02-MPC/02-mpc.md)) stating that the majority of them have detected a certain onchain event. It's crucial to note that neither the threshold signature nor its generation process is concerned with specific consensus rules — they merely confirm the signer's assertions. 

In contrast, the coprocessor proofs are tailored to the exact computations being verified. Therefore, no valid proof can exist for a computation that halts, for instance, due to fraudulent inputs. Spectre’s coprocessor proofs are cryptographic arguments of knowledge, or **SNARK**s (Succinct, Non-Interactive Arguments of Knowledge). A critical aspect of Spectre is that it does not rely on trusted intermediaries and makes no probabilistic economic assumptions.

Spectre consists of three main components:
- **Spectre Prover**
- **Light-client Circuits**
- **Verifier Contracts**

## Spectre Prover

The prover generates a zero-knowledge proof by performing the necessary computations without revealing any information apart from the validity of a statement. This component utilizes a fork of the [Halo2 proving stack](https://github.com/privacy-scaling-explorations/halo2). 

## Light-client Circuits

Circuits in the context of ZK proofs refers to the arithmetic circuit that defines the computation being proved. These circuits are a way to describe computations in terms that are suitable for cryptographic proofs. In Spectre, circuits are implemented using the [halo2-lib](https://github.com/axiom-crypto/halo2-lib) circuit development framework, which ensures that the circuits are both efficient and secure. The circuits specify the series of arithmetic operations that the prover must perform to generate a valid proof. For Spectre, these circuits specifically handle operations related to verifying the Ethereum Altair Light Client protocol. This library contains a number of non-trivial optimization tricks, while its readable SDK prevents most of the soundness bugs and improves auditability.

![](<../../../../static/assets/spectre_lightclient_benchmark.png>)

## Verifier Contract

"Verifier Contracts" are smart contracts deployed on a blockchain that verify the consensus proofs submitted by the prover. These contracts contain the logic necessary to validate the inclusion of transactions in a block that was finalized on the source chain - without having to redo the computation. In Spectre, these contracts are auto-generated and can handle proofs related to the consensus rules of the Ethereum blockchain as modified by the [Altair hardfork](https://ethereum.org/en/history/#altair). The verifier contract checks the proof provided by the prover using only a small amount of data and confirms whether the proof is correct, thereby ensuring that the computation was performed accurately and without tampering.
