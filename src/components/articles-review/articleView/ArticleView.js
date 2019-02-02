import React, { Component } from 'react';
import './ArticleView.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';


class ArticleView extends Component {

    render() {
        const { t, i18n } = this.props
        let time = new Date(Date.parse(this.props.data.date));
        let stages = this.props.stages[0].statuses.concat(this.props.stages[1].statuses, this.props.stages[2].statuses);
        let currentLanguage = i18n.language;

        const statuses = {
            'en': {
                "Editing": "Editing",
                "Published": "Published",
                "Waiting for publication": "Waiting for publication",
                "Rejected": "Rejected",
                "Checking": "Checking",
                "Needed rework": "Needed rework",
                "Reviewing": "Reviewing" 
            },
            'ua': {
                "Editing": "На редагуванні",
                "Published": "Опубліковано",
                "Waiting for publication": "Очікує на публікацію",
                "Rejected": "Відхилено",
                "Checking": "На перевірці",
                "Needed rework": "На доопрацюванні",
                "Reviewing": "На рецензуванні" 
            }
        }

        let status = stages.find(el => el.id == this.props.data.status);
        if(status) {
            status = status.name;
        } else {
            status = 'Published';
        }
        
        // const statusToShow = statuses[currentLanguage][status];

        return (
            <section className="ArticleView">
                <div className="article-data">
                    <span>{time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}/
                    {time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth()}/
                    {time.getFullYear()}</span>
                    <p>{time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:
                    {time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}</p>
                </div>
                <div>
                    <h2 className="article-theme">{this.props.data.name}</h2>
                    <h3 className="article-direction">{t('articleView.direction')}: {this.props.data.theme}</h3>
                    <p className="article-description">{this.props.data.description}</p>
                    <p className="article-status">{t('articleView.status')}:&nbsp;
                        <span className="article-status-changed">
                            {
                                status
                            }
                        </span>
                    </p>
                    {this.props.data.status == 2 && this.props.userInfo.groups.length == 0 && this.props.data.can_edit ?
                        <Link to={`/article-info/${this.props.data.id}`} >
                            <button className="btn-review">{t('articleView.open')}</button>
                        </Link> :
                        this.props.data.status == 4 && this.props.userInfo.groups[0] == 1 ?
                            <Link to={`/articles-review/${this.props.data.id}`} >
                                <button className="btn-review">{t('articleView.review')}</button>
                            </Link> :
                            ((this.props.userInfo.groups[0] == 2 && (this.props.data.status == 1 && this.props.data.status == 5)) ||
                                this.props.userInfo.groups[0] == 2 && this.props.data.status == 5 ||
                                this.props.userInfo.groups[0] == 2 && this.props.data.status == 1) ?
                                <Link to={`/articles-review/${this.props.data.id}`} >
                                    <button className="btn-review">{t('articleView.review')}</button>
                                </Link> : null
                    }

                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        userInfo: state.user.model,
        articles: state.articles.data,
        stages: state.stages.data
    };
};

export default translate('translations')(withRouter(connect(mapStateToProps, null)(ArticleView)));