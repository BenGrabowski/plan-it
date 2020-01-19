import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Event.css';

class Event extends Component {
    renderTime() {
        const time = this.props.time;
        return (time) ? time : undefined;
    }

    renderVenue() {
        const venue = this.props.venue;
        return (venue)
        ? <div className="venue">
            <p className="event-venue">{venue.name}</p>
            <p className="venue-street">{venue.address_street}</p>
            <p className="venue-city-state">
                {venue.address_city}, 
                {venue.address_state}
            </p>
            <p className="venue-zip">{venue.address_zip}</p>
        </div>
        : undefined;
    }
    
    render() {
        return (
            <section>
                <Link to={`/events/${this.props.id}`} className="event-name-link">{this.props.name}</Link>
                <p className="event-date">{this.props.date}</p>
                <p className="event-time">{this.renderTime()}</p>
                <p className="event-venue">{this.renderVenue()}</p>
            </section>
        );
    }
}

export default Event;