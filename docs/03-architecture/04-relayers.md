---
slug: /architecture/relayers
id: architecture-relayers
title: Relayers
description: The following details how relayers are defined and managed by Sygma.
---

:::info
The following details how relayers are defined and managed by Sygma.
:::

_Relayers are entities that ensure bridge decentralization and execute asset bridging._

At the core of Sygma exists a **set of relayers** that are distributed among several legal entities and operate under a trusted federation model. Spreading the relayer set across several legal entities creates a distribution of responsibilities and mitigates risk by disincentivizing relayers in the set to act in an unfair manner.

Each relayer within the set listens to both the source and destination chains that are being bridged by Sygma. Based on events that are emitted, these relayers then execute relevant actions.

This multi-relayer set is responsible for relaying messages from a source network to a destination network. Relayers are operating with private key share and execution happens on the destination network with [MPC](/docs/03-architecture/02-mpc.md) private key.&#x20;

Communication between relayer parties happens in a [p2p](https://en.wikipedia.org/wiki/Peer-to-peer) manner; and participants of [p2p](https://en.wikipedia.org/wiki/Peer-to-peer) and MPC communication are strictly defined by a configuration file this allows us to prevent [Sybil Attacks](https://en.wikipedia.org/wiki/Sybil\_attack).

For more on our current list of relayer partners or learn how to become one, please see [Becoming A Relayer Partner](../04-integrating-with-sygma/03-relayer-partner.md).

<!-- TODO Relayers can be configured for various verification systems, including [MPC](../03-architecture/02-mpc.md), Spectre's zk verification, and Zipline's optimistic verification. -->
