import React, { Component } from 'react';

import './ArticleList.css';
import mockArticles from './mockArticles';
import { getArticles } from 'services/article-service';
import Article from './article/Article';
import Spinner from 'components/spinner/Spinner';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: null
        };
    }

    componentDidMount() {
        getArticles().then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                articles: data.results
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <section className="articles-wrapper">
                {
                    this.state.articles === null 
                    ? < Spinner /> 
                    : this.state.articles.length ?
                        this.state.articles.map((article) => {
                            return (
                                <Article data={article} key={article.id} />
                            );
                        }) : <h2>Sorry, currently there are no available articles.</h2>
                }
            </section>
        );
    }
}