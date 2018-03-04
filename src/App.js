import React, { Component } from 'react';
import './App.css';

import ArticleList from './components/articleList/ArticleList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/article" component={ArticleList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
