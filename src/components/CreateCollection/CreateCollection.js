import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import './CreateCollection.css';


class CreateCollection extends Component {
    state = {
        newCollection: ''
    }

    handleChange = (event)=>{
      //set state to what user types in input
      this.setState({
        newCollection: event.target.value
      })
    }

    saveCollection = ()=>{
      if(this.state.newCollection ===''){
        return Swal.fire({
          text: "Plese enter a collection name or select 'back' to cancel",
          confirmButtonColor: '#005645'});
      }
      //when save button is clicked. send new collection to post in DB
      this.props.dispatch({type: 'ADD_COLLECTION', payload: this.state})
      //navagate user back to previous page(could be home page or create restaurant page)
      this.navBack();
    }

    navBack = ()=>{
        this.props.history.goBack();
    }

    autoFill = ()=>{
      this.setState({
        newCollection: 'Brunch With Kids'
      })
    }

    render(){
      return (
        <div>
          <div className="navDiv">
            <button className="navBtn"onClick={this.navBack}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft}/> BACK</button>  
          </div>
           
          <div className="pageDiv">
            <h1>Add a new collection</h1>
            <label className="newCollection" onClick={this.autoFill}> 
              <br></br>
              <input placeholder="new collection..." 
                    value={this.state.newCollection} 
                    onChange={this.handleChange}></input>
            </label>
            
            <br></br>
            <button className="commit"onClick={this.saveCollection}>SAVE</button>
          </div>
          
        </div>
      );
    }
} 


export default connect()(CreateCollection);