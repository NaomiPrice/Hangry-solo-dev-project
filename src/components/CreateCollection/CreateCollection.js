import React, {Component} from 'react';
import {connect} from 'react-redux';



class CreateCollection extends Component {
    state = {
        newCollection: ''
    }
    
    saveCollection = ()=>{
        console.log('save button clicked')
        // post collection to DB
        this.navBack();
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    render(){
      return (
        <div>
          <button onClick={this.navBack}>BACK</button>  
          <h1>Add a new collection</h1>
          <input placeholder="New Collection" value={this.state.newCollection}></input>
          <button onClick={this.saveCollection}>SAVE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateCollection);