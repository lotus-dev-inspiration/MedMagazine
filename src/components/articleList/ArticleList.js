import React, { Component } from 'react';
import ScrollableAchor from 'react-scrollable-anchor';

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
                            <React.Fragment>
                                <h1 className="journal-name">{this.props.magazineName}</h1>  
                                {
                                    this.props.articles.map((article) => {
                                        return (
                                            <ScrollableAchor id={article.id}>
                                                <Article data={article} key={article.id} />
                                            </ScrollableAchor>
                                        );
                                    }) 
                                }
                            </React.Fragment>
                            : <h2>Sorry, currently there are no available articles.</h2>
                    }
                </section>
        );
    }
}