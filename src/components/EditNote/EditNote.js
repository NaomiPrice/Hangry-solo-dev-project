import React, {Component} from 'react';
import {connect} from 'react-redux';



class EditNote extends Component {
    state = {
        newNote: ''
    }
    
    saveNote = ()=>{
        console.log('save button clicked')
        // post collection to DB
        this.navBack();
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    render(){
      return (
        <div>
            <button onClick={this.navBack}>CANCEL</button>  
            <h1>Update the Note</h1>
            <label>Note: 
                <br></br>
                <textarea className="description" rows="6" type="text" value={this.state.newNote} 
                        onChange={(event)=>{this.handleChange('newNote', event)}}></textarea>
            </label>
            <br></br>
            <button>DELETE NOTE</button>
            <button onClick={this.saveNote}>SAVE NOTE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(EditNote);