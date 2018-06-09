import React, { Component, Fragment } from 'react';
import docs from 'assets/docs/article-review/test.pdf';
import './ArticlesReviewList.css';
import ArticleView from './articleView/ArticleView';
import { getTime } from 'helpers/date-helper';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getReviewArticles, getStages } from 'actions';
import baseUrl from 'helpers/baseUrl';
import Spinner from 'components/spinner/Spinner';



class ArticleReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArticlesLoading: true,
            isStagesLoading: true
        }
    }

    componentWillMount() {
        this.getReviewArticles();
        this.getStages();
    }

    getReviewArticles() {
        fetch(`${baseUrl}/users/${this.props.userInfo.id}/articles`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            this.props.getReviewArticles(data);
            this.setState({
                isArticlesLoading: false
            })
        }).catch(error => {
            console.log(error);
        })
    }

    getStages() {
        fetch(`${baseUrl}/stages`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            this.props.getStages(data.objects);
            this.setState({
                isStagesLoading: false
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {

        return (
            <section className="ArticlesReviewList">
                {
                    this.state.isArticlesLoading || this.state.isStagesLoading ?
                        <Spinner />
                        : <Fragment>
                            {
                                this.props.articles.length ?
                                    this.props.userInfo.groups.length === 0 ?
                                        <h1 className="header">My articles</h1> :
                                        <h1 className="header">Articles that are awaiting a review</h1>
                                    : <h1 className="header">No available articles</h1>
                            }
                            {
                                this.props.articles.length && this.props.stages.length ?
                                    <div>
                                        {
                                            this.props.articles.sort((a, b) => { return getTime(b.date) - getTime(a.date) }).map((article) => {
                                                return (
                                                    <ArticleView data={article} key={article.id} />
                                                )
                                            })
                                        }
                                    </div> : null
                            }
                        </Fragment>
                }
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        userInfo: state.user.model,
        articles: state.articles.data,
        stages: state.stages.data
    };
};

const mapDispatchToProps = state => ({
    getReviewArticles: getReviewArticles(state),
    getStages: getStages(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleReview));