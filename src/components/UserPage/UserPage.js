import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

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
      <LogOutButton className="log-in" />
      <h1 id="welcome">
        Welcome, { this.props.reduxState.user.firstName }!
      </h1>
  
      <button onClick={this.addCollection}>ADD COLLECTION</button>
      <button onClick={this.addRestaurant}>ADD RESTAURANT</button>
      <p>Collections:</p>
      <div className="displayCollections">
        { this.props.reduxState.collections[0] ? 
          <div>{collections}</div> : 
          <div>No collections yet...please add one!</div>
        }
      </div>
    </div>
    )
  }
} 


const putReduxStateOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxStateOnProps)(UserPage);
