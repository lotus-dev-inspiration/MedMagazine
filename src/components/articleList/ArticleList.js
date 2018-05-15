import React, { Component } from 'react';

import './ArticleList.css';
import Article from './article/Article';


export default class ArticleList extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <section className="articles-wrapper">
                {
                    this.props.articles.length ?
                        this.props.articles.map((article) => {
                            return (
                                <Article data={article} key={article.id} />
                            );
                        }) : <h2>Sorry, currently there are no available articles.</h2>
                }
            </section>
        );
    }
}