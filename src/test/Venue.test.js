import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import EventPage from '../components/EventPage/EventPage';
import Venue from '../components/Venue/Venue';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <App>
                <EventPage>
                    <Venue />
                </EventPage>
            </App>
        </BrowserRouter>, div
    )
    ReactDOM.unmountComponentAtNode(div)
});