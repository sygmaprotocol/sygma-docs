---
slug: /protocol/tailoredsecurity/
id: tailoredsecurity-introduction
title: Introduction To Tailored Security
description: The following details Sygma's Tailored Security protocol
---

# What Is Tailored Security?

Cross-chain use cases are advancing beyond just simply bridging assets. Interoperability now services complex interactions, from cross-chain contract execution to cross-chain liquid staking solutions, requiring the consensus of multiple verification systems to facilitate these. While the vast number of bridging solutions aim to enhance the trustworthiness and efficiency of cross-chain interoperability, most employ fixed security pathways, and none over aggregated tailored security routes. A true interoperability protocol should be able to adapt its verification mechanisms based on transaction type, assets involved, protocols of both chains and security and cost requirements. The Sygma cross-consensus interoperability protocol achieves this through its evolved architecture and advanced application design, automatically and dynamically routing transactions through the most optimal combinations of verification mechanisms based on the user’s needs and input parameters.

## Scenario

Consider two scenarios: a gamer transferring their character NFT and a crypto whale liquidating a large stake. These examples, while targeting the same domains (source and destination chains), have so far been restricted to bridges that operate under a uniform security model with identical fees and latency. While this one-size-fits-all approach does technically get the job done, it often leads to dissatisfaction for at least one of the users and, in the worst case, for both.

The above scenarios illustrate that a few key parameters must be considered when transacting cross-chain: *security* (high/low); *speed* (fast/slow); and *fees* (expensive/cheap). Additionally, considerations must be given to *asset type*, *amounts*, and even *market implications*.

Building up from these principles, the Sygma protocol offers an alternative approach to securing cross-consensus interoperability: **Tailored Security**. It empowers users and developers to make optimal choices based on any given context. Sygma's Tailored Security leverages a multi-layered framework that combines **proof of authority**, **optimistic execution**, and **ZK proofs** to offer choice and flexibility to users. See [Verification Systems](#verification-systems) for more.

Token routes between source and destination networks can be integrated with any one of these verification systems. Meanwhile, Sygma relayer nodes are equipped to handle and relay messages between chains no matter the framework selected.

![](<../../../static/assets/tailoredsecurity_compare.png>)

## Sygma's Verification Systems

Sygma’s verification systems can be dynamically chosen by a routing gateway as a single or combined system. It has been architected to provide the most optionality in order to reach cross-chain consensus. Sygma’s MPC, Spectre, and Zipline balance degrees of trust minimization and can be combined to ensure the highest level of security. 

- [**Multi-party computation (MPC)**](../02-Tailored-Security/02-MPC/02-mpc.md): a distributed set of relayers leveraging MPC to attest to the validity of transactions on a source chain, which then transmits the corresponding signed attestation to the destination chain.

- [**Spectre**](../02-Tailored-Security/03-Spectre/01-spectre-intro.md): a trust-minimized zero knowledge (zk) light-client coprocessor that generates zk-SNARK proofs of source chain consensus and user-defined computation of the verified blockchain state that can be efficiently verified on the destination chain.

- [**Zipline**](../02-Tailored-Security/04-Zipline/01-zipline-intro.md): a trust-minimized, gas-efficient, optimistic, fraud-proof verification system, which assumes transaction validity and offloads dispute verification to external challengers.

The following documentation will dive into each verification system in detail. 