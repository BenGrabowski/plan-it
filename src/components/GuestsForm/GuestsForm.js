import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';
import EventsContext from '../../EventsContext';

class GuestsForm extends Component {
    static contextType = EventsContext;
    
    state = {
        max: 0,
        list: [],
        displayGuests: false
    };

    updateMax = event => {
        this.setState({ max: event.target.value });
    }

    displayGuests = () => {
        this.setState({ displayGuests: true });
    }

    submitGuests = () => {
        const user_id = TokenService.getUserId();
        // const guests = this.state;

        const updatedGuests = {
            max: this.state.max,
            list: this.state.list
        }
        
        if(!this.props.newEvent) {
            let newGuestFields = this.context.selectedEvent;
            newGuestFields.guests = updatedGuests;
            // console.log(newGuestFields)

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
                                this.props.eventId,
                                user_id
                            )
                                .then(event => this.context.setSelectedEvent(event))
                        })
                })
                .catch(err => this.context.setError(err));
        }
        
        this.props.updateGuests(updatedGuests);
        this.displayGuests();
    }
    
    render() {
        return (
            this.state.displayGuests
            ? <p>Max Guests: {this.state.max}</p>
            :<div>
                <h3>Guests</h3>
                <div>
                    <label htmlFor="guests-max">Max: </label>
                    <input type="number" name="guests-max" onChange={event => this.updateMax(event)} />
                </div>
                <button onClick={event => this.submitGuests(event)}>Done</button>
                <button onClick={() => this.props.hideGuest()}>Cancel</button>
            </div>
        );
    }
}

export default GuestsForm;