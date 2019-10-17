import React, {Component} from 'react';
import {connect} from 'react-redux';



class CreateNote extends Component {
    state = {
        newNote: '',
        restaurantId: this.props.match.params.id
    }
    
    saveNote = ()=>{
        console.log('save button clicked')
        // post collection to DB
        this.props.dispatch({type: 'ADD_NOTE', payload: this.state});
        this.navBack();
    }
    navBack = ()=>{
        this.props.history.goBack();
    }

    handleChange = (event)=>{
      console.log(event.target.value)
      this.setState({
        newNote: event.target.value
      })
    }
    render(){
      return (
        <div>
            <button onClick={this.navBack}>CANCEL</button>  
            <h1>Add a Note</h1>
            <label>Note: 
                <br></br>
                <textarea className="description" rows="6" type="text" value={this.state.note} 
                        onChange={(event)=>{this.handleChange(event)}}></textarea>
            </label>
            <br></br>
            <button onClick={this.saveNote}>SAVE NOTE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateNote);