import React from 'react';
import * as fcl from '@onflow/fcl';
import hello from './contracts/build/HelloWorld.js'
import script from './contracts/build/Script.js'
import { template as setCode } from "@onflow/six-set-code"

class DeployAndRead extends React.Component {
    constructor() {
      super();
      this.state = {}
      this.sendTransaction = this.sendTransaction.bind(this)
      this.sendContract = this.sendContract.bind(this)
      this.sendScript = this.sendScript.bind(this)
      this.authenticate = this.authenticate.bind(this)
      this.unauthenticate = this.unauthenticate.bind(this)
    }

    componentDidMount() {
      this.unauthenticate()
    }

    authenticate(){
      fcl.authenticate().then((response) => {
        this.setState({account: response.addr});
      })
    }
    
    unauthenticate(){
      this.setState({account: undefined})
      fcl.unauthenticate()
    }

    sendScript(){
      deployAndReadScript(script)
    }

    sendContract() {
      sendTransaction(hello).then((resolve, reject) => {
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
      sendTransaction(code).then(console.log)
    }

    render() {
     return (
        <React.Fragment>
          <button onClick={this.authenticate} disabled={this.state.account !== undefined}>authenticate</button>
          <button onClick={this.unauthenticate} disabled={this.state.account === undefined}>unauthenticate</button>
          <button onClick={this.sendScript}>send script</button>
          <button onClick={this.sendContract} disabled={this.state.account === undefined}>send contract</button>
          <button onClick={this.sendTransaction} disabled={this.state.address === undefined || this.state.account === undefined}>send transaction</button>
          <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
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
 
const sendTransaction = async (code) => {
    
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
 