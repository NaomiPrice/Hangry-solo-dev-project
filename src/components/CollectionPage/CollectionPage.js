import React, {Component} from 'react';
import {connect} from 'react-redux';



class CollectionPage extends Component {
  state = {
    collectionName: 'not yet'
  }
  getCollectionName = ()=>{
    let collection = this.props.reduxState.collections
    collection.forEach((item)=>{
      if (item.id === Number(this.props.match.params.id)){
        this.setState({
          collectionName: item.name
        })
      }
    }) 
  }
  componentDidMount = ()=>{
    this.props.dispatch({type: 'GET_COLLECTIONS'});
    this.props.dispatch({type: 'GET_RESTAURANTS', payload: this.props.match.params.id});
  }

  componentDidUpdate = (prevProps)=>{
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
    render(){
      const restaurants = this.props.reduxState.restaurants.map((restaurant)=>{
        return <div key={restaurant.id} 
                    className="restaurantList"
                    onClick={()=>this.goToRestaurant(restaurant.id)}>{restaurant.name}</div>
      })
      return (
        <div>
          <button onClick={this.navHome}>HOME</button>
          <h1>{this.state.collectionName}</h1>
          <div>
            {restaurants}
          </div>
          <button>TELL ME WHERE TO EAT</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CollectionPage);
