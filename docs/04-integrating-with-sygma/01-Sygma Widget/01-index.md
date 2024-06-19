---
id: sygma-widget-index
slug: /sygma-widget
title: Introduction To The Sygma Widget
description: The following section provides details on the Sygma Widget.
sidebar_position: 1
---

The Sygma protocol provides an open source, customizable frontend UI, the **Sygma Widget**, to make integration of the Sygma interoperability protocol easier.

The source code can be found in the [sygma-widget repo](https://github.com/sygmaprotocol/sygma-widget).

The repository is organized into two packages and one example:
- The [Widget](https://github.com/sygmaprotocol/sygma-widget/tree/main/packages/widget) package is a web component built using the Lit framework.
- The [React](https://github.com/sygmaprotocol/sygma-widget/tree/main/packages/react) package is a wrapper around the Lit widget that allows developers to use this application inside React projects. 
- The [examples/react-widget-app] package is an example of a stylized React widget.

## Quick Setup

1. Create a Vite template project called `my-dapp`:
   
```bash
yarn create vite my-dapp --template react-ts
cd ./my-dapp
touch yarn.lock
```

2. Install dependencies: 

```bash
yarn install
yarn add @buildwithsygma/sygmaprotocol-react-widget @buildwithsygma/sygma-sdk-core
``` 

3. Boot up the local server: 

```bash
yarn dev
```

## How To Integrate

Follow the [Lit](02-lit.md) or [React](03-react.md) documentation for framework-specific instructions.

## Widget Properties

The behaviour of the Sygma Widget can be customized using configurable properties (props). A complete reference of the properties can be found under [packages/widget/src/widget.ts](https://github.com/sygmaprotocol/sygma-widget/blob/main/packages/widget/src/widget.ts)/.

The currently available properties are:
- environment
  - Desc: Determines whether the widget operates on the live network (mainnet) or a testing environment (testnet). 
  - Usage: environment={Environment.MAINNET}
- whitelistedSourceNetworks
  - Desc: Specifies which blockchain networks can be selected as the source for transactions.
  - Usage: whitelistedSourceNetworks={["sepolia"]}
- whitelistedDestinationNetworks
  - Desc: Specifies which blockchain networks can be selected as the destination for transactions.
  - Usage: whitelistedDestinationNetworks={["cronos"]}
- whitelistedSourceResources
  - Desc: Defines which assets or resources (e.g., tokens) can be selected for transaction.
  - Usage: whitelistedSourceResources={["resourceID1", "resourceID2"]}
- walletModules
  - Desc: Specifies the wallet integrations available for users to connect their cryptocurrency wallets.
  - Usage:
    ```
    const walletModules = [
      {
         walletName: "metamask",
         preferred: true,
      },
      {
         walletName: "walletConnect",
         rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      },
      ];
    <SygmaProtocolReactWidget walletModules={walletModules} />
    ```
- substrateProviders
  - Desc: Specifies the API endpoints or connection details for Substrate-based blockchain networks.
  - Usage:
    ```
    import { ApiPromise, WsProvider } from '@polkadot/api';
    const substrateProviders = [
    new ApiPromise({ provider: new WsProvider("wss://rpc.polkadot.io") }),
    new ApiPromise({ provider: new WsProvider("wss://kusama-rpc.polkadot.io") }),
    ];
    <SygmaProtocolReactWidget substrateProviders={substrateProviders} />
    ```

## Using Props In An Example

Below you will find an example of props being passed to whitelist (i.e enable) the source and destination networks in the React component: 

```ts
// App.tsx
import { SygmaProtocolReactWidget } from "@buildwithsygma/sygmaprotocol-react-widget";

function MyDapp() {
  const [count, setCount] = useState(0);

  return (
    <SygmaProtocolReactWidget
      whitelistedSourceNetworks={["sepolia"]}
      whitelistedDestinationNetworks={["cronos"]}
    />
  );
}
```
