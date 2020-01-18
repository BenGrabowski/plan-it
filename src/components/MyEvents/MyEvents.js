import React, { Component } from 'react';
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
                <h2>My Events</h2>
                <div class="event-container">
                    {events}
                </div>
            </div>
        );
    }
}

export default MyEvents;