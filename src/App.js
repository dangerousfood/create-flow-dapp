import React from 'react';
import './App.css';
import * as fcl from '@onflow/fcl'
import DeployAndRead from './DeployAndRead'

window.fcl = fcl
fcl.config().put("challenge.handshake", "http://localhost:8701/flow/authenticate")
function App() {
  return (
    <div className="App">
      <DeployAndRead/>
    </div>
  );
}

export default App;
 