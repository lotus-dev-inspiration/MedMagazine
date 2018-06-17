import React, { Component } from 'react';
import { translate } from 'react-i18next';


import './Article.css';

class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props

        return (
            <article className="Article">
                <h2 className="article-heading">{this.props.data.name}</h2>
                <div className="article-content">
                    <div className="content-description-wrapper">
                        <p className="content-description">
                        {this.props.data.description}
                        </p>
                    </div>
                </div>
                <div className="article-info">
                    <div className="info-text">
                        <span className="info-text-date">{new Date(this.props.data.date).toLocaleDateString()}</span>
                        <span className="info-text-author">{this.props.data.author_full_name}</span>
                    </div>
                    {
                        this.props.data.content.includes("http") 
                        ? <a target="_blank" href={this.props.data.content} className="info-read-more">
                        {t('article.readMore')}
                        </a>
                        : <a target="_blank" href={"http://127.0.0.1:8000" + this.props.data.content} className="info-read-more">
                        {t('article.readMore')}
                        </a>
                    }

                    
                </div>
            </article>
        );
    }
}

export default translate('translations')(Article);