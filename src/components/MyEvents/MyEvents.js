import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Event from '../Event/Event';
import './MyEvents.css';
import EventsContext from '../../EventsContext';
import TokenService from '../../services/token-service';
import EventsApiService from '../../services/events-api-service';

class MyEvents extends Component {
    static contextType = EventsContext;

    state = {
        events: this.context.events,
    }

    componentDidMount() {
        this.context.clearError();
        const user_id = TokenService.getUserId();
        EventsApiService.getEvents(user_id)
            // .then(res=> console.log(res))
            .then(res => {
                this.context.setEvents(res);
            })
            .catch(this.context.setError);
    }
    
    render() {

        const events = this.context.events.map((event, index) => {
            return <div className="event-box">
                        <Event 
                            key={index}
                            id={event.id} 
                            name={event.event_name} 
                            date={event.event_date}
                        />
                </div>
        });
        
        return (
            <div className="my-events">
                <h2 className="my-events-header">My Events</h2>
                <div className="event-container">
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