import React, { Component } from 'react';
import TokenService from './services/token-service';

const EventsContext = React.createContext({
    events: [],
    error: null,
    loggedIn: false,
    selectedEvent: undefined,
    isFetching: false,
    setError: () => {},
    clearError: () => {},
    setLoggedIn: () => {},
    setLoggedOut: () => {},
    setSelectedEvent: () => {},
});

export default EventsContext;

export class EventsProvider extends Component {
    state = {
        events: [],
        selectedEvent: undefined,
        error: null,
        loggedIn: false,
        isFetching: false,
    }

    setUserId = id => {
        TokenService.saveUserId(id)
    }

    setEvents = events => {
        (Array.isArray(events))
        ? this.setState({ events })
        : console.log('events is not an array');
    }

    setSelectedEvent = event => {
        this.setState({ selectedEvent: event });
    }

    clearSelectedEvent = () => {
        this.setState({ selectedEvent: undefined });
    }

    setLoggedIn = () => {
        this.setState({ loggedIn: true });
    }

    setLoggedOut = () => {
        this.setState({ loggedIn: false });
    }

    setFetching = status => {
        this.setState({
            isFetching: status
        })
    }

    setError = error => {
        console.error(error);
        this.setState({ error });
    }

    clearError = () => {
        this.setState({ error: null });
    }

    render() {
        const contextValue = {
            events: this.state.events,
            selectedEvent: this.state.selectedEvent,
            setSelectedEvent: this.setSelectedEvent,
            clearSelectedEvent: this.clearSelectedEvent,
            clearError: this.clearError,
            setUserId: this.setUserId,
            setLoggedIn: this.setLoggedIn,
            setLoggedOut: this.setLoggedOut,
            setEvents: this.setEvents,
            loggedIn: this.state.loggedIn,
            isFetching: this.state.isFetching,
            setFetching: this.setFetching,
        }

        return (
            <EventsContext.Provider value={contextValue}>
                {this.props.children}
            </EventsContext.Provider>
        );
    }
}