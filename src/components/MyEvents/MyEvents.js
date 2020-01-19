import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Event from '../Event/Event';
import STORE from '../../STORE';
import './MyEvents.css';

class MyEvents extends Component {
    render() {
        const events = STORE.map((event, index) => {
            return <div className="event-box">
                        <Event 
                            key={index}
                            id={event.id} 
                            name={event.name} 
                            date={event.date}
                        />
                </div>
        });
        
        return (
            <div className="my-events">
                <h2 className="my-events-header">My Events</h2>
                <div class="event-container">
                    {events}
                </div>
                <Link 
                    to='/new-event'
                    className="new-event-button"
                >
                    New Event
                </Link>
            </div>
        );
    }
}

export default MyEvents;