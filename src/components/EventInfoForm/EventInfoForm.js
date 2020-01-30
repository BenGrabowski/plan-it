import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import EventApiService from '../../services/events-api-service';
import TokenService from '../../services/token-service';
import moment from 'moment';

class EventInfoForm extends Component {
    static contextType = EventsContext;
    
    state = {
        event_name: this.context.selectedEvent.event_name,
        event_date: moment(this.context.selectedEvent.event_date, moment.ISO_8601).format('YYYY-MM-DD'),
        event_start: moment(this.context.selectedEvent.event_start, 'hh:mm:ss').format('h:mm A'),
        event_end: this.context.selectedEvent.event_end
    };
    
    
    submitEventInfo = () => {
        const user_id = TokenService.getUserId();
        const eventInfo = this.state;
        EventApiService.patchEvent(
            user_id,
            this.context.selectedEvent.id,
            eventInfo
        )
            .then(() => {
                EventApiService.getEvents(user_id)
                    .then(events => {
                        this.props.hideEventInfo();
                        this.context.setEvents(events);
                    })
                    .then(() => {
                        EventApiService.getEvent(
                            this.props.eventId,
                            user_id
                        )
                            .then(event => this.context.setSelectedEvent(event))
                            .catch(this.context.setError);            
                    })
            })
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