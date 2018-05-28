import React, {Component} from 'react';
import ArticleCreation from 'components/articleCreation/ArticleCreation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import baseUrl from 'helpers/baseUrl';
import './ArticleInfo.css';
import {getComments, getCurrentArticle} from 'actions';

class ArticleInfo extends Component {

    componentWillMount(){
        this.getComments();
        this.getCurrentArticle();
    }

    getComments(){
        fetch(`${baseUrl}/articles/${window.location.pathname.split('/')[2]}/comments`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
                return response.json();
            }).then(data => {
                this.props.getComments(data);
            }).catch(error => {
                console.log(error);
            })
    }

    getCurrentArticle(){
        fetch(`${baseUrl}/articles/${window.location.pathname.split('/')[2]}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
                return response.json();
            }).then(data => {
                this.props.getCurrentArticle(data);
            }).catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <div className="ArticleInfo">
                <div className="article-comments">
                    <h3>Comments</h3>
                    {this.props.comments.map(el => {
                        return <p className="comment-item">{el.text}</p>
                    })
                    }
                </div>
                <div className="article-change-wrapper">
                    <ArticleCreation article={this.props.currentArticle} userInfoId={this.props.userInfo.id} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.model,
        articles: state.articles.data,
        stages: state.stages.data,
        comments: state.articles.comments,
        currentArticle: state.articles.currentArticle
    };
};

const mapDispatchToProps = state => ({
    getComments: getComments(state),
    getCurrentArticle: getCurrentArticle(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleInfo));