import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Event.css';
import EventsContext from '../../EventsContext';

class Event extends Component {
    renderStart() {
        const start = this.props.start
        return (start) ? start: undefined;
    }

    renderEnd() {
        const end = this.props.end
        return (end) ? end : undefined;
    }

    static contextType = EventsContext;

    // renderVenue() {
    //     const venue = this.props.venue;
    //     return (venue)
    //     ? <div className="venue">
    //         <p className="event-venue">{venue.name}</p>
    //         { venue.address_street !== '' ? <p className="venue-street">{venue.address_street}</p> : null }
    //         { venue.address_city !=='' && venue.address_state !== '' ? <p className="venue-city-state-zip">{venue.address_city}, {venue.address_state} 
    //         {venue.address_zip}</p> : null }
    //     </div>
    //     : undefined;
    // }
    
    render() {
        return (
            <section>
                <Link 
                    to={`/events/${this.props.id}`} 
                    className="event-name-link"
                >
                    {this.props.name}
                </Link>
                <p className="event-date">{this.props.date}</p>
                <p className="event-start">{this.renderStart()}</p>
                <p className="event-end">{this.renderEnd()}</p>
                {/* {this.renderVenue()} */}
            </section>
        );
    }
}

export default Event;