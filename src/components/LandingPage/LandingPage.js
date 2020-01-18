import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page">
                <section className="hero">
                    {/* <h1 className="hero-heading">PlanIt</h1> */}
                    <p className="tagline">Make sure your next event goes off without a hitch</p>
                </section>

                <div className="info-container">
                    <section className="info">
                        <h2>Create an Account</h2>
                        <p className="info-content">
                            Click the Register link above to set up your account to manage your upcoming events
                        </p>
                    </section>

                    <section className="info">
                        <h2>Add Events</h2>
                        <p className="info-content">
                            Start by adding the event name, date, and venue. Then, set the budget and guestlist.
                            Update your event as you plan. 
                        </p>
                    </section>

                    <section className="info">
                        <h2>Keep Track</h2>
                        <p className="info-content">
                            As you add new costs and guests to your event, PlanIt will show you how much budget
                            and guest space remains. 
                        </p>
                    </section>
                </div>

            </div>
        );
    }
}

export default LandingPage;