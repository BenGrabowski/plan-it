import React, { Component } from 'react';
import UserForm from '../UserForm/UserForm';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="register">
                <h2>Login</h2>
                <UserForm />
            </div>
        );
    }
}

export default Login;