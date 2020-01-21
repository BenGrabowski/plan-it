import React, { Component } from 'react';
import TokenService from './services/token-service';

const EventsContext = React.createContext({
    events: [],
    error: null,
    loggedIn: false,
    setError: () => {},
    clearError: () => {},
    setLoggedIn: () => {},
    setLoggedOut: () => {}
});

export default EventsContext;

export class EventsProvider extends Component {
    state = {
        events: [],
        error: null,
    }

    setUserId = id => {
        TokenService.saveUserId(id)
    }

    setLoggedIn = () => {
        this.setState({ loggedIn: true });
    }

    setLoggedOut = () => {
        this.setState({ loggedIn: false });
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
            setSelectedPlace: this.setSelectedPlace,
            clearError: this.clearError,
            setUserId: this.setUserId,
            setLoggedIn: this.setLoggedIn,
            setLoggedOut: this.setLoggedOut,
        }

        return (
            <EventsContext.Provider value={contextValue}>
                {this.props.children}
            </EventsContext.Provider>
        );
    }
}