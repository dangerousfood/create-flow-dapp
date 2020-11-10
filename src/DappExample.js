import React from 'react';
import * as fcl from '@onflow/fcl';
import hello from './contracts/build/HelloWorld.js'
import script from './contracts/build/Script.js'
import { template as setCode } from "@onflow/six-set-code"
import './DappExample.css'

class DappExample extends React.Component {
    constructor() {
      super();
      this.state = {}
      this.sendTransaction = this.sendTransaction.bind(this)
      this.deployContract = this.deployContract.bind(this)
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
      this.setState({
        script: undefined
      });
      sendScript(script).then((resolve, reject) => {
        this.setState({
          script: resolve
        });
    })
    }

    deployContract() {
      this.setState({
        contract: undefined,
        address: undefined
      });
      deployContract(hello).then((resolve, reject) => {
            this.setState({
              contract: resolve,
              address: resolve.events[0].data.address
            });
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
      this.setState({
        transaction: undefined
      });
      sendTransaction(code).then((resolve, reject) => {
        this.setState({
          transaction: resolve
        });
      })
    }

    render() {
     return (
        <React.Fragment>

          <button onClick={this.authenticate} disabled={this.state.account !== undefined}>
            authenticate
          </button>

          <button onClick={this.unauthenticate} disabled={this.state.account === undefined}>
            unauthenticate
          </button>

          <pre className="textBox">
            {JSON.stringify(this.state.script, null, 2)}
          </pre>

          <button onClick={this.sendScript}>
            send script
          </button>


          <pre className="textBox">
            {JSON.stringify(this.state.contract, null, 2)}
          </pre>

          <button onClick={this.deployContract} disabled={this.state.account === undefined}>
            deploy contract
          </button>

          <pre className="textBox">
            {JSON.stringify(this.state.transaction, null, 2)}
          </pre>

          <button onClick={this.sendTransaction} disabled={this.state.address === undefined || this.state.account === undefined}>
            send transaction
          </button>

        </React.Fragment>
     );
    }
  }
export default DappExample;

const sendScript = async (code) => {
        const response = await fcl.send([
                fcl.script(code)
            ]);
        return await fcl.decode(response);
    };
 
const deployContract = async (code) => {
    
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

const sendTransaction = async (code) => {
  const authz = fcl.currentUser().authorization
  const response = await fcl.send([
    fcl.transaction(code),
    fcl.proposer(authz),
    fcl.payer(authz),
    fcl.authorizations([
      authz,
    ]),
  ])

  try {
    return await fcl.tx(response).onceExecuted()
  } catch (error) {
    return error;
  }
}
 