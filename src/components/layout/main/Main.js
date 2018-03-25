import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import './Main.css';
import StartPage from 'components/start-page/StartPage';
import Login from 'components/login/Login';
import ArticleList from 'components/articleList/ArticleList';
import ArticlesReviewList from 'components/articles-review/ArticlesReviewList';
import ArticleReview from 'components/articles-review/articleReview/ArticleReview';

class Main extends Component {
    render() {
        return (
            <main className="Main">
                    <Switch>
                        <Route exact path='/' component={StartPage}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/articles' component={ArticleList}/>
                        <Route exact path='/articles-review' component={ArticlesReviewList} />
                        <Route exact path='/articles-review/:number' component={ArticleReview} />
                    </Switch>
            </main>
        );
    }
}

export default Main;
