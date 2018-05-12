import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './Main.css';

import StartPage from 'components/start-page/StartPage';
import Login from 'containers/login/Login';
import Logout from 'components/logout/Logout';
import ArticleList from 'components/articleList/ArticleList';
import ArticleCreation from 'components/articleCreation/ArticleCreation';
import ArticlesReviewList from 'components/articles-review/ArticlesReviewList';
import ArticleReview from 'components/articles-review/articleReview/ArticleReview';
import Contact from 'components/contact/Contact';
import Authentication from 'components/authentication/Authentication';
import Account from 'components/account/Account';

import { userFromToken } from 'services/user-service';
import { getCookie } from 'services/cookie-service';

class Main extends Component {
    constructor(props) {
        super(props);
        console.log("Main.js");
    }
    
    componentDidMount() {
        const token = getCookie("Authorization");
        if(token) {
            userFromToken(token).then(response => {
                return response.json();
            }).then(data => {
                this.props.defineUser(data.user);
            }).catch(error => {
                console.log(error);
            })
        }
    }
    
    render() {
        return (
            <main className="Main">
                <Switch>
                    <Route exact path='/' component={StartPage} />
                    <Route exact path="/articles" component={ArticleList}/>
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/account" component={Account} />  
                    <Route exact path='/login' 
                    render={() => {
                        return this.props.user.isLoggedIn 
                        ? <Redirect to="/"/> : <Login/>
                    }}
                    />
                    <Authentication>
                        <Route exact path='/article-creation' component={ArticleCreation}/>
                        <Route exact path="/logout" component={Logout}/>
                        <Route exact path='/articles-review' component={ArticlesReviewList} />
                        <Route exact path='/articles-review/:number' component={ArticleReview} />
                    </Authentication>

                </Switch>
            </main>
        );
    }
}

export default Main;
