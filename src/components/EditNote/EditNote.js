import React, {Component} from 'react';
import {connect} from 'react-redux';



class EditNote extends Component {
    state = {
        newNote: '',
        noteId: this.props.match.params.id
    }
    handleChange = (event)=>{
      console.log(event.target.value)
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
    

    saveNote = ()=>{
        console.log('save button clicked')
        this.props.dispatch({type: 'UPDATE_NOTE', payload: this.state})
        this.navBack();
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    render(){
      return (
        <div>
            <button onClick={this.navBack}>CANCEL</button>  
            <h1>Update Your Note</h1>
            <label>Note: 
                <br></br>
                <textarea className="description" rows="6" type="text" value={this.state.newNote} 
                        onChange={(event)=>{this.handleChange(event)}}></textarea>
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