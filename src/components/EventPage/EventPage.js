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
import GuestsForm from '../GuestsForm/GuestsForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EventPage extends Component {
    static contextType = EventsContext;

    state = {
        displayEventInfoForm: false,
        displayVenueForm: false,
        displayBudgetForm: false,
        displayGuestForm: false,
        venue: {},
        budget: {},
        guests: {}
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
            : <button onClick={this.displayBudgetForm}>Add Budget</button>
        );
    }

    renderGuests = () => {
        return (
            this.context.selectedEvent.guests.max 
            ? <Guests 
                displayGuestForm={this.displayGuestForm}
                setDisplayGuest={this.displayGuestForm}
                hideGuest={this.hideGuest}
            /> 
            : <button onClick={this.displayGuestForm}>Add Guests</button>
        );
    }

    displayEventInfoForm = () => {
        this.setState({ displayEventInfoForm: true });
    }

    hideEventInfo = () => {
        this.setState({ displayEventInfoForm: false });
    }

    updateVenue = venue => {
        this.setState({ venue });
    }

    displayVenueForm = () => {
        this.setState({ displayVenueForm: true });
    }

    hideVenue = () => {
        this.setState({ displayVenueForm: false });
    }

    updateBudget = budget => {
        this.setState({ budget })
    }
    
    displayBudgetForm = () => {
        this.setState({ displayBudgetForm: true });
    }

    hideBudget = () => {
        this.setState({ displayBudgetForm: false });
    }

    updateGuests = guests => {
        this.setState({ guests: guests })
    }

    displayGuestForm = () => {
        this.setState({ displayGuestForm: true });
    }

    hideGuests = () => {
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
                                <div className="info-venue">
                                    { this.state.displayEventInfoForm 
                                    ? <EventInfoForm 
                                        displayEventInfoForm={this.state.displayEventInfoForm} 
                                        hideEventInfo={this.hideEventInfo}
                                        eventId={this.props.match.params.id}
                                        params={this.props.match.params}
                                    />
                                    : <Event 
                                        name={context.selectedEvent.event_name}
                                        date={context.selectedEvent.event_date}
                                        start={context.selectedEvent.event_start}
                                        end={context.selectedEvent.event_end}
                                    />}
                                    { this.state.displayEventInfoForm 
                                        ? null 
                                        : <button 
                                            onClick={this.displayEventInfoForm}
                                            className="edit-event-button"
                                        >
                                            <FontAwesomeIcon icon="edit" />Edit Event
                                        </button>
                                    }


                                    { this.state.displayVenueForm 
                                        ? <VenueForm 
                                            hideVenue={this.hideVenue}
                                            displayVenueForm={this.state.displayVenueForm}
                                            updateVenue={this.updateVenue}
                                            params={this.props.match.params}
                                            eventId={this.props.match.params.id}
                                        /> 
                                        : <Venue /> }
                                    
                                    {this.state.displayVenueForm 
                                        ? null 
                                        : <button 
                                            onClick={this.displayVenueForm}
                                            className="edit-venue-button"
                                        >
                                           <FontAwesomeIcon icon="edit" /> Edit Venue
                                        </button>}
                                </div>
    
                                <div className="budget-guest">
                                    <section>
                                        {this.state.displayBudgetForm 
                                            ? <BudgetForm 
                                                hideBudget={this.hideBudget} 
                                                displayBudgetForm={this.state.displayBudgetForm}
                                                editEvent={true}
                                                params={this.props.match.params}
                                                updateBudget={this.updateBudget}
                                                eventId={this.props.match.params.id}
                                            /> 
                                            : this.renderBudget()
                                        }
                                    </section>

                                    <section>
                                        {this.state.displayGuestForm
                                            ? <GuestsForm 
                                                hideGuests={this.hideGuests}
                                                updateGuests={this.updateGuests}
                                                params={this.props.match.params}
                                                eventId={this.props.match.params.id}
                                            />
                                            : this.renderGuests()}                                        
                                    </section>
                                </div>
                                <DeleteButton id={context.selectedEvent.id} history={this.props.history} />
                                <Link to='/events' className="back">
                                    <FontAwesomeIcon icon="arrow-alt-circle-left" />
                                </Link>
                            </div>
                        );    
                    } 
                }}
            </EventsContext.Consumer>
        );
    }
}

export default EventPage;