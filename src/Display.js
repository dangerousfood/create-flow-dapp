import React from 'react';
import * as fcl from '@onflow/fcl';
import User from './User'



class Display extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }

    componentDidMount() {
    }

    render() {
      return (
          <React.Fragment>
            <User/>
            <User/>
            <User/>
          </React.Fragment>
      );

    }
  }
export default Display;

 