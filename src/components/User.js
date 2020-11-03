import React from 'react';
import * as fcl from '@onflow/fcl';
import './User.css';
import Candy from './Candy'
import Draggable from 'react-draggable';




class User extends React.Component {
    constructor() {
      super();
      this.state = {candies: ['yik', 'do', 'se'], name: "harold"};
    }

    componentDidMount() {
    }

    transferOwnership() {

    }

    render() {
      const listItems = this.state.candies.map((item) =>
        <Draggable><Candy color={item.color} shape={item.shape} flavor={item.flavor}/></Draggable>
      );
      return (
          
          <React.Fragment>
            <div className="card">
                <div> {this.state.name}</div>
                {listItems}
            </div>
            
          </React.Fragment>
      );

    }
  }
export default User;