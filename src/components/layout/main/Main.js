import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import './Main.css';
import StartPage from 'components/start-page/StartPage';
import Login from 'components/login/Login';
import ArticleList from 'components/articleList/ArticleList';

class Main extends Component {
    render() {
        return (
            <main className="Main">
                    <Switch>
                        <Route exact path='/' component={StartPage}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/articles' component={ArticleList}/>
                    </Switch>
            </main>
        );
    }
}

export default Main;