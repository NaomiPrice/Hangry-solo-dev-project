import React, {Component} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashAlt, faCheck} from '@fortawesome/free-solid-svg-icons';
import './EditNote.css';


class EditNote extends Component {
    state = {
        newNote: '',
        noteId: this.props.match.params.id
    }

    handleChange = (event)=>{
      //update local state with user input
      this.setState({
        newNote: event.target.value
      })
    }
    
    componentDidMount = ()=>{
      //when page loads, get note data associated with current note
      this.props.dispatch({type: 'GET_ONE_NOTE', payload: this.props.match.params.id});
    }

    componentDidUpdate = (prevProps)=>{
      //when redux loads with note data, set local state to current note from DataBase
      if (this.props.reduxState.singleNote !== prevProps.reduxState.singleNote){
        this.setState({
          newNote: this.props.reduxState.singleNote.notes_field
        })
      }
    }
    
    deleteNote = ()=>{
      //before deleting confirm delete with user
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your note!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your note has been deleted!", {
            icon: "success",
          });
          //delete note if confirmed
          this.props.dispatch({type: 'DELETE_NOTE', payload: this.props.match.params.id})
          this.navBack();
        } else {
          swal("Your note is safe!");
        }
      });
    }

    saveNote = ()=>{
        //dispatch Saga to update note in DataBase
        this.props.dispatch({type: 'UPDATE_NOTE', payload: this.state})
        //navagate user back to previous page where they can see updated note
        this.navBack();
    }

    navBack = ()=>{
        this.props.history.goBack();
    }

    render(){
      return (
        <div>
          <div className="navDiv">
            <button className="navBtn" onClick={this.navBack}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft}/> CANCEL</button> 
          </div>
          <div className="pageDiv">
          <h1>Update Your Note</h1>
            <label>Note: 
                <br></br>
                <textarea className="description" rows="6" type="text" value={this.state.newNote} 
                        onChange={(event)=>{this.handleChange(event)}}></textarea>
            </label>
            <br></br>
            <div className="editBtnContainer">
              <button className="editBtn" onClick={this.deleteNote}><FontAwesomeIcon icon={faTrashAlt}/> DELETE NOTE</button>
              <button className="editBtn" onClick={this.saveNote}><FontAwesomeIcon icon={faCheck}/> SAVE NOTE</button>
            </div>
        
          </div> 
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(EditNote);