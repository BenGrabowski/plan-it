import React, { Component } from 'react';
import STORE from '../../STORE';
import './EventPage.css';

class EventPage extends Component {
    render() {
        const event = STORE[this.props.match.params.id - 1]
        console.log(event);
        const remainingBudget = event.budget.total - event.budget.venue - 
        event.budget.food - event.budget.drinks - event.budget.decorations - event.budget.other;

        const spotsRemaining = event.guests.max - event.guests.list.length;
        const guests = event.guests.list.map(guest => {
            return <li>{guest}</li>;
        })

        return (
            <div className="event-page">
                <section className="event-info">
                    <h2 className="event-name">{event.name}</h2>
                    <div className="date-time">
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                    </div>
                    
                    <div className="address">
                        <p>{event.venue.name}</p>
                        <p>{event.venue.address_street}</p>
                        <p>{event.venue.address_city}, {event.venue.address_state} {event.venue.address_zip}</p>                    
                    </div>
                </section>

                <div className="budget-guest">
                    <section className="budget">
                        <p>Budget: ${event.budget.total}</p>
                        <p>Remaining Budget: ${remainingBudget}</p>
                        <p>Venue: ${event.budget.venue}</p>
                        <p>Food: ${event.budget.food}</p>
                        <p>Drinks: ${event.budget.drinks}</p>
                        <p>Decorations: ${event.budget.decorations}</p>
                        <p>Other: ${event.budget.other}</p>
                    </section>

                    <section className="guest">
                        <p>Maximum # of Guests: {event.guests.max}</p>
                        <p>Spots Remaining: {spotsRemaining}</p>
                        <ul>
                            {guests}
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
}

export default EventPage;