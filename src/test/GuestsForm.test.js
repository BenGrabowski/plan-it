import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import NewEvent from '../components/NewEvent/NewEvent';
import GuestsForm from '../components/GuestsForm/GuestsForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <App>
                <NewEvent>
                    <GuestsForm />
                </NewEvent>
            </App>
        </BrowserRouter>, div
    )
    ReactDOM.unmountComponentAtNode(div)
});