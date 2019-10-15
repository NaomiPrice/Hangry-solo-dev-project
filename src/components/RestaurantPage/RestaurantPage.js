import React, {Component} from 'react';
import {connect} from 'react-redux';



class RestaurantPage extends Component {

    addNote = ()=>{
        this.props.history.push(`/createNote/`)
    }
    navHome = ()=>{
        this.props.history.push('/home')
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    render(){
      return (
        <div>
          <button onClick={this.navBack}>BACK</button>  
          <button onClick={this.deleteRestaurant}>DELETE RESTAURANT</button>
          <button onClick={this.navHome}>HOME</button>
          <h1>Restaurant Name Here</h1>
          <h2>collection Name Here</h2>
          <div>Info coming in from Google</div>
          <div>Notes list here</div>
          <button onClick={this.addNote}>ADD NOTE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(RestaurantPage);