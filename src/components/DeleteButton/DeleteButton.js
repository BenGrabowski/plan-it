import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';
import './DeleteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DeleteButton extends Component {
    static contextType = EventsContext;
    
    handleDeleteEvent = () => {
        const user_id = TokenService.getUserId();
        
        EventApiService.deleteEvent(
            user_id,
            this.props.id
        )
        .then(async () => {
            const newEvents = await
                EventApiService.getEvents(user_id)
            this.context.setEvents(newEvents)
        })    
        .then(() => this.props.history.push('/events'));
    }
    
    render() {
        return (
            <button 
                onClick={this.handleDeleteEvent}
                className="delete-button"
            >
                <FontAwesomeIcon icon="trash" />
            </button>
        );
    }
}

export default DeleteButton;