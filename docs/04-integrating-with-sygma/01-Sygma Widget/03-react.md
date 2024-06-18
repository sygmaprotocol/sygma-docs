---
id: sygma-widget-react
slug: /sygma-widget/react
title: React Framework
description: The following section provides details on the Sygma React Widget.
sidebar_position: 3
---

## Dependencies

Add the following dependencies to integrate the widget into any React project: 

```bash
yarn add @polkadot/extension-inject
```

And similarly:

```bash
yarn add @buildwithsygma/sygmaprotocol-react-widget @buildwithsygma/sygma-sdk-core
```

### Integrating The Widget Into Your React Code

After installation, add the widget into your code using:

```ts
import React from "react";
import { SygmaProtocolReactWidget } from '@buildwithsygma/sygmaprotocol-react-widget';

function MyDapp(){
  return (
    <SygmaProtocolReactWidget />
  );
}
```

You can also pass props to the widget component to customize widget behaviour:

```ts
function MyDapp(){
  return (
    <SygmaProtocolReactWidget
      environment={Environment.MAINNET}
      whitelistedSourceNetworks={["sepolia"]}
      whitelistedDestinationNetworks={["cronos"]}
      evmProvider={myEip1193Provider}
    />;
  )
}
```

See [widget.ts](https://github.com/sygmaprotocol/sygma-widget/blob/main/packages/widget/src/widget.ts) for all of the available properties.
