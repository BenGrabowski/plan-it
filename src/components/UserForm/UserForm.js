import React, { Component } from 'react';
import './UserForm.css';

class UserForm extends Component {
    render() {        
        return (
            <div className="user-inputs">
                <div className="username">
                    <label htmlFor="user_name">Username:</label>
                    <input type="text" name='user_name'/>
                </div>

                <div className="password">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password'/>
                </div>
            </div>
        );
    }
}

export default UserForm;