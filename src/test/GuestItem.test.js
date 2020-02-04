import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App/App';
import EventPage from '../components/EventPage/EventPage';
import Guests from '../components/Guests/Guests';
import GuestItem from '../components/GuestItem/GuestItem';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <App>
                <EventPage>
                    <Guests>
                        <GuestItem />
                    </Guests>
                </EventPage>
            </App>
        </BrowserRouter>, div
    )
    ReactDOM.unmountComponentAtNode(div)
});