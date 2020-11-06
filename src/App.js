import React from 'react';
import './App.css';
import * as fcl from '@onflow/fcl'
import DappExample from './DappExample'

window.fcl = fcl
fcl.config().put("challenge.handshake", "http://localhost:8701/flow/authenticate")
function App() {
  return (
    <div className="App">
      <DappExample/>
    </div>
  );
}

export default App;
 