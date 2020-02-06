import React, { Component } from 'react';
import './UserForm.css';

class UserForm extends Component {
    render() {        
        return (
            <div className="user-inputs">
                <div className="username">
                    <label htmlFor="user_name">Username:</label>
                    <input type="text" name='user_name' className="form-input"/>
                </div>

                <div className="password">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' className="form-input"/>
                </div>
            </div>
        );
    }
}

export default UserForm;