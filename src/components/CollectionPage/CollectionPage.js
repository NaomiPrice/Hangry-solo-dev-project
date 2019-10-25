import React, {Component} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import './CollectionPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';



class CollectionPage extends Component {
  state = {
    collectionName: 'loading'
  }
  getCollectionName = ()=>{
    let collection = this.props.reduxState.collections
    //loop through each collection in user's list - if collection id matches
    //the id of the collection that was clicked on when the user got to the page (passed through url params)
    //that collection name will be set to local state. 
    collection.forEach((item)=>{
      if (item.id === Number(this.props.match.params.id)){
        this.setState({
          collectionName: item.name
        })
      }
    }) 
  }
  componentDidMount = ()=>{
    //get all collections for current user
    this.props.dispatch({type: 'GET_COLLECTIONS'});
    //get all restaurants that are a part of current collection as determined by param passed by url
    this.props.dispatch({type: 'GET_RESTAURANTS', payload: this.props.match.params.id});
  }

  componentDidUpdate = (prevProps)=>{
    //when Redux state has loaded with data, get the collection name and set to local state
    if (this.props.reduxState.collections !== prevProps.reduxState.collections){
      this.getCollectionName();
    }
  }
  navHome = ()=>{
    this.props.history.push('/home')
  }

  goToRestaurant=(id)=>{
    this.props.history.push(`/restaurant/${id}`)
  }

  decideFood = ()=>{
    //get the length of the restaurant array in the current collection
    let arrayLength = this.props.reduxState.restaurants.length;
    //select a random number between 0 and one less than the length of the array
    let randomNumber = Math.floor(Math.random() * arrayLength);
    //grab the name of the restaurant from the array based on the random number
    let restaurantChoice = this.props.reduxState.restaurants[randomNumber].name;
    //display the random selection to the user
    swal("You should eat at:", restaurantChoice);
  }

  render(){
    //map through list of restaurants to display to DOM
    const restaurants = this.props.reduxState.restaurants.map((restaurant)=>{
      return <div key={restaurant.id} 
                  className="restaurantList"
                  onClick={()=>this.goToRestaurant(restaurant.id)}>{restaurant.name}</div>
    })
    return (
      <div>
        <div className="navDiv">
          <button className="navBtn"onClick={this.navHome}><FontAwesomeIcon icon={faHome}/> HOME</button>
        </div>
        
        <div className="pageDiv">
          <h1 className="headline">{this.state.collectionName}</h1>
          <div className="displayRestaurants">
            {restaurants}
          </div>
          <button className="commit" onClick={this.decideFood}>TELL ME WHERE TO EAT</button>
        </div>
      
      </div>
    );
  }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CollectionPage);
