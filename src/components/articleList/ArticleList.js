import React, { Component } from 'react';
import ScrollableAchor from 'react-scrollable-anchor';
import { translate } from 'react-i18next';

import './ArticleList.css';
import Article from './article/Article';



class ArticleList extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { t } = this.props

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
                        : <h2>{t('articleList.sorry')}</h2>
                    }
                </section>
        );
    }
}

export default translate('translations') (ArticleList);