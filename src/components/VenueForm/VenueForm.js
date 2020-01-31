import React, { Component } from 'react';
import EventsContext from '../../EventsContext';

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

   submitVenue = event => {
        event.preventDefault();   
        const venue = {
            name: this.state.name,
            address_street: this.state.address_street,
            address_city: this.state.address_city,
            address_state: this.state.address_state,
            address_zip: this.state.address_zip,    
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
                        value={this.props.displayVenueForm ? this.context.selectedEvent.venue.name : undefined} 
                    />
                </div>

                <div>
                    <label htmlFor="address_street">Street:</label>
                    <input 
                        type="text" 
                        name="address_street" 
                        onChange={event => this.updateStreet(event)}
                        value={this.props.displayVenueForm ? this.context.selectedEvent.venue.address_street : undefined}  
                    />
                </div>

                <div>
                    <label htmlFor="address_city">City:</label>
                    <input 
                        type="text" 
                        name="address_city" 
                        onChange={event => this.updateCity(event)}
                        value={this.props.displayVenueForm ? this.context.selectedEvent.venue.address_city : undefined}  
                    />
                </div>

                <div>
                    <label htmlFor="address_state">State:</label>
                    <input 
                        type="text" 
                        name="address_state" 
                        maxLength="2" 
                        onChange={event => this.updateState(event)}
                        value={this.props.displayVenueForm ? this.context.selectedEvent.venue.address_state : undefined}  
                    />
                </div>

                <div>
                    <label htmlFor="address_zip">Zip Code:</label>
                    <input 
                        type="text" 
                        name="venue-name" 
                        maxLength="5" 
                        onChange={event => this.updateZip(event)}
                        value={this.props.displayVenueForm ? this.context.selectedEvent.venue.address_zip : undefined} 
                    />
                </div>
                <button onClick={event => this.submitVenue(event)}>Done</button>
                <button onClick={() => this.props.hideVenue()}>Cancel</button>
            </div>
        );
    }
}

export default VenueForm;