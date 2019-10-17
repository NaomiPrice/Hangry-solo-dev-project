import React, {Component} from 'react';
import {connect} from 'react-redux';



class RestaurantPage extends Component {

    addNote = (id)=>{
        this.props.history.push(`/addNote/${id}`)
    }
    navHome = ()=>{
        this.props.history.push('/home')
    }
    goToCollection = (id)=>{
        this.props.history.push(`/collection/${id}`);
    }
    deleteRestaurant = (id)=>{
      //confirmation modal before deleting restaurant if yes...
      //fire off dispatch to delete restaurant from DB
     console.log('delete button clicked!')
    }
    componentDidMount = ()=>{
      this.props.dispatch({type: 'GET_COLLECTIONS'});
      this.props.dispatch({type: 'GET_SINGLE_RESTAURANT', payload: this.props.match.params.id});
      this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
    }

    componentDidUpdate = (prevProps)=>{
      if (this.props.reduxState.singleRestaurant !== prevProps.reduxState.singleRestaurant){
        console.log('component updated!');
      }
    }
    render(){
      const notes = this.props.reduxState.notes.map((note)=>{
        return <div key={note.id} 
                    className="note"
                    onClick={()=>this.editNote(note.id)}>{note.notes_field}</div>
      })
      const restaurant = this.props.reduxState.singleRestaurant;
      return (
        <div>
          <button onClick={()=>{this.goToCollection(restaurant.collection_id)}}>COLLECTION LIST</button>  
          <button onClick={this.deleteRestaurant}>DELETE RESTAURANT</button>
          <button onClick={this.navHome}>HOME</button>
      
          <h1>{restaurant.name}</h1>
          <h2>{restaurant.collection}</h2>
          <div>Info coming in from Google</div>
          <div>{notes}</div>
          <button onClick={()=>{this.addNote(restaurant.id)}}>ADD NOTE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(RestaurantPage);