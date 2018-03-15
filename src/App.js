import React, { Component } from 'react';
import Login from './components/login/Login';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
