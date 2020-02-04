import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import Login from '../components/Login/Login';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <App>
                <Login />
            </App>
        </BrowserRouter>, div
    )
    ReactDOM.unmountComponentAtNode(div)
});