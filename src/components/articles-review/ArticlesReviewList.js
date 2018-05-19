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
            articlesReview: articles 
        }
    }

    componentDidMount(){
        console.log(this.props);
        fetch(`${baseUrl}/users/${this.props.userInfo.id}/articles`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <section className="ArticlesReviewList">
              <h1 className="header">Articles, which wait review</h1>
        
               <div>
                   {
                       this.state.articlesReview.map((article) => {
                           return(
                               <ArticleView data={article} key={article.id} />
                           )
                       })
                   }
               </div>
              {/* <object data={docs} type="application/pdf" width="100%" height="450px">
                    alt: <a href={docs}>It is article</a>
              </object>
              <p> <a href={docs} target="_blank">Open file</a></p>  */}
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