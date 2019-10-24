import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashAlt, faCheck} from '@fortawesome/free-solid-svg-icons';
import './EditNote.css';


class EditNote extends Component {
    state = {
        newNote: '',
        noteId: this.props.match.params.id
    }
    handleChange = (event)=>{
      this.setState({
        newNote: event.target.value
      })
    }
    
    componentDidMount = ()=>{
      this.props.dispatch({type: 'GET_ONE_NOTE', payload: this.props.match.params.id});
    }

    componentDidUpdate = (prevProps)=>{
      if (this.props.reduxState.singleNote !== prevProps.reduxState.singleNote){
        this.setState({
          newNote: this.props.reduxState.singleNote.notes_field
        })
      }
    }
    
    deleteNote = ()=>{
      this.props.dispatch({type: 'DELETE_NOTE', payload: this.props.match.params.id})
      //put in a modal to confirm delete before deleting
      this.navBack();
    }

    saveNote = ()=>{
        this.props.dispatch({type: 'UPDATE_NOTE', payload: this.state})
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