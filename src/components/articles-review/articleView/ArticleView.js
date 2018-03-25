import React, {Component} from 'react';
import './ArticleView.css';
import '../articlesReview.js';
import {Link} from 'react-router-dom';

class ArticleView extends Component{
    render(){
        return(
            <section className="ArticleView">
                {/* <h1 className="heading">Article</h1> */}
                <div className="article-data"><span>{this.props.data.date}</span></div>
                <div>
                   <h3 className="article-theme">{this.props.data.theme}</h3>
                   <p className="article-description">{this.props.data.description}</p>
                   <p className="article-status">Article status : <span className="article-status-changed">{this.props.data.status}</span></p>
                   <Link to={`/articles-review/${this.props.data.id}`}><button className="btn-review">Review</button></Link>
                </div>
            </section>
        )
    }
}

export default ArticleView;