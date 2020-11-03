import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as fcl from '@onflow/fcl'
import DeployAndRead from './DeployAndRead'
import Display from './Display';

fcl.config().put("challenge.handshake", "http://localhost:8701/flow/authenticate")
function App() {
  return (
    <div className="App">
      <DeployAndRead/>
      {/* <Display/> */}
    </div>
  );
}

export default App;
 