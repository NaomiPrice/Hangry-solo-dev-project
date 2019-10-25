import React, {Component} from 'react';
import {connect} from 'react-redux';
import GooglePlacesInfo from '../GooglePlacesInfo/GooglePlacesInfo';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPencilAlt, faTrashAlt, faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import './RestaurantPage.css';



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
      //before deleting restaurant, verify user actions
      Swal.fire({
        title: 'Are you sure?',
        text: "Once deleted, you will not be able to recover this restaurant and notes!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#005645',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          let collectionId = this.props.reduxState.singleRestaurant.collection_id;
          //delete confirmed - delete from DataBase
          this.props.dispatch({type: 'DELETE_RESTAURANT', payload: id});
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success',
            confirmButtonColor: '#005645',
          })
           //navagate user back to collection
           this.goToCollection(collectionId);
        }
      });
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
      //once new collection has been selected set canEdit state back to false
      this.setState({
        canEdit: false,
        collectionId: event.target.value,
      }, ()=>{
        //once state is set then dispatch Sata to update collection in DataBase
        this.props.dispatch({type: 'UPDATE_COLLECTION', payload: this.state})
      });
    }

    editNote = (id)=>{
      this.props.history.push(`/editNote/${id}`);
    }
    
    render(){
      //if redux state does not yet have the data the page will return with 'LOADING...'
      if(this.props.reduxState.singleRestaurant.loading){
        return <div>LOADING...</div>
      }
      //populate options based on collection list from Redux
      const options = this.props.reduxState.collections.map((collection)=>{
        return <option value={collection.id}
                        key={collection.id}> {collection.name}</option>
      })
      //display each note connected to current restaruant 
      const notes = this.props.reduxState.notes.map((note)=>{
        return <div key={note.id} 
                    className="note"
                    onClick={()=>this.editNote(note.id)}>{note.notes_field}
                    <div className="edit"><FontAwesomeIcon icon={faPencilAlt}/></div>
                </div>
      })
      const restaurant = this.props.reduxState.singleRestaurant;

      return (
        <div>
          <div className="navDiv">
            <button className="navBtn" onClick={()=>{this.goToCollection(restaurant.collection_id)}}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft}/> LIST</button>  
            <button className="navBtn" onClick={()=>{this.deleteRestaurant(restaurant.id)}}><FontAwesomeIcon icon={faTrashAlt}/> DELETE</button>
            <button className="navBtn" onClick={this.navHome}><FontAwesomeIcon icon={faHome}/> HOME</button>
          </div>
          
          <div className="pageDiv">
            <h1 className="headline" >{restaurant.name}</h1>
            {/* render collection name or select options to change collection */}
            {this.state.canEdit ?
              <div>
                <select value={this.state.collectionId} onChange={(event)=>{this.saveCollection(event)}}>
                  {options}
                </select>
              </div> :
              <div className="displayCollectionName" onClick={this.editCollection}>{this.state.collectionName} <FontAwesomeIcon icon={faPencilAlt}/></div>
            }
            <GooglePlacesInfo/>
            <div className="noteName">
              <p>Notes:</p>
            {notes}</div>
            <button className="commit" onClick={()=>{this.addNote(restaurant.id)}}><FontAwesomeIcon icon={faPlusCircle}/> ADD NOTE</button>
          </div>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(RestaurantPage);