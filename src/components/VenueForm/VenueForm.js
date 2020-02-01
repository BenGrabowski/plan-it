import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';

class VenueForm extends Component {
    static contextType = EventsContext;
    
    state = {
        name: '',
        address_street: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        displayVenue: false
    }

    componentDidMount() {
        if(this.props.params) {
            this.setState({
                name: this.context.selectedEvent.venue.name,
                address_street: this.context.selectedEvent.venue.address_street,
                address_city: this.context.selectedEvent.venue.address_city,
                address_state: this.context.selectedEvent.venue.address_state,
                address_zip: this.context.selectedEvent.venue.address_zip,
            });
        }
    }

   updateName = event => {
       this.setState({
           name: event.target.value
       });
   }

   updateStreet = event => {
       this.setState({
           address_street: event.target.value
       });
   }

   updateCity = event => {
       this.setState({
           address_city: event.target.value
       });
   }

   updateState = event => {
       this.setState({
           address_state: event.target.value
       });
   }

   updateZip = event => {
       this.setState({
           address_zip: event.target.value
       });
   }

   displayVenue = () => {
        this.setState({ displayVenue: true })   
   }

   displayForm = () => {
       this.setState({ displayVenue: false })
   }

   submitVenue = () => {
        const user_id = TokenService.getUserId();

        const venue = {
            name: this.state.name,
            address_street: this.state.address_street,
            address_city: this.state.address_city,
            address_state: this.state.address_state,
            address_zip: this.state.address_zip,    
        }

        if(!this.props.newEvent) {
            let newVenueFields = this.context.selectedEvent;
            newVenueFields.venue = venue;

            EventApiService.patchEvent(
                user_id,
                this.context.selectedEvent.id,
                newVenueFields
            )
                .then(() => {
                    EventApiService.getEvents(user_id)
                        .then(events => {
                            this.props.hideVenue();
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

        this.props.updateVenue(venue);
        this.displayVenue();
   }
    
    render() {
        return (
            this.state.displayVenue
            ? 
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.address_street}</p>
                <p>{this.state.address_city}</p>
                <p>{this.state.address_state}</p>
                <p>{this.state.address_zip}</p>
                <button onClick={this.displayForm}>Edit</button>
            </div>
            :
            <div>
                <h3>Venue</h3>
                <div>
                    <label htmlFor="venue-name">Name:</label>
                    <input 
                        type="text" 
                        name="venue-name" 
                        onChange={event => this.updateName(event)}
                        value={this.state.name} 
                    />
                </div>

                <div>
                    <label htmlFor="address_street">Street:</label>
                    <input 
                        type="text" 
                        name="address_street" 
                        onChange={event => this.updateStreet(event)}
                        value={this.state.address_street}  
                    />
                </div>

                <div>
                    <label htmlFor="address_city">City:</label>
                    <input 
                        type="text" 
                        name="address_city" 
                        onChange={event => this.updateCity(event)}
                        value={this.state.address_city}  
                    />
                </div>

                <div>
                    <label htmlFor="address_state">State:</label>
                    <input 
                        type="text" 
                        name="address_state" 
                        maxLength="2" 
                        onChange={event => this.updateState(event)}
                        value={this.state.address_state}  
                    />
                </div>

                <div>
                    <label htmlFor="address_zip">Zip Code:</label>
                    <input 
                        type="text" 
                        name="venue-name" 
                        maxLength="5" 
                        onChange={event => this.updateZip(event)}
                        value={this.state.address_zip} 
                    />
                </div>
                <button onClick={event => this.submitVenue(event)}>Done</button>
                <button onClick={() => this.props.hideVenue()}>Cancel</button>
            </div>
        );
    }
}

export default VenueForm;