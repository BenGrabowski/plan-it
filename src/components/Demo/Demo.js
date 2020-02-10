import React, { Component } from 'react';
import './Demo.css';

class Demo extends Component {
    render() {
        return (
            <section className="demo">
                <h3 className="demo-title">Demo Instructions</h3>
                <p>
                    Create your own PlanIt account by clicking on the "Register" link in the navigation bar.
                </p>
                <p>
                    If you'd rather test out some existing events, you can click the "Login" link and use the following credentials.
                </p>
                <ul className="credentials">
                    <li>Username: BGrabowski</li>
                    <li>Password: DemoPassword1#</li>
                </ul>
            </section>
        );
    }
}

export default Demo;