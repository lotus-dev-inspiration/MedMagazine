import React, { Component } from 'react';

import './Article.css';

export default class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                        Read More
                        </a>
                        : <a target="_blank" href={"http://127.0.0.1:8000" + this.props.data.content} className="info-read-more">
                        Read More
                        </a>
                    }

                    
                </div>
            </article>
        );
    }
}