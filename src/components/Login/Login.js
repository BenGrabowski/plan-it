import React, { Component } from 'react';
import UserForm from '../UserForm/UserForm';
import EventsContext from '../../EventsContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import './Login.css';

class Login extends Component {
    
    static contextType = EventsContext;

    static defaultProps = {
        location: {},
        history: { push: () => {} },
        onLoginSuccess: () => {},
    }

    state = { error: null }

    handleSubmitJwtAuth = event => {
        event.preventDefault();
        this.setState({ error: null });
        const { user_name, password } = event.target;

        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value
        })
            .then(res => {
                user_name.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                TokenService.saveUserId(res.user_id);
                this.handleLoginSuccess(res.user_id);
            })
            .catch(res => {
                this.setState({ error: res.error })
            });
    }

    renderInvalidMessage = () => {
        return (
            <p className="invalid-login">Invalid username or password</p>
        );
    }

    handleLoginSuccess = user_id => {
        this.context.setUserId(user_id);
        const { history } = this.props;
        history.push('/events');
        this.context.setLoggedIn();
    }
    
    render() {
        const { error } = this.state;
        
        return (
            <form 
                className="register"
                onSubmit={this.handleSubmitJwtAuth}
            >
                <h2 className="login-title">Login</h2>
                {(error) ? this.renderInvalidMessage() : null}
                <UserForm />
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>
        );
    }
}

export default Login;