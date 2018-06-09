import React, { Component } from 'react';
import './ArticleView.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ArticleView extends Component {

    render() {
        let time = new Date(Date.parse(this.props.data.date));
        let stages = this.props.stages[0].statuses.concat(this.props.stages[1].statuses, this.props.stages[2].statuses);

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
                    <h3 className="article-direction">Direction: {this.props.data.theme}</h3>
                    <p className="article-description">{this.props.data.description}</p>
                    <p className="article-status">Article status :&nbsp;
                        <span className="article-status-changed">
                            {stages
                                .find(el => el.id == this.props.data.status).name
                            }
                        </span>
                    </p>
                    {this.props.data.status == 2 && this.props.userInfo.groups.length == 0 && this.props.data.can_edit ?
                        <Link to={`/article-info/${this.props.data.id}`} >
                            <button className="btn-review">Open</button>
                        </Link> :
                        this.props.data.status == 4 && this.props.userInfo.groups[0] == 1 ?
                            <Link to={`/articles-review/${this.props.data.id}`} >
                                <button className="btn-review">Review</button>
                            </Link> :
                            ((this.props.userInfo.groups[0] == 2 && (this.props.data.status == 1 && this.props.data.status == 5)) ||
                                this.props.userInfo.groups[0] == 2 && this.props.data.status == 5 ||
                                this.props.userInfo.groups[0] == 2 && this.props.data.status == 1) ?
                                <Link to={`/articles-review/${this.props.data.id}`} >
                                    <button className="btn-review">Review</button>
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

export default withRouter(connect(mapStateToProps, null)(ArticleView));