import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';
import EventsContext from '../../EventsContext';
import './GuestsForm.css';

class GuestsForm extends Component {
    static contextType = EventsContext;
    
    state = {
        max: '',
        list: [],
        displayGuests: false
    };

    componentDidMount() {
        if (this.props.params) {
            this.setState({
                max: this.context.selectedEvent.guests.max,
                list: this.context.selectedEvent.guests.list
            });
        }
    }

    updateMax = event => {
        this.setState({ max: event.target.value });
    }

    displayGuests = () => {
        this.setState({ displayGuests: true });
    }

    displayForm = () => {
        this.setState({ displayGuests: false });
    }

    submitGuests = () => {
        const user_id = TokenService.getUserId();

        const updatedGuests = {
            max: this.state.max,
            list: this.state.list
        }
        
        if(!this.props.newEvent) {
            let newGuestFields = this.context.selectedEvent;
            newGuestFields.guests = updatedGuests;

            EventApiService.patchEvent(
                user_id,
                this.context.selectedEvent.id,
                newGuestFields
            )
                .then(() => {
                    EventApiService.getEvents(user_id)
                        .then(events => {
                            this.props.hideGuests();
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
            ? <div>
                <p>Max Guests: {this.state.max}</p>
                <button onClick={this.displayForm}>Edit</button>
            </div>
            :<div className="guest-form">
                <h3>Guests</h3>
                <div>
                    <label htmlFor="guests-max">Max: </label>
                    <input 
                        type="number" 
                        name="guests-max" 
                        className="form-input"
                        onChange={event => this.updateMax(event)}
                        value={this.state.max} 
                    />
                </div>
                <div className="guest-form-buttons">
                    <button onClick={event => this.submitGuests(event)}>Done</button>
                    <button onClick={() => this.props.hideGuests()}>Cancel</button>                
                </div>
            </div>
        );
    }
}

export default GuestsForm;