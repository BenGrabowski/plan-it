import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NewEvent.css';
import EventsContext from '../../EventsContext';
import VenueForm from '../VenueForm/VenueForm';
import BudgetForm from '../BudgetForm/BudgetForm';
import GuestsForm from '../GuestsForm/GuestsForm';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';

class NewEvent extends Component {
    static contextType = EventsContext;

    state = {
        event_name: '',
        event_date: undefined,
        event_start: undefined,
        event_end: undefined,
        venue: {},
        budget: {},
        guests: {},
        displayVenue: false,
        displayBudget: false,
        displayGuests: false,
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.context.clearSelectedEvent();
    }

    // validateFields = event => {

    // }

    handleAddEvent = event => {
        event.preventDefault();
        const user_id = TokenService.getUserId();
        const { event_name, event_date, event_start, event_end, venue, budget, guests } = this.state;
        const { history } = this.props;

        EventApiService.postEvent(
            user_id, event_name, event_date, event_start, event_end, venue, budget, guests
        )
            .then(() => history.push('/events'))
            .catch(this.context.setError);
    }

    setDisplayVenue = () => {
        this.setState({ displayVenue: true });
    }

    hideVenue = () => {
        this.setState({ displayVenue: false });
    }

    setDisplayBudget = () => {
        this.setState({ displayBudget: true });
    }

    hideBudget = () => {
        this.setState({ displayBudget: false });
    }

    setDisplayGuests = () => {
        this.setState({ displayGuests: true });
    }

    hideGuests = () => {
        this.setState({ displayGuests: false });
    }

    updateEventName = event => {
        this.setState({
            event_name: event.target.value
        });
    }

    updateEventDate = event => {
        this.setState({
            event_date: event.target.value
        });
    }

    updateEventStart = event => {
        this.setState({
            event_start: event.target.value
        });
    }

    updateEventEnd = event => {
        this.setState({
            event_end: event.target.value
        });
    }

    updateVenue = venue => {
        this.setState({ venue });
    }

    updateBudget = budget => {
        this.setState({ budget });
    }

    updateGuests = guests => {
        this.setState({ guests });
    }

    
    render() {
        return (
            <form 
                className="new-event" 
                onSubmit={event => this.handleAddEvent(event)}
            >
                <h2 className="new-event-heading">New Event</h2>

                <section className="new-event-inputs">
                    <div>
                        <label htmlFor="event-name">Name:</label>
                        <input 
                            type="text" 
                            name="event-name" 
                            onChange={event => this.updateEventName(event)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="event-date">Date:</label>
                        <input 
                            type="date" 
                            name="event-date" 
                            onChange={event => this.updateEventDate(event)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="start-time">Start:</label>
                        <input 
                            type="time" 
                            name="start-time" 
                            onChange={event => this.updateEventStart(event)}
                        />
                    </div>

                    <div>
                        <label htmlFor="end-time">End:</label>
                        <input 
                            type="time" 
                            name="end-time" 
                            onChange={event => this.updateEventEnd(event)}
                        />
                    </div>
                </section>
            
                <div className="add-buttons">
                    { this.state.displayVenue ? null : <button onClick={this.setDisplayVenue}>Add Venue</button> }
                    { this.state.displayVenue 
                        ? <VenueForm 
                            updateVenue={this.updateVenue} 
                            hideVenue={this.hideVenue} 
                            newEvent={true} 
                            setDisplayVenue={this.setDisplayVenue}
                        /> 
                        : null 
                    }

                    { this.state.displayBudget ? null : <button onClick={this.setDisplayBudget}>Add Budget</button> }
                    { this.state.displayBudget 
                        ? <BudgetForm 
                            updateBudget={this.updateBudget} 
                            hideBudget={this.hideBudget} 
                            newEvent={true} /> 
                        : null 
                    }

                    { this.state.displayGuests ? null : <button onClick={this.setDisplayGuests}>Add Guest Count</button> }
                    { this.state.displayGuests 
                        ? <GuestsForm 
                            updateGuests={this.updateGuests} 
                            hideGuests={this.hideGuests} 
                            newEvent={true} /> 
                        : null 
                    }
                </div>

                <button type="submit">Submit</button>
                <Link to='/events' className="back">Back</Link>
            </form>
        );
    }
}

export default NewEvent;