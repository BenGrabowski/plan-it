import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import EventsContext from '../../EventsContext';
import TokenService from '../../services/token-service';

class Nav extends Component {
    static contextType = EventsContext;

    state = {
        loggedIn: this.context.loggedIn,
    };

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        TokenService.clearUserId()
        this.renderLoginLink()
        this.context.setLoggedOut()
    }
    
    renderLogoutLink() {
        return (
            <div className='logged-in'>
                <Link 
                    to={'/events'}
                    id="my-events-link"
                    className="nav-link"
                >
                    My Events
                </Link>
                
                <Link
                    onClick={this.handleLogoutClick}
                    to={'/'}
                    className="nav-link log-out"
                >
                    Log Out    
                </Link>
            </div>
        );
    }

    renderLoginLink() {
        return (
            <div className='not-logged-in'>
                <Link
                    to='/login'
                    className="nav-link"
                >
                    Login
                </Link>
                <Link
                    to='/register'
                    className="nav-link"
                >
                    Register
                </Link>
            </div>
        )
    }

    
    render() {
        return (
            <nav role="navigation" className="nav-bar">
                <Link 
                    to='/'
                    className="app-name"
                >
                    PlanIt
                </Link>
                <div className="nav-links">
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()
                    }
                </div>
            </nav>
        );
    }
}

export default Nav;