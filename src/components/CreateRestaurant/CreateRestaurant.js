import React, {Component} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './CreateRestaurant.css'



class CreateRestaurant extends Component {
    state = {
        name: '',
        collectionId: '',
        newNote: '',
        placesId: '',
    }
    
    componentDidMount = ()=>{
      this.props.dispatch({type: 'GET_COLLECTIONS'});
      this.handleScriptLoad();
    }

    handleScriptLoad = ()=>{
      //define google as the global google brought in when script loads and google API is hit
      const google = window.google;
      //set search options as defined by google
      let options = {
          types: ['establishment'],
          fields: ['place_id', 'name', 'types', 'price_level', 'formatted_address', 'geometry']
      }
      // Get the HTML input element on which the autocomplete search box attaches
      let input = document.getElementById('google-input');
      //create the autocomplete object - Google's magic
      this.autocomplete = new google.maps.places.Autocomplete(input, options);
      //attach a listener to fire off a new function when place changes(user selects place)
      this.autocomplete.addListener('place_changed', this.placeChangeHandler);
  }

  placeChangeHandler = ()=>{
    //get data on the place google search identified
    let thePlace = this.autocomplete.getPlace();
    console.log(thePlace);

    this.setState({
        name: thePlace.name,
        placesId: thePlace.place_id,
    })
}

    saveRestaurant = ()=>{
      let name = this.state.name;
      let note = this.state.note;
      let collection = this.state.collectionId;
      if(name === '' || note === '' || collection === ''){
        return alert('please fill out all fields')
      };
        console.log('save button clicked')
        this.props.dispatch({type: 'ADD_RESTAURANT', payload: this.state})
        swal("Thank You!", "Your restaurant has been saved!", "success");
        this.navBack();
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    addCollection = ()=>{
      this.props.history.push('/addCollection')
    }

    handleChange = (propertyName, event)=>{
      this.setState({
        [propertyName]: event.target.value
      })
    }

    render(){
      const options = this.props.reduxState.collections.map((collection)=>{
        return <option value={collection.id}
                        key={collection.id}> {collection.name}</option>
      })

      return (
        <div>
          <div className="navDiv">
            <button  className="navBtn" onClick={this.navBack}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft}/> BACK</button>
          </div>
          <div className="pageDiv">
            <h1 className="addRestText">Add a restaurant to your list...</h1>

            <label>Restaurant Name:
                <br></br>
                <input id="google-input" className="controls" type="text" size="50" placeholder="resturant name..."></input>
            </label>
            <div className="collectionSelect">
              <select value={this.state.collectionId} onChange={(event)=>{this.handleChange('collectionId', event)}}>
                <option value="">--Select a Collection--</option>
                {options}
              </select>

              <button onClick={this.addCollection}><FontAwesomeIcon icon={faPlusCircle}/> ADD NEW COLLECTION</button>
            </div>
            
            <br></br>

            <label>Leave a Note: 
              <br></br>
              <textarea className="description" rows="6" type="text" value={this.state.note} 
                  onChange={(event)=>{this.handleChange('newNote', event)}}></textarea>
            </label>
           
            <button className="log-in"onClick={this.saveRestaurant}>SAVE</button>
          </div>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateRestaurant);