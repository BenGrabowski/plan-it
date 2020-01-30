import React, { Component } from 'react';

class GuestItem extends Component {
    render() {
        return (
            <div>
                <span>{this.props.name}</span>
                <button onClick={() => this.props.deleteGuest(this.props.index)}>Delete</button>
            </div>
        );
    }
}

export default GuestItem;