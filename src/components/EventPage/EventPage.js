import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Event from '../Event/Event';
import Budget from '../Budget/Budget';
import Guests from '../Guests/Guests';
import './EventPage.css';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';
import EventInfoForm from '../EventInfoForm/EventInfoForm';
import VenueForm from '../VenueForm/VenueForm';
import Venue from '../Venue/Venue';
import DeleteButton from '../DeleteButton/DeleteButton';
import BudgetForm from '../BudgetForm/BudgetForm';

class EventPage extends Component {
    static contextType = EventsContext;

    state = {
        displayEventInfoForm: false,
        displayVenueForm: false,
        displayBudgetForm: false,
        displayGuestForm: false,
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.context.clearError();
        EventApiService.getEvent(
            this.props.match.params.id,
            TokenService.getUserId()
        )
            .then(event => this.context.setSelectedEvent(event))
            .catch(this.context.setError);
    }

    renderNotFound = () => {
        return <h2>Event Not Found</h2>;
    }

    renderBudget = () => {
        return (
            this.context.selectedEvent.budget.total 
            ?  <Budget 
                    displayBudgetForm={this.displayBudgetForm} 
                    hideBudget={this.hideBudget}
                /> 
            : null
        );
    }

    renderGuests = () => {
        return (
            this.context.selectedEvent.guests.max 
            ? <Guests 
                displayGuestForm={this.state.displayGuestForm}
                setDisplayGuest={this.displayGuestForm}
                hideGuest={this.hideGuest}
            /> 
            : null
        );
    }

    displayEventInfoForm = () => {
        this.setState({ displayEventInfoForm: true });
    }

    hideEventInfo = () => {
        this.setState({ displayEventInfoForm: false });
    }

    displayVenueForm = () => {
        this.setState({ displayVenueForm: true });
    }

    hideVenue = () => {
        this.setState({ displayVenueForm: false });
    }

    displayBudgetForm = () => {
        this.setState({ displayBudgetForm: true });
    }

    hideBudget = () => {
        this.setState({ displayBudgetForm: false });
    }

    displayGuestForm = () => {
        this.setState({ displayGuestForm: true });
    }

    hideGuest = () => {
        this.setState({ displayGuestForm: false });
    }
    
    render() {
        return (
            <EventsContext.Consumer>
                {(context) => {
                    if (context.isFetching) {
                        return <h2>Loading...</h2>;
                    } else if (context.selectedEvent === undefined) {
                        return <h2>Event Not Found</h2>;
                    } else {
                        return (
                            <div className="event-page">
                                
                                { this.state.displayEventInfoForm 
                                ? <EventInfoForm 
                                    displayEventInfoForm={this.state.displayEventInfoForm} 
                                    hideEventInfo={this.hideEventInfo}
                                    eventId={this.props.match.params.id}
                                />
                                : <Event 
                                    name={context.selectedEvent.event_name}
                                    date={context.selectedEvent.event_date}
                                    start={context.selectedEvent.event_start}
                                    end={context.selectedEvent.event_end}
                                    // venue={context.selectedEvent.venue}
                                />}

                                { this.state.displayVenueForm 
                                    ? <VenueForm 
                                        hideVenue={this.hideVenue}
                                        displayVenueForm={this.state.displayVenueForm}
                                    /> 
                                    : <Venue /> }
                                <button onClick={this.displayEventInfoForm}>Edit Event</button>
                                <button onClick={this.displayVenueForm}>Edit Venue</button>
    
                                <div className="budget-guest">
                                    {this.state.displayBudgetForm 
                                        ? <BudgetForm 
                                            hideBudget={this.hideBudget} 
                                            displayBudgetForm={this.state.displayBudgetForm}
                                            currentBudget={this.state.currentBudgetTotal}
                                        /> 
                                        : this.renderBudget()
                                    }
                                    {this.renderGuests()}
                                </div>
                                <DeleteButton id={context.selectedEvent.id} />
                                <Link to='/events' className="back">Back</Link>
                            </div>
                        );    
                    } 
                }}
            </EventsContext.Consumer>
        );
    }
}

export default EventPage;