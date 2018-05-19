import React, { Component, Fragment } from 'react';
import ArticleList from 'components/articleList/ArticleList';
import { getArticles } from 'services/article-service';
import Spinner from 'components/spinner/Spinner';
import './ArticlesWrapperPage.css';

export default class ArticlesWrapperPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null
        };
    }

    componentWillMount() {
        getArticles().then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                articles: data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <section className="ArticlesWrapperPage">
                {
                    !this.state.articles
                    ? < Spinner />
                    : 
                    <Fragment>
                        <ArticleList articles={this.state.articles} />
                    </Fragment>
                }
            </section>
        )
    }
}