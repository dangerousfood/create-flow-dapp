import React from 'react';
import * as fcl from '@onflow/fcl';
import script from './contracts/build/Script.js'



class DeployAndRead extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }

    componentDidMount() {
        this.updateResponse();
    }

    updateResponse() {
        deployAndReadContract().then((resolve, reject) => {
            this.setState({response: resolve});
        })
    }

    render() {
      return <h2>{this.state.response != null ? this.state.response[0].x : null}</h2>;
    }
  }
export default DeployAndRead;

const deployAndReadContract = async () => {
        const response = await fcl.send([
                fcl.script(script)
            ]);
        console.log("RESPONSE: ",response);
        const decode = await fcl.decode(response);
        console.log("DECODE: ", decode);
        return decode;
    };
 