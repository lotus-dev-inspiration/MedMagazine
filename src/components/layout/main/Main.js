import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import './Main.css';
import StartPage from 'components/start-page/StartPage';

class Main extends Component {
    render() {
        return (
            <main className="Main">
                    <Switch>
                        <Route exact path='/' component={StartPage}/>
                    </Switch>
            </main>
        );
    }
}

export default Main;
