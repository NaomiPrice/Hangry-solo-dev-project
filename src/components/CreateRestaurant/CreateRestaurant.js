import React, {Component} from 'react';
import {connect} from 'react-redux';



class CreateRestaurant extends Component {
    state = {
        name: '',
        collection: '',
        note: '',
    }
    
    saveCollection = ()=>{
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
            <button onClick={this.navBack}>BACK</button>  
            <h1>Add a Restaurant to your List</h1>
            <label>Restaurant Name:
                <br></br>
                <input id="google-input" className="controls" type="text" size="50" placeholder="Resturant Name"></input>
            </label>

            <select value={this.state.class} onChange={this.handleClassChange}>
                options will be dynamically generated when collections load
                        <option value="" >--Please choose collection--</option>
                        <option value="1">Night on the Town</option>
                        <option value="2">Brunch with Kids</option>
                        <option value="3">Fast and Clost to Home</option>
            </select>
            <button>ADD COLLECTION</button>
            <label>Note: 
                <br></br>
                <textarea className="description" rows="6" type="text" value={this.state.note} 
                    onChange={(event)=>{this.handleChange('newDescription', event)}}></textarea>
            </label>
          <button onClick={this.saveCollection}>SAVE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateRestaurant);