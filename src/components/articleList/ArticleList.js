import React, { Component } from 'react';

import './ArticleList.css';
import mockArticles from './mockArticles';
import Article from './article/Article';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: mockArticles
        };
    }

    render() {
        return (
            <div>
                <section className="articles-wrapper">
                {
                    this.state.articles.map((article) => {
                        return (
                            <Article data={article} key={article.id} />
                        );
                    })
                }
                </section>
            </div>
        );
    }
}