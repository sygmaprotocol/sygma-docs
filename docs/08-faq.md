---
title: FAQs
description: The following section contains frequently asked questions about Sygma
---

## FAQs

### General
1. **Is there a token for Sygma?**  
  There are no plans for a Sygma token. Please be aware of scams and impersonators that suggest otherwise. 

2. **Where can I find help if I have further questions?**  
  You can join the Sygma [Discord](https://discord.gg/Qdf6GyNB5J) and ask in any support-related channels. Sygma engineers are generally very responsive to technical queries, and someone will usually be on-call to answer more general questions.

3. **Do you have any live integrations?**  
  Sygma is live on Phala's [SubBridge](https://subbridge.io), allowing native token transfers between Ethereum's Mainnet and Phala/Khala. Additionally, with Polkadot's capability for [Cross-Consensus Messaging (XCM)](https://wiki.polkadot.network/docs/learn-xcm) between parachains, users can bridge in and out of [Astar Network](https://astar.network).

4. **How can I make contributions to Sygma?**
  You can submit an application to Sygma's [Contributor Program](https://buildwithsygma.com/contributors) or [Builder Program](https://buildwithsygma.com/builders-program) for medium-to-large effort contributions.
  
  Sygma is eager for developers to jump into the [GitHub](https://github.com/sygmaprotocol) and help test the code and submit issues. 
  
  Sygma invites engaged participants with high initiative to begin making smaller contributions, whether that's to the [Discord](https://discord.gg/Qdf6GyNB5J), to the [documentation](https://docs.buildwithsygma.com) or by creating content. Make sure to check out the [Contribute](10-contribute.md) page for contributions related to Sygma's documentation.

### General Support
5. **Is my ecosystem/blockchain/token supported?**  
  Sygma is currently built to support EVM and Substrate-based chains. The [Solidity contracts](https://github.com/sygmaprotocol/sygma-solidity) and [custom-built pallets](https://github.com/sygmaprotocol/sygma-substrate-pallets) can be adapted to most ecosystems built in these environments, whether that's mainnet Ethereum, an EVM L2, a Polkadot/Kusama parachain, or a standalone Substrate chain.

  If your ecosystem/blockchain/token is not supported (e.g. Tendermint), support could be provided in the near-future. It depends on engineering resources and network demand. If you would like to move ahead with an engineering/product consultation, please contact Sygma on [Discord](https://discord.gg/Qdf6GyNB5J) or fill out [this form](https://share.hsforms.com/1K4-T_yaKSp6F06FGk4wsSgnmy2x).

6. **Can I add my own networks/tokens?**  
  The addition of new networks and tokens to the Sygma protocol is currently a permissioned process that must go through the Sygma team. Engineering is already well underway to enable permissionless additions of networks and tokens by the end of 2023. For further inquiries, please contact Sygma on [Discord](https://discord.gg/Qdf6GyNB5J) or fill out [this form](https://share.hsforms.com/1K4-T_yaKSp6F06FGk4wsSgnmy2x).

7. **Can you build an integration for my project?**  
  It depends. Please take a look at the documentation for [Adding A New Token](04-ecosystem/01-new-token.md) and [Adding A New Network](04-ecosystem/02-new-network.md). When you are ready, please contact Sygma on [Discord](https://discord.gg/Qdf6GyNB5J) or fill out [this form](https://share.hsforms.com/1K4-T_yaKSp6F06FGk4wsSgnmy2x).

<!-- 9. Is it expensive to bridge with Sygma?
WIP-->

### Protocol
8. **Is the Sygma protocol decentralized?**  
  In its current state, the Sygma protocol operates under a trusted federation bridging model using a set of off-chain relayers. Research and engineering is already well underway to enable a decentralized and trustless Sygma bridging protocol, which includes governance of the respective governance controls. 

9. **Who are the relayers and what do they do?**  
  The Sygma protocol relies on a network of trusted off-chain operators that listen for events on a source chain, and "relay" these events to a destination chain through a cryptographic primitive called [secure multi-party computation](https://blog.buildwithsygma.com/multi-party-computation/). You can find a list of Sygma's relaying partners in [Becoming A Relayer Partner](04-ecosystem/03-relayer-partner.md).

10. **Can I become a relayer for Sygma?**
  Sygma is currently looking for credible entities that can meet the acceptance criteria for becoming a relayer. Please see [Becoming A Relayer Partner](04-ecosystem/03-relayer-partner.md) for more information. 

<!--9. How are relayers selected? 
WIP-->

11.  **What happens when a relayer entity drops off?**
  This would be handled by Sygma's "key reshare" sub-protocol. The "Key Reshare" mechanism allows parties from the old set to rotate key shares with new participants without changing the underlying public/private key. This is useful for onboarding new members into the signing committee, recalibrating threshold requirements, and more importantly preventing hackers from corrupting parties one after another, potentially in the course of many sessions (known as proactive adversaries).

12.  **What are the mechanisms for token bridging? Are bridged tokens wrapped or synthetic assets?**  
  Depending on the integration of the specific token route, bridged tokens will follow either a lock/release (1:1 backed, wrapped asset) mechanism or a burn/mint (synthetic asset) mechanism.

13.   **How is Sygma currently secured?**  
  The Sygma protocol currently uses secure multi-party computation (MPC) and threshold signature schemes (TSS) to strengthen security and communication within the relayer network. Furthermore, there is ongoing efforts underway to implement optimistic, trust-minimized cross-chain block header oracles (see [Introducing Zipline Casper](https://blog.chainsafe.io/introducing-zipline-casper-6fb6dce44992)), as well as a ZK-based block header oracle to provide tailored security for different bridging use-cases.

### Widget

14. **Why do I need two token approvals to confirm a transaction?**

When initiating a cross-chain transaction using the Sygma widget on EVM-compatible chains, you will encounter two separate prompts for token approvals, followed by a final confirmation request for the transfer. The reason for the two approvals is due to how the Sygma protocol orchestrates fee management and bridging operations across different sets of smart contracts. A deeper look into the two approvals:

  1. **Fee Approval**: The first approval is directed towards a set of smart contracts that manages fee calculations. This approval grants the fee handling contracts permission to spend up to the necessary amount of fee tokens, which represents the service charge for executing the cross-chain operation. The user does not have to specify the fee amount as the interface will automatically calculate this. The user only needs to approve the specified amount.
  2. **Bridging Transaction Approval**: The second approval is directed towards the bridging smart contract, which oversees the cross-chain transfer of tokens. This approval grants this contract permission to spend (and transfer) up to the specified amount of the given token, less previously calculated fees. Similar to the fee approval, the interface will automatically calculate the amount that needs to be approved for the net token amount to be transferred. The user only needs to approve the specified amount.

Following the two approvals, the user will need to finalize the cross-chain transaction by clicking on “Transfer” within the Sygma widget interface.

This two-step approval process ensures 1) appropriate fees are calculated and 2) on the correct amount of tokens to be transferred during a cross-chain execution. You can read more about token approvals and their role in web3 here and here. As token allowances may represent a potential attack vector for improperly secured smart contracts, it is recommended to periodically practice good token hygiene by revoking permissions.


<!--### Substrate 
Does Sygma require an EVM pallet to work?-->
