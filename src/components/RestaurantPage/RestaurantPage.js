import React, {Component} from 'react';
import {connect} from 'react-redux';
import GooglePlacesInfo from '../GooglePlacesInfo/GooglePlacesInfo';
import swal from 'sweetalert';



class RestaurantPage extends Component {

  state = {
    canEdit: false,
    collectionId: null,
    collectionName: null,
    restaurantId: this.props.match.params.id,
  }

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
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this restaurant and notes!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let collectionId = this.props.reduxState.singleRestaurant.collection_id;
          //fire off dispatch to delete restaurant from DB
          this.props.dispatch({type: 'DELETE_RESTAURANT', payload: id});
          swal("Poof! Your restaurant has been deleted!", {
            icon: "success",
          });
          this.goToCollection(collectionId);
        } else {
          swal("Your restaurant is safe!");
        }
      });
      // let collectionId = this.props.reduxState.singleRestaurant.collection_id;
      
      // //fire off dispatch to delete restaurant from DB
      // this.props.dispatch({type: 'DELETE_RESTAURANT', payload: id});
      // this.goToCollection(collectionId);
    }
    componentDidMount = ()=>{
      this.props.dispatch({type: 'GET_COLLECTIONS'});
      this.props.dispatch({type: 'GET_SINGLE_RESTAURANT', payload: this.props.match.params.id});
      this.props.dispatch({type: 'GET_NOTES', payload: this.props.match.params.id});
    }

    componentDidUpdate = (prevProps)=>{
      if (this.props.reduxState.singleRestaurant !== prevProps.reduxState.singleRestaurant){
        const restaurant = this.props.reduxState.singleRestaurant;
        //set local state based on Redux state
        this.setState({
          collectionId: restaurant.collection_id,
          collectionName: restaurant.collection,
        })
      }
    }

    editCollection = ()=>{
      this.setState({
        canEdit: true,
      })
    }

    saveCollection = (event)=>{
      console.log(event.target.value);
      this.setState({
        canEdit: false,
        collectionId: event.target.value,
      }, ()=>{
        this.props.dispatch({type: 'UPDATE_COLLECTION', payload: this.state})
      });
      
    }

    editNote = (id)=>{
      this.props.history.push(`/editNote/${id}`);
    }
    
    render(){
      if(this.props.reduxState.singleRestaurant.loading){
        return <div>LOADING...</div>
      }
      const options = this.props.reduxState.collections.map((collection)=>{
        return <option value={collection.id}
                        key={collection.id}> {collection.name}</option>
      })
      const notes = this.props.reduxState.notes.map((note)=>{
        return <div key={note.id} 
                    className="note"
                    onClick={()=>this.editNote(note.id)}>{note.notes_field}</div>
      })
      const restaurant = this.props.reduxState.singleRestaurant;
      return (
        <div>
          <button onClick={()=>{this.goToCollection(restaurant.collection_id)}}>COLLECTION LIST</button>  
          <button onClick={()=>{this.deleteRestaurant(restaurant.id)}}>DELETE RESTAURANT</button>
          <button onClick={this.navHome}>HOME</button>
      
          <h1>{restaurant.name}</h1>
          {this.state.canEdit ?
            <div>
              <select value={this.state.collectionId} onChange={(event)=>{this.saveCollection(event)}}>
                {options}
              </select>
            </div> :
            <div onClick={this.editCollection}>{this.state.collectionName}</div>
          }
          
          <GooglePlacesInfo/>
          <div>Notes:
          {notes}</div>
          <button onClick={()=>{this.addNote(restaurant.id)}}>ADD NOTE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(RestaurantPage);