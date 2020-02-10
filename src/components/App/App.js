import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MyEvents from '../MyEvents/MyEvents';
import EventPage from '../EventPage/EventPage';
import NewEvent from '../NewEvent/NewEvent';
import Demo from '../Demo/Demo';
import { EventsProvider } from '../../EventsContext';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleLeft, faEdit, faTrash, faTimesCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowAltCircleLeft, faEdit, faTrash, faTimesCircle, faPlus);

class App extends Component {
  render() {
    return (
      <EventsProvider>
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
            <Route
              path='/new-event'
              component={NewEvent}
            />
            <Route
              path='/demo'
              component={Demo}
            />
          </main>
        </div>  
      </EventsProvider>
    );
  }
}

export default App;