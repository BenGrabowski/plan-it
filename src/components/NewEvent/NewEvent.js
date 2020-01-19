import React, { Component } from 'react';
import './NewEvent.css';

class NewEvent extends Component {
    render() {
        return (
            <div className="new-event">
                <h2 className="new-event-heading">New Event</h2>
                
                <section className="new-event-inputs">
                    <div>
                        <label for="event-name">Name:</label>
                        <input type="text" name="event-name" />
                    </div>

                    <div>
                        <label for="event-date">Date:</label>
                        <input type="date" name="event-date" />
                    </div>

                    <div>
                        <label for="start-time">Start:</label>
                        <input type="time" name="start-time" />
                    </div>

                    <div>
                        <label for="end-time">End:</label>
                        <input type="time" name="end-time" />
                    </div>                
                </section>

                <div className="add-buttons">
                    <button>Add Venue</button>
                    <button>Add Budget</button>
                    <button>Add Guests</button>                
                </div>

            </div>
        );
    }
}

export default NewEvent;