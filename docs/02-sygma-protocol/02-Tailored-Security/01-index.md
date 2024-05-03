---
slug: /protocol/tailoredsecurity/
id: tailoredsecurity-introduction
title: Introduction To Tailored Security
description: The following details Sygma's Tailored Security protocol
---

# What Is Tailored Security?

The Sygma Protocol offers modularized security for diverse cross-chain use cases. 

Consider two scenarios: a gamer transferring their character NFT and a crypto whale liquidating a large stake. These examples, while targeting the same domains (source and destination chains), have so far been restricted to bridges that operate under a uniform security model with identical fees and latency. While this one-size-fits-all approach does technically get the job done, it often leads to dissatisfaction for at least one of the users and, in the worst case, for both.

The above scenarios illustrate clearly that a few key parameters must be considered when transacting cross-chain: security (high/low); speed (fast/slow); and fees (expensive/cheap). Additionally, considerations must be given to asset type, amounts, and even market implications. 

Building up from these principles, the Sygma protocol offers an alternative approach: **Tailored Security**. It empowers users and developers to make optimal choices based on any given context. Sygma's Tailored Security leverages a multi-layered framework that combines [Proof of Authority](../02-Tailored-Security/02-MPC/02-mpc.md), [Optimistic Execution](../02-Tailored-Security/04-Zipline/01-zipline-intro.md), and [ZK proofs](../02-Tailored-Security/03-Spectre/01-spectre-intro.md) to offer users choice and flexibility. 

Token routes between two networks can be integrated with any one of these verification systems, and Sygma relayer nodes are equipped to handle and relay messages between chains no matter the framework.

![](<../../../static/assets/tailoredsecurity_compare.png>)