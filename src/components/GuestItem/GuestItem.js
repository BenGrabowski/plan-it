import React, { Component } from 'react';
import './GuestItem.css';

class GuestItem extends Component {
    render() {
        return (
            <div>
                <span className="guest-name">{this.props.name}</span>
                <button onClick={() => this.props.deleteGuest(this.props.index)}>Delete</button>
            </div>
        );
    }
}

export default GuestItem;