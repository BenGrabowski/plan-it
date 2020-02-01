import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import AddGuests from '../AddGuests/AddGuests';
import GuestItem from '../GuestItem/GuestItem';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';
import './Guests.css';

class Guests extends Component {
    static contextType = EventsContext;

    state = {
        addingGuest: false
    };

    setAddingGuest = () => {
        this.setState({ addingGuest: true });
    }

    hideAddingGuest = () => {
        this.setState({ addingGuest: false });
    }

    renderAddGuestButton = () => {
        return this.state.addingGuest
        ? null
        : <button onClick={this.setAddingGuest}>Add Guest</button>
    }

    handleDeleteGuest = index => {
        const user_id = TokenService.getUserId();
        let currentList = this.context.selectedEvent.guests.list;
        currentList.splice(index, 1);
        const newList = currentList;

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
                
                <div className="edit-button">
                    <button 
                        onClick={() => this.props.displayGuestForm()}
                    >
                        Edit
                    </button>                
                </div>

                <p>Spots Remaining: {spotsRemaining}</p>
                <ul className="guest-list">
                    {guests}
                </ul>
                { this.state.addingGuest ? <AddGuests hideGuest={this.hideAddingGuest} /> : null }
                {/* <button onClick={this.setAddingGuest}>Add Guest</button> */}
                <div className="edit-button">
                    {this.renderAddGuestButton()}
                </div>
            </section>
        );
    }
}

export default Guests;