import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';

class AddGuests extends Component {
    
    static contextType = EventsContext;

    state = {
        newGuest: ''
    }
    
    updateGuest = event => {
        this.setState({ newGuest: event.target.value });
    }
    
    handleAddGuest = () => {
        const user_id = TokenService.getUserId();
        
        let currentList = this.context.selectedEvent.guests.list;        
        const { newGuest } = this.state;

        currentList.push(newGuest);

        const newGuestFields = this.context.selectedEvent;
        newGuestFields.guests.list = currentList;

        EventApiService.patchEvent(
            user_id,
            this.context.selectedEvent.id,
            newGuestFields
        )
            .then(() => {
                EventApiService.getEvents(user_id)
                    .then(events => {
                        this.props.hideGuest();
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
        return (
            <div>
                <input type="text" name="add-guest" onChange={this.updateGuest} />
                <button onClick={() => this.handleAddGuest()}>Add</button>
                <button onClick={() => this.props.hideGuest()}>Cancel</button>
            </div>
        );
    }
}

export default AddGuests;