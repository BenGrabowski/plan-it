import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';

class EventInfoForm extends Component {
    static contextType = EventsContext;
    
    state = {
        event_name: this.context.selectedEvent.event_name,
        event_date: this.context.selectedEvent.event_date,
        event_start: this.context.selectedEvent.event_start,
        event_end: this.context.selectedEvent.event_end
    };
    
    
    submitEventInfo = event => {
        event.preventDefault();   
        const eventInfo = this.state;
        EventApiService.patchEvent(
            TokenService.getUserId,
            this.context.selectedEvent.id,
            eventInfo
        );
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

    render() {
        
        return (
                <section className="new-event-inputs">
                    <div>
                        <label htmlFor="event-name">Name:</label>
                        <input 
                            type="text" 
                            name="event-name" 
                            onChange={event => this.updateEventName(event)}
                            value={this.props.displayEventInfoForm ? this.state.event_name : undefined}
                        />
                    </div>

                    <div>
                        <label htmlFor="event-date">Date:</label>
                        <input 
                            type="date" 
                            name="event-date" 
                            onChange={event => this.updateEventDate(event)}
                            value={this.props.displayEventInfoForm ? this.state.event_date : undefined}
                        />
                    </div>

                    <div>
                        <label htmlFor="start-time">Start:</label>
                        <input 
                            type="time" 
                            name="start-time" 
                            onChange={event => this.updateEventStart(event)}
                            value={this.props.displayEventInfoForm ? this.state.event_start : undefined}
                        />
                    </div>

                    <div>
                        <label htmlFor="end-time">End:</label>
                        <input 
                            type="time" 
                            name="end-time" 
                            onChange={event => this.updateEventEnd(event)}
                            value={this.props.displayEventInfoForm ? this.state.event_end : undefined}
                        />
                    </div>
                    <button onClick={event => this.submitEventInfo(event)}>Done</button>
                    <button onClick={() => this.props.hideEventInfo()}>Cancel</button>                
                </section>
        );
    }
}

export default EventInfoForm;