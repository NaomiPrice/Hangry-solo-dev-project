import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {
  componentDidMount = ()=>{
    this.props.dispatch({type: 'GET_COLLECTIONS'})
  }
  addCollection = ()=>{
    this.props.history.push('/addCollection');
  }

  addRestaurant = ()=>{
    this.props.history.push('/addRestaurant');
  }

  goToCollection = (id)=>{
    this.props.history.push(`/collection/${id}`)
  }

  render(){
    const collections = this.props.reduxState.collections.map((collection)=>{
      return <div key={collection.id} 
                  className="collection"
                  onClick={()=>this.goToCollection(collection.id)}>{collection.name}</div>
    })
    return(
    <div>
      <div className="navDiv">
        <LogOutButton className="navBtn" />
      </div>  
      <div className="pageDiv">
        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.firstName }!
        </h1>
        <div className="addButtons">
          <button className="addBtn" onClick={this.addCollection}><FontAwesomeIcon icon={faPlusCircle}/> ADD COLLECTION</button>
          <button className="addBtn" onClick={this.addRestaurant}><FontAwesomeIcon icon={faPlusCircle}/> ADD RESTAURANT</button>
        </div>
        
        
        <div className="displayCollections">
          <p className="collectionP">Collections:</p>
          { this.props.reduxState.collections[0] ? 
            <div>{collections}</div> : 
            <div className="collection">No collections yet...please add one!</div>
          }
        </div>
      </div>
    </div>
    )
  }
} 


const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(UserPage);
