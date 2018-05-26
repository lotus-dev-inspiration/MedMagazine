import React, { Component } from 'react';
import './ArticleReview.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import baseUrl from 'helpers/baseUrl';
import {Link} from 'react-router-dom';

class ArticleReview extends Component {

    constructor(props){
        super(props);

        this.state = {
            commentReview: {
                number: 1,
                status: 2,
                comment: {
                    user: "",
                    article: "",
                    text: ""
                }
            }
        }
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            commentReview: {
                ...this.state.commentReview,
                comment: {
                    ...this.state.commentReview.comment,
                    article: this.props.location.state.info.data.id,
                    user: this.props.userInfo.id
                }
            }
        })
    }

    onCommentChange = (event) => {
        this.setState({
            ...this.state,
            commentReview: {
                ...this.state.commentReview,
                comment: {
                    ...this.state.commentReview.comment,
                    text: event.target.value
                }
            }
        })
    }

    onStatusChange = (event) => {
        this.setState({
            ...this.state,
            commentReview: {
                ...this.state.commentReview,
                status: +event.target.value
            }
        })
    }

    sendReview = () => {
        console.log(this.state);
        fetch(`${baseUrl}/articles/${this.state.commentReview.comment.article}/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(this.state.commentReview)
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

    render() {
        let articleInfo = this.props.location.state.info.data;
        let stages = this.props.location.state.info.stages;
        
        // console.log(stages);

        return (
            <section className="ArticleReview">

                <object data={articleInfo.content} type="application/pdf" width="100%" height="500px">
                    alt: <a href={articleInfo.content}>It is article</a>
                </object>
                <div><a href={articleInfo.content} className="btn-review" target="_blank">Open in new window</a></div>
                <h3 className="label-textarea">Comment and whishes about article</h3>
                <div>
                    <textarea className="article-comments" onChange={this.onCommentChange.bind(this)}>
                    </textarea>
                </div>
                <h3 className="label-textarea">Change the status of article</h3>
                {
                    articleInfo.stage == 1 ?
                    <div className="form__select">
                        <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                            <option value="2">Send to rework</option>
                            <option value="4">Send to review</option>
                            <option value="3">Rejected</option>
                        </select>
                    </div> : articleInfo.stage == 2 ?
                    <div className="form__select">
                        <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                            <option value="5">Send to edit</option>
                            <option value="2">Send to rework</option>
                            <option value="3">Rejected</option>
                        </select>
                    </div> : 
                    <div className="form__select">
                        <select name="select">
                            <option value="1">Acceped</option>
                            <option value="2">Rejected</option>
                        </select>
                    </div>
                    
                }
                
                <Link to="/articles-review/"><button className="btn-review" onClick={this.sendReview.bind(this)}>Save</button></Link>
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


