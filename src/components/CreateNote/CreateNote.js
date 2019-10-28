import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';



class CreateNote extends Component {
    state = {
        newNote: '',
        restaurantId: this.props.match.params.id
    }
    
    saveNote = ()=>{
      //if new note has not been created, return message for user
      if(this.state.newNote ===''){
        return Swal.fire({
          text: "Plese enter a note or cancel",
          confirmButtonColor: '#005645'});
      }
      //if note has been created, dispatch Saga to send to DataBase
      this.props.dispatch({type: 'ADD_NOTE', payload: this.state});
      //send user back to previous restaurant page
      this.navBack();
    }

    navBack = ()=>{
      this.props.history.goBack();
    }

    handleChange = (event)=>{
      //sets local newNote state to user's input
      this.setState({
        newNote: event.target.value
      })
    }
    autoFill = ()=>{
      this.setState({
        newNote: 'Good eggs benedict and the kids pancake is the size of a plate!'
      })
    }

    render(){
      return (
        <div>
          <div className="navDiv">
            <button className="navBtn" onClick={this.navBack}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft}/> CANCEL</button>  
          </div> 
          <div className="pageDiv">
            <h1>Add a Note</h1>
            <label onClick={this.autoFill}> Note:
                <br></br>
                <textarea className="description" rows="6" type="text" 
                value={this.state.newNote} placeholder="add a new note"
                onChange={(event)=>{this.handleChange(event)}}></textarea>
            </label>
            <br></br>
            <button className="commit" onClick={this.saveNote}>SAVE NOTE</button>
          </div>
        </div>
      );
    }
} 

export default connect()(CreateNote);