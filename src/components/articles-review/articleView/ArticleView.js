import React, {Component} from 'react';
import './ArticleView.css';
import '../articlesReview.js';
import {Link} from 'react-router-dom';

class ArticleView extends Component{

    render(){
        let time = new Date(Date.parse(this.props.data.date));
        console.log(this.props.stages);
        return(
            <section className="ArticleView">
                <div className="article-data">
                    <span>{time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}/
                    {time.getMonth()+1 < 10 ? `0${time.getMonth()+1}` : time.getMonth()}/
                    {time.getFullYear()}</span>
                    <p>{time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:
                    {time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}</p>
                </div>
                <div>
                    <h2 className="article-theme">{this.props.data.name}</h2>
                   <h3 className="article-theme">{this.props.data.theme}</h3>
                   <p className="article-description">{this.props.data.description}</p>
                   {/* <p className="article-status">Article status : 
                        <span className="article-status-changed">
                            {this.props.stages
                                .find(el => el.stage == this.props.data.stage).statuses
                                .find(el => el.id == this.props.data.status).name}
                        </span>
                    </p> */}
                   <Link to={{ pathname: `/articles-review/${this.props.data.id}`, state: {info: this.props}}}>
                        <button className="btn-review">Review</button>
                    </Link>
                </div>
            </section>
        )
    }
}

export default ArticleView;