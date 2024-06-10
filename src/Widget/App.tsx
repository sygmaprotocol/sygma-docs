import { Environment } from '@buildwithsygma/sygma-sdk-core';
import { SygmaProtocolReactWidget } from '@buildwithsygma/sygmaprotocol-react-widget/build/WidgetReact';
import React from 'react';
import { Container } from '@mui/material';

function App(){
  return (
    <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <SygmaProtocolReactWidget
        environment={Environment.TESTNET}
      />
    </Container>
  )
}

export default App; 