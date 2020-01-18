import React, { Component } from 'react';
import UserForm from '../UserForm/UserForm';
import './Register.css';

class Register extends Component {
    render() {
        return (
            <div className="register">
                <h2>Create an Account</h2>
                <UserForm />
            </div>
        );
    }
}

export default Register;