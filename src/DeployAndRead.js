import React from 'react';
import * as fcl from '@onflow/fcl';
import hello from './contracts/build/HelloWorld.js'
import script from './contracts/build/Script.js'
import { template as setCode } from "@onflow/six-set-code"



class DeployAndRead extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
      this.sendTransaction = this.sendTransaction.bind(this)
      this.sendContract = this.sendContract.bind(this)
      this.sendScript = this.sendScript.bind(this)
      this.authenticate = this.authenticate.bind(this)
    }

    componentDidMount() {
    }

    authenticate(){
      fcl.config().put("challenge.handshake", "http://localhost:8701/flow/authenticate").then(console.log)
    }

    sendScript(){
      deployAndReadScript(script)
    }

    sendContract() {
      deployAndReadContract(hello).then((resolve, reject) => {
            this.setState({response: resolve, address: resolve.events[0].data.address});
        })
    }

    sendTransaction() {
      let code = `import HelloWorld from ` + this.state.address + `

      transaction {
      
        prepare(acct: AuthAccount) {}
      
        execute {
          log(HelloWorld.hello())
        }
      }`
      sendTransactionToContract(code).then(console.log)
    }

    render() {
     return (
        <React.Fragment>
          <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
          <button onClick={this.authenticate}>authenticate</button>
          <button onClick={this.sendScript}>send script</button>
          <button onClick={this.sendContract}>send contract</button>
          <button onClick={this.sendTransaction}>send transaction</button>
        </React.Fragment>
     );
    }
  }
export default DeployAndRead;

const deployAndReadScript = async (code) => {
        const response = await fcl.send([
                fcl.script(code)
            ]);
        console.log("RESPONSE: ",response);
        const decode = await fcl.decode(response);
        console.log("DECODE: ", decode);
        return decode;
    };
 
const deployAndReadContract = async (code) => {
    
    const response = await fcl.send([
        setCode({
            proposer: fcl.currentUser().authorization,
            authorization: fcl.currentUser().authorization,     
            payer: fcl.currentUser().authorization,             
            code: code,
        })
    ])
  
  try {
    
    return await fcl.tx(response).onceExecuted()
  } catch (error) {
    return error;
  }
}

const sendTransactionToContract = async (code) => {
    
  const response = await fcl.send([
      setCode({
          proposer: fcl.currentUser().authorization,
          authorization: fcl.currentUser().authorization,     
          payer: fcl.currentUser().authorization,             
          code: code,
      })
  ])

  try {
    
    return await fcl.tx(response).onceExecuted()
  } catch (error) {
    return error;
  }
}
 