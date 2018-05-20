import React, {Component} from 'react';
import docs from 'assets/docs/article-review/test.pdf';
import './ArticlesReviewList.css';
import articles from './articlesReview.js';
import ArticleView from './articleView/ArticleView';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import baseUrl from 'helpers/baseUrl';


class ArticleReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            articlesReview: null,
            stages: null
        }
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
                this.setState({
                    ...this.state,
                    articlesReview: data
                })
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
                console.log(data);
                this.setState({
                    ...this.state,
                    stages: data.objects
                })
            }).catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <section className="ArticlesReviewList">
              <h1 className="header">Articles, which wait review</h1>
              {
                  this.state.articlesReview !== null && this.state.stages !== null ?
                  <div>
                   {
                       this.state.articlesReview.map((article) => {
                           return(
                               <ArticleView data={article} key={article.id} stages={this.state.stages} />
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
        userInfo: state.user.model
    };
};

export default withRouter(connect(mapStateToProps, null)(ArticleReview));