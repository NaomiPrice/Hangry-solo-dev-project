import React, {Component} from 'react';
import {connect} from 'react-redux';



class CreateRestaurant extends Component {
    state = {
        name: '',
        collectionId: '',
        note: '',
        placesId: '',
    }
    
    componentDidMount = ()=>{
      this.props.dispatch({type: 'GET_COLLECTIONS'});
    }

    saveRestaurant = ()=>{
        console.log('save button clicked')
        // post collection to DB
        this.props.history.push('/restaurant/2')
    }
    navBack = ()=>{
        this.props.history.goBack();
    }
    addCollection = ()=>{
      this.props.history.push('/addCollection')
    }

    handleChange = (propertyName, event)=>{
      this.setState({
        [propertyName]: event.target.value
      })
    }

    render(){
      const options = this.props.reduxState.collections.map((collection)=>{
        return <option value={collection.id}
                        key={collection.id}> {collection.name}</option>
      })

      return (
        <div>
          <button onClick={this.navBack}>BACK</button> 

          <h1>Add a Restaurant to your List</h1>

          <label>Restaurant Name:
              <br></br>
              <input id="google-input" className="controls" type="text" size="50" placeholder="Resturant Name"></input>
          </label>

          <select value={this.state.collectionId} onChange={(event)=>{this.handleChange('collectionId', event)}}>
            <option value="">--Please Select a Collection--</option>
            {options}
          </select>

          <button onClick={this.addCollection}>ADD COLLECTION</button>
          <br></br>

          <label>Note: 
            <br></br>
            <textarea className="description" rows="6" type="text" value={this.state.note} 
                onChange={(event)=>{this.handleChange('note', event)}}></textarea>
          </label>
          <br></br>

          <button onClick={this.saveRestaurant}>SAVE</button>
        </div>
      );
    }
} 

const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(CreateRestaurant);