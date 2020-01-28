import React, { Component } from 'react';
import UserForm from '../UserForm/UserForm';
import './Register.css';
import EventsContext from '../../EventsContext';
import AuthApiService from '../../services/auth-api-service';

class Register extends Component {
    static contextType = EventsContext;

    state = { error: null };

    static defaultProps = {
        history: { push: () => {} }
    };

    handleSubmit = event => {
        event.preventDefault()
        const { user_name, password } = event.target

        this.setState({ error: null })
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
        })
        .then(user => {
            user_name.value = ''
            password.value = ''
            // this.handleRegistrationSuccess()
            this.props.history.push('/login')
        })
        .catch(res => {
            this.setState({ error: res.error })
            // console.log(res.error);
        })
    }

    // handleReigstrationSuccess = () => {
    //     const { history } = this.props;
    //     history.push('/login')
    // }

    renderInvalidMessage = () => {
        return <p className="invalid-login">{this.state.error}</p>
    }
    
    render() {
        const { error } = this.state;
        
        return (
            <form 
                className="register"
                onSubmit={this.handleSubmit}
            >
                <h2>Create an Account</h2>
                {(error) ? this.renderInvalidMessage() : null}
                <UserForm />
                <button type="submit">Register</button>
            </form>
        );
    }
}

export default Register;