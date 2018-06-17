import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';

import {Link, Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './MagazineContent.css';

class MagazineContent extends Component {
    constructor() {
        super();

        this.contentClasses = ['MagazineContent', 'hide'];
        this.angleClasses = ['fa', 'fa-angle-right'];
        this.state = {
            isContentOpened: false
        }

        this.showContent = this.showContent.bind(this);
    }

    showContent() {
        if(this.state.isContentOpened) {
            const index = this.contentClasses.findIndex((cssClass) => cssClass === 'show');
            this.contentClasses.splice(index, 1);
            this.angleClasses.splice(1, 1, 'fa-angle-right');
            this.ang
        } else {
            this.contentClasses.push('show');
            this.angleClasses.splice(1, 1, 'fa-angle-left');
        }
        this.setState((prevState) => ({
            isContentOpened: !prevState.isContentOpened
        })); 
    }

    render() {
        const { t } = this.props

        return (
            <section className={this.contentClasses.join(" ")}>
                <div className="content">
                    {
                        this.props.articles.map(article => {
                            return <a className="content-link" href={'#' + article.id}>
                                <span className="content-article">{article.name}</span>
                            </a>
                        })
                    }
                </div>
                <div onClick={this.showContent} className="arrow">
                    <span class="arrow-text">{t('content.content')}</span>
                    <i className={this.angleClasses.join(" ")}></i>   
                </div>
                
            </section>
        );
    }
}

export default translate('translations') (withRouter(MagazineContent));