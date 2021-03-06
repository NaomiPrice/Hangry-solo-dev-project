import React, { Component } from 'react';
import {connect} from 'react-redux';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="pageDiv">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Back to login page
          </button>
          <div className="titleDescription">
          <p>Create an account to start collecting your restaurants.</p>
          </div>
        <form onSubmit={this.registerUser}>
          <div className="logInInfo">
            <label htmlFor="firstName">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  placeholder="first name..."
                  value={this.state.firstName}
                  onChange={this.handleInputChangeFor('firstName')}
                />
              </label>
            </div>
            <div className="logInInfo">
              <label htmlFor="username">
                Username:
                <input
                  type="text"
                  name="username"
                  placeholder="username..."
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
          </div>
          <div className="logInInfo">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                placeholder="password..."
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="CREATE ACCOUNT"
            />
          </div>
        </form>
      
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

