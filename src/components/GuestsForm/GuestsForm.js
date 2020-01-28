import React, { Component } from 'react';

class GuestsForm extends Component {
    state = {
        max: 0,
        list: []
    };

    updateMax = event => {
        this.setState({ max: event.target.value });
    }

    submitGuests = event => {
        event.preventDefault();
        const guests = this.state;
        this.props.updateGuests(guests);
    }
    
    render() {
        return (
            <div>
                <h3>Guests</h3>
                <div>
                    <label htmlFor="guests-max">Max: </label>
                    <input type="number" name="guests-max" onChange={event => this.updateMax(event)} />
                </div>
                <button onClick={event => this.submitGuests(event)}>Done</button>
                <button onClick={() => this.props.hideGuests()}>Cancel</button>
            </div>
        );
    }
}

export default GuestsForm;