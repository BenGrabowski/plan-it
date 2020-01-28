import React, { Component } from 'react';
import EventsContext from '../../EventsContext';

class Venue extends Component {
    static contextType = EventsContext;
    
    render() {
        const venue = this.context.selectedEvent.venue;
        
        return (
            <div className="venue">
                <p className="event-venue">{venue.name}</p>
                { venue.address_street !== '' ? <p className="venue-street">{venue.address_street}</p> : null }
                { venue.address_city !=='' && venue.address_state !== '' ? <p className="venue-city-state-zip">{venue.address_city}, {venue.address_state} 
                {venue.address_zip}</p> : null }
            </div>
        );
    }
}

export default Venue;