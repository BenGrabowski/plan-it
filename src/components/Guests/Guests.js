import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import AddGuests from '../AddGuests/AddGuests';
import GuestItem from '../GuestItem/GuestItem';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';

class Guests extends Component {
    static contextType = EventsContext;

    handleDeleteGuest = index => {
        const user_id = TokenService.getUserId();
        let currentList = this.context.selectedEvent.guests.list;
        currentList.splice(index, 1);
        const newList = currentList;
        // console.log(newGuestFields);

        const newGuestFields = this.context.selectedEvent;
        newGuestFields.guests.list = newList;

        EventApiService.patchEvent(
            user_id,
            this.context.selectedEvent.id,
            newGuestFields
        )
            .then(() => {
                EventApiService.getEvents(user_id)
                    .then(events => {
                        // this.props.hideGuest();
                        this.context.setEvents(events);
                    })
                    .then(() => {
                        EventApiService.getEvent(
                            this.context.selectedEvent.id,
                            user_id
                        )
                            .then(event => this.context.setSelectedEvent(event))
                            .catch(this.context.setError);            
                    })
            })
    }

    
    render() {
        const spotsRemaining = this.context.selectedEvent.guests.max - this.context.selectedEvent.guests.list.length;
        
        // const currentGuestList = this.context.selectedEvent.guests.list
        
        const guests = this.context.selectedEvent.guests.list.map((guest, index) => {
           return (
                <GuestItem 
                    name={guest} 
                    key={index} 
                    index={index} 
                    deleteGuest={this.handleDeleteGuest}
                />
           );
        });
        
        return (
            <section className="guest">
                <p className="guest-max">Maximum # of Guests: {this.context.selectedEvent.guests.max}</p>
                <p>Spots Remaining: {spotsRemaining}</p>
                <ul>
                    {guests}
                </ul>
                { this.props.displayGuestForm ? <AddGuests hideGuest={() => this.props.hideGuest()} /> : null }
                { this.props.displayGuestForm ? null : <button onClick={this.props.setDisplayGuest}>Add Guest</button> }
            </section>
        );
    }
}

export default Guests;