import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import UserPage from '../UserPage/UserPage';
import CollectionPage from '../CollectionPage/CollectionPage';
import RestaurantPage from '../RestaurantPage/RestaurantPage';
import CreateCollection from '../CreateCollection/CreateCollection';
import CreateRestaurant from '../CreateRestaurant/CreateRestaurant';
import CreateNote from '../CreateNote/CreateNote';
import EditNote from '../EditNote/EditNote';
import Script from 'react-load-script';
import './App.css';



class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    let urlToUse = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`
    return (
      <Router>
        <div>
          <Script url={urlToUse}/>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
           
            
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              render={(navProps)=>(
                <UserPage 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the collection page instead. */}
            <ProtectedRoute
              path="/collection/:id"
              render={(navProps)=>(
                <CollectionPage 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />

            <ProtectedRoute
              path="/restaurant/:id"
              render={(navProps)=>(
                <RestaurantPage 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />   

            <ProtectedRoute
              path="/addCollection"
              render={(navProps)=>(
                <CreateCollection 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />       

            <ProtectedRoute
              path="/addRestaurant"
              render={(navProps)=>(
                <CreateRestaurant 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />

            <ProtectedRoute
              path="/addNote/:id"
              render={(navProps)=>(
                <CreateNote 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />

            <ProtectedRoute
              path="/editNote/:id"
              render={(navProps)=>(
                <EditNote 
                  match={navProps.match}
                  history={navProps.history}/>
              )}
            />         
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
