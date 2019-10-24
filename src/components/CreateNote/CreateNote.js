import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';



class CreateNote extends Component {
    state = {
        newNote: '',
        restaurantId: this.props.match.params.id
    }
    
    saveNote = ()=>{
      this.props.dispatch({type: 'ADD_NOTE', payload: this.state});
      this.navBack();
    }
    navBack = ()=>{
      this.props.history.goBack();
    }

    handleChange = (event)=>{
      this.setState({
        newNote: event.target.value
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
            <label> Note:
                <br></br>
                <textarea className="description" rows="6" type="text" 
                value={this.state.note} placeholder="add a new note"
                onChange={(event)=>{this.handleChange(event)}}></textarea>
            </label>
            <br></br>
            <button className="commit" onClick={this.saveNote}>SAVE NOTE</button>
          </div>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateNote);