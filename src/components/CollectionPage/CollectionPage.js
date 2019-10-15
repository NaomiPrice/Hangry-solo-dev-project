import React, {Component} from 'react';
import {connect} from 'react-redux';



class CollectionPage extends Component {

  navHome = ()=>{
    this.props.history.push('/home')
  }
    render(){
      return (
        <div>
          <button onClick={this.navHome}>HOME</button>
          <h1>Collection Name Here</h1>
          <p>
            list of restaurants here
          </p>
          <button>TELL ME WHERE TO EAT</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CollectionPage);
