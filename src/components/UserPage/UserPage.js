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

  render(){
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
        {JSON.stringify(this.props.reduxState)}
        { !this.props.reduxState ? 
          <div>collection info here</div> : 
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
