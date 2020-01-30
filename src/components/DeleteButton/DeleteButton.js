import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';

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
            <button onClick={this.handleDeleteEvent}>Delete</button>
        );
    }
}

export default DeleteButton;