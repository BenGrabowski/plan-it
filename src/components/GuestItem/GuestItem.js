import React, { Component } from 'react';
import './GuestItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GuestItem extends Component {
    render() {
        return (
            <div className="guest-item">
                <span className="guest-name">{this.props.name}</span>
                <button 
                    onClick={() => this.props.deleteGuest(this.props.index)}
                    className="remove-guest"
                >
                    <FontAwesomeIcon icon="times-circle" />
                </button>
            </div>
        );
    }
}

export default GuestItem;