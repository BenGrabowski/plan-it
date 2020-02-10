import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Event.css';
import EventsContext from '../../EventsContext';
import moment from 'moment';

class Event extends Component {
    renderStart() {
        const start = this.props.start ? moment(this.props.start, 'hh:mm:ss').format('h:mm A') : null;
        return start;
    }

    renderEnd() {
        const end = this.props.end ? moment(this.props.end, 'hh:mm:ss').format('h:mm A'): null;
        return end;
    }

    static contextType = EventsContext;
    
    render() {
        console.log(this.props.date);
        console.log(moment(this.props.date, moment.ISO_8601).format('MM-DD-YYYY').add(1, 'd'));
        
        return (
            <section className="event-info">
                <Link 
                    to={`/events/${this.props.id}`} 
                    className="event-name-link"
                >
                    {this.props.name}
                </Link>
                <p className="event-date">{moment(this.props.date, moment.ISO_8601).format('MM-DD-YYYY')}</p>
                <p className="event-start">{this.renderStart()}</p>
                <p className="event-end">{this.renderEnd()}</p>
            </section>
        );
    }
}

export default Event;