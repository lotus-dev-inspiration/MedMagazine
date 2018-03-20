import React, { Component } from 'react';

import './Article.css';
import doctorImage from '../../../assests/img/article/doctor.png';

export default class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className="article-wrapper">
                <h2 className="article-heading">{this.props.data.theme}</h2>
                <div className="article-content">
                    {/* <div className="content-img-wrapper">
                        <img className="content-img" src={doctorImage} alt="article"/>
                    </div> */}
                    <div className="content-description-wrapper">
                        <p className="content-description">
                        {this.props.data.content}
                        </p>
                    </div>
                </div>
                <div className="article-info">
                    <div className="info-text">
                        <span className="info-text-date">{this.props.data.date}</span>
                        <span className="info-text-author">{this.props.data.author}</span>
                    </div>
                    <button className="info-read-more">
                        Read More
                    </button>
                </div>
            </article>
        );
    }
}