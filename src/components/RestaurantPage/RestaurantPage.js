import React, {Component} from 'react';
import {connect} from 'react-redux';



class RestaurantPage extends Component {

    addNote = ()=>{
        this.props.history.push(`/addNote/2`)
    }
    navHome = ()=>{
        this.props.history.push('/home')
    }
    goToCollection = ()=>{
        this.props.history.push('/collection/2');
    }
    deleteRestaurant = ()=>{
      //confirmation modal before deleting restaurant if yes...
      //fire off dispatch to delete restaurant from DB
     console.log('delete button clicked!')
    }
    componentDidMount = ()=>{
      this.props.dispatch({type: 'GET_COLLECTIONS'});
      this.props.dispatch({type: 'GET_SINGLE_RESTAURANT', payload: this.props.match.params.id});
    }
    render(){
      return (
        <div>
          <button onClick={this.goToCollection}>COLLECTION LIST</button>  
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