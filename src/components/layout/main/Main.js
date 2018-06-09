import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './Main.css';

import StartPage from 'components/start-page/StartPage';
import Login from 'containers/login/Login';
import Logout from 'components/logout/Logout';
import ArticleWrapperPage from 'components/articles-wrapper-page/ArticlesWrapperPage';
import ArticleCreation from 'components/articleCreation/ArticleCreation';
import ArticlesReviewList from 'components/articles-review/ArticlesReviewList';
import ArticleReview from 'components/articles-review/articleReview/ArticleReview';
import Contact from 'components/contact/Contact';
import Requirements from 'components/requirements/Requirements';
import Archive from 'components/archive/Archive';
// import NotFound from 'components/notfound/NotFound';
import Authentication from 'components/authentication/Authentication';
import Account from 'components/account/Account';
import ArticleInfo from 'components/articleInfo/ArticleInfo';
import Spinner from 'components/spinner/Spinner';


import { userFromToken } from 'services/user-service';
import { getCookie } from 'services/cookie-service';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserGotten: false
        }
    }

    componentDidMount() {
        const token = getCookie("Authorization");
        if (token) {
            userFromToken(token).then(response => {
                return response.json();
            }).then(data => {
                this.props.defineUser(data.user);
                this.setState({
                    isUserGotten: true
                })
            }).catch(error => {
                console.log(error);
            })
        } else {
            this.setState({
                isUserGotten: true
            })
        }
    }

    render() {
        return (
            <main className="Main">
                <Switch>
                    <Route exact path='/' component={StartPage} />
                    <Route exact path="/magazine" component={ArticleWrapperPage} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/requirements" component={Requirements} />
                    <Route exact path='/archive' component={Archive} />
                    <Route exact path='/archive/:number' component={ArticleWrapperPage} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path='/login'
                        render={() => {
                            return this.props.user.isLoggedIn
                                ? <Redirect to="/" /> : <Login />
                        }}
                    />
                    {
                        this.state.isUserGotten ?
                            <Authentication>
                                <Route exact path='/article-creation' render={() => (<ArticleCreation user={this.props.user} />)} />
                                <Route exact path="/logout" component={Logout} />
                                <Route exact path='/article-info/:number' component={ArticleInfo} />
                                <Route exact path='/articles-review' component={ArticlesReviewList} />
                                <Route exact path='/articles-review/:number' component={ArticleReview} />
                                {/* <Route exact path="*" component={NotFound} /> */}
                            </Authentication>
                            : <Spinner />
                    }
                </Switch>
            </main>
        );
    }
}

export default Main;
