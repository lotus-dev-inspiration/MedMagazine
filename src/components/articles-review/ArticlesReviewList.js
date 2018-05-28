import React, {Component} from 'react';
import docs from 'assets/docs/article-review/test.pdf';
import './ArticlesReviewList.css';
import articles from './articlesReview.js';
import ArticleView from './articleView/ArticleView';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getReviewArticles, getStages} from 'actions';
import baseUrl from 'helpers/baseUrl';


class ArticleReview extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.getReviewArticles();
        this.getStages();
    }

    getReviewArticles(){
        fetch(`${baseUrl}/users/${this.props.userInfo.id}/articles`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
                return response.json();
            }).then(data => {
                this.props.getReviewArticles(data);
            }).catch(error => {
                console.log(error);
            })
    }

    getStages(){
        fetch(`${baseUrl}/stages`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
                return response.json();
            }).then(data => {
                this.props.getStages(data.objects);
            }).catch(error => {
                console.log(error);
            })
    }

    render(){
        
        return(
            <section className="ArticlesReviewList">
            {this.props.userInfo.groups.length === 0 ? 
                <h1 className="header">My articles</h1> : 
                <h1 className="header">Articles, which wait review</h1>
            }
              {
                  this.props.articles.length !== 0 && this.props.stages.length !== 0 ?
                  <div>
                   {
                       this.props.articles.map((article) => {
                           return(
                               <ArticleView data={article} key={article.id} />
                           )
                       })
                   }
               </div> : null
              }
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

const mapDispatchToProps = state => ({
    getReviewArticles: getReviewArticles(state),
    getStages: getStages(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleReview));