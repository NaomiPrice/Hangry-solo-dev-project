import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import './CreateCollection.css';


class CreateCollection extends Component {
    state = {
        newCollection: ''
    }
    handleChange = (event)=>{
      console.log(event.target.value)
      this.setState({
        newCollection: event.target.value
      })
    }

    saveCollection = ()=>{
        this.props.dispatch({type: 'ADD_COLLECTION', payload: this.state})
        this.navBack();
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    render(){
      return (
        <div>
          <div className="navDiv">
            <button className="navBtn"onClick={this.navBack}><FontAwesomeIcon icon={faChevronLeft}/><FontAwesomeIcon icon={faChevronLeft}/> BACK</button>  
          </div>
           
          <div className="pageDiv">
          <h1>Add a new collection</h1>
          <label className="newCollection"> 
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

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateCollection);