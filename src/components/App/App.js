import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MyEvents from '../MyEvents/MyEvents';
import EventPage from '../EventPage/EventPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <main>
          <Route 
            exact 
            path='/'
            component={LandingPage}
          />
          <Route
            path='/register'
            component={Register}
          />
          <Route
            path='/login'
            component={Login}
          />
          <Route
            exact
            path='/events'
            component={MyEvents}
          />
          <Route
            path='/events/:id'
            component={EventPage}
          />
        </main>
      </div>  
    );
  }
}

export default App;