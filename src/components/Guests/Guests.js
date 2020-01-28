import React, { Component } from 'react';
import EventsContext from '../../EventsContext';

class Guests extends Component {
    static contextType = EventsContext;

    render() {
        const spotsRemaining = this.context.selectedEvent.guests.max - this.context.selectedEvent.guests.list.length;
        
        const guests = this.context.selectedEvent.guests.list.map(guest => {
            return <li>{guest}</li>;
        });
        
        return (
            <section className="guest">
                <p className="guest-max">Maximum # of Guests: {this.context.selectedEvent.guests.max}</p>
                <p>Spots Remaining: {spotsRemaining}</p>
                <ul>
                    {guests}
                </ul>
            </section>
        );
    }
}

export default Guests;