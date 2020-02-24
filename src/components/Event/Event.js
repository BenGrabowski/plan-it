import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Event.css';
import EventsContext from '../../EventsContext';
import moment, { ISO_8601 } from 'moment';
// import moment from 'moment-timezone';
import { DateTime } from 'luxon';

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
        const datePluseOne = moment.utc(this.props.date, ISO_8601).add(1, 'day').format('MMMM D, YYYY');

        const date = DateTime.fromISO(this.props.date).toFormat('DDD');
        // const date = DateTime.fromISO(utcDate).toFormat('DDD');
        // const date = moment.utc(this.props.date).format()
        console.log(date);

        
        return (
            <section className="event-info">
                <Link 
                    to={`/events/${this.props.id}`} 
                    className="event-name-link"
                >
                    {this.props.name}
                </Link>
                {/* <p className="event-date">{date}</p> */}
                <p className="event-date">{datePluseOne}</p>
                <p className="event-start">{this.renderStart()}</p>
                <p className="event-end">{this.renderEnd()}</p>
            </section>
        );
    }
}

export default Event;