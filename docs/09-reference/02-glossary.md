---
id: glossary
slug: /resources/glossary
title: Glossary
description: The following section details important glossary terms related to Sygma
---

**Burn-and-mint**: A process in blockchain where tokens are 'burned' or destroyed in one network and an equivalent number of tokens are 'minted' or created in another network, commonly used in pegged token mechanisms.

**Chain (ChainID)**: A unique identifier for a specific EVM blockchain network, used in transactions to distinguish between different chains and ensure transactions are processed on the correct blockchain. Commonly known `ChainID`'s can be obtained from [Chainlist](https://chainlist.org/).

**ChainBridge-core**: An extensible cross-chain communication protocol designed to be a framework for cross-chain applications. Sygma extends the foundational Chainbridge-core repo to build its interoperability solution.

**Cross-consensus message format (XCM)**: A messaging format and language used to communicate between consensus systems, particularly within the context of Polkadot/Kusama.

**Destination (target) chain**: The network to which a transaction, asset, or data is sent from another blockchain, usually in the context of cross-chain transfers or communication.

**Domain (DomainID)**: Serves a similar purpose to `ChainID` but is specific to the Sygma protocol. It uniquely identifies different domains or environments within Sygma's cross-chain communication framework, ensuring that messages and transactions are correctly routed and processed across different blockchains or segments of the network. `ChainID`'s and `DomainID`'s are registered together, so each `DomainID` is associated with a specific `ChainID`. This information is stored in the chain's storage and you can look up the mappings.

**Ethereum Virtual Machine (EVM)**: A computation engine that acts like a decentralized computer, executing smart contracts on the Ethereum network.

**Generic message passing**: A method for sending arbitrary data between different blockchains or layers within a blockchain, often used in cross-chain communication.

**Handlers**: Functions or mechanisms, implemented with smart contracts or pallets, that manage or direct specific types of operations or data processing in the context of cross-chain transactions.

**Liquidity provider**: An entity or individual that supplies tokenized assets to a liquidity pool, typically facilitating trading and other financial activities but also used for bridging in cross-chain transactions.

**Lock-and-release**: A mechanism in cross-chain transactions where assets are locked in one blockchain and equivalent assets are released in another blockchain.

**MPC-based relayer network**: A network of nodes that relay information using multi-party computation (MPC), a cryptographic method that allows multiple parties to compute a function over their inputs while keeping them private.

**Network**: Refers to the entirety of a blockchain infrastructure or ecosystem such as nodes, protocols, and technologies e.g. Ethereum Mainnet, Polygon, Base, etc. 

**Pallets**: Components in the Substrate framework that encapsulate specific blockchain functionalities, easily integrated into a Substrate-based blockchain.

**Parachains**: Individual blockchains that run in parallel within the Polkadot or Kusama ecosystem. They connect to the main relay chain to benefit from its security and interoperability features.

**Relay Chain**: The central chain of a parachain network like Polkadot. It provides security and interoperability for all connected parachains. 

**Relayers**: Entities in blockchain systems that relay information from one blockchain to another. Instead of operating full nodes, a relayer operator is listening to events on a source or target chain and sending packets of data to and from different blockchains on behalf of the blockchain’s users. 

**Resource (ResourceID)**: This is a unique identifier for an asset (e.g. ERC-20 or generic message) in Sygma.

**Route**: The bidirectional path a transaction or message can take as it moves between networks or blockchains in a cross-chain operation.

**Source (origin) chain**: Refers to the initial blockchain network from which a transaction, asset, or data originates before being transferred to another chain.

**Substrate**: A modular framework for building blockchains (e.g. Polkadot, Kusama), enabling developers to create purpose-built chains tailored to specific applications (e.g. Phala, Astar)
