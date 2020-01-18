import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
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
                    <Link to='/events'>My Events</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </nav>
        );
    }
}

export default Nav;