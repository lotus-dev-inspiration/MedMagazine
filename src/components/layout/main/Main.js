import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <main className="Main">
                <Router>
                    <Switch>
                        <h1>I am Main</h1>
                    </Switch>
                </Router>
            </main>
        );
    }
}

export default Main;
