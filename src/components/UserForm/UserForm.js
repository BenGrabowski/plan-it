import React, { Component } from 'react';
import './UserForm.css';

class UserForm extends Component {
    render() {
        return (
            <div className="user-inputs">
                <label htmlFor="user_name">Username:</label>
                <input type="text" name='user_name'/>

                <label htmlFor="password">Password:</label>
                <input type="password" name='password'/>
            </div>
        )
    }
}

export default UserForm;