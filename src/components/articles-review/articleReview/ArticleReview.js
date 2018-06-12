import React, { Component } from 'react';
import './ArticleReview.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import baseUrl from 'helpers/baseUrl';
import { getCurrentArticle } from 'actions';
import { fileValidation } from 'services/validation-service';
import { getArticleComments } from 'services/article-service';
import NotificationSystem from 'react-notification-system';
import {getDate,getYear,getMonthNumber} from 'helpers/date-helper';


class ArticleReview extends Component {

    constructor(props) {
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
            },
            content: "",
            file: null,
            fieldsValid: {
                content: null
            },
            comments: []
        }

    }

    _addNotification = (message, status) => {

        this._notificationSystem.addNotification({
            message: message,
            level: status,
            autoDismiss: 20
        });
    };

    componentWillMount() {
        this.getCurrentArticle();
    }

    componentDidMount() {
        const userId = this.props.userInfo.id;
        this._notificationSystem = this.refs.notificationSystem;
        this.setState({
            ...this.state,
            commentReview: {
                ...this.state.commentReview,
                comment: {
                    ...this.state.commentReview.comment,
                    article: window.location.pathname.split('/')[2],
                    user: this.props.userInfo.id
                }
            }
        }, () => {
            const articleId = +this.state.commentReview.comment.article;
            if (articleId) {
                getArticleComments(articleId).then((response) => {
                    return response.json();
                }).then(data => {
                    if (data && data.length) {
                        let comments = this.state.comments;
                        comments = comments.concat(data).filter((comment => comment.user === userId));
                        this.setState({
                            comments
                        })
                    }
                })
            }
        })
    }

    getCurrentArticle() {
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

            let statusToSetDefault = 2;
            let number = data.number;

            if (data.number === 2 && data.stage === 1) {
                statusToSetDefault = 4;
            } else if (data.number === 2 && data.stage === 2) {
                statusToSetDefault = 5;
            }

            if (statusToSetDefault === 2) {
                number = ++number;
            } else {
                number = 0;
            }

            this.setState({
                ...this.state,
                commentReview: {
                    ...this.state.commentReview,
                    number: number,
                    status: statusToSetDefault
                }
            })
        }).catch(error => {
            console.log(error);
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

    handleFileUpload(e) {
        const self = this;
        const reader = new FileReader();
        const file = e.target.files[0];

        if (file) {

            this.setState({
                file,
                fieldsValid: { ...this.state.fieldsValid, content: fileValidation(file, 'pdf', 10) }
            })
            reader.onload = function () {
                const index = reader.result.indexOf("base64") + 7;
                const content = reader.result.slice(index);
                self.setState({
                    content
                })
            }
            reader.readAsDataURL(file);

            const fileLabelName = file.name.split("").map((letter, idx, letArr) => {
                if (idx > 10) {
                    return "";
                } else {
                    return letter;
                }
            }).join("") + "...";

            this.fileLabel.innerText = fileLabelName;
        }
    }

    sendReview = () => {

        if (this.state.commentReview.comment.text) {
            fetch(`${baseUrl}/articles/${this.state.commentReview.comment.article}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify(this.state.commentReview)
            })
                .then(response => {
                    return response.json();
                }).then(data => {
                    this.props.history.push('/articles-review');
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            this._addNotification('Fill all fields, please', 'error')
        }
    }

    sendToPublish = () => {

        if (this.state.file) {
            fetch(`${baseUrl}/articles/${this.state.commentReview.comment.article}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({ status: 6, content: this.state.content })
            }).then(response => {
                return response.json();
            }).then(data => {
                this.props.history.push('/articles-review');
            }).catch(error => {
                console.log(error);
            })
        } else {
            this._addNotification('Upload the file, please', 'error')
        }


    }

    render() {
        let articleInfo = this.props.articles.find(el => el.id == window.location.pathname.split('/')[2]);

        return (
            <section className="ArticleReview">

                <h3 style={{ marginBottom: "20px" }}>{this.props.currentArticle.name}</h3>
                <h4 style={{ marginBottom: "10px" }}>Description:</h4>
                <p>{this.props.currentArticle.description}</p>
                <h4 style={{ marginTop: "20px", marginBottom: "20px" }}>Key words : <span>{this.props.currentArticle.key_words}</span></h4>
                <object data={this.props.currentArticle.content} type="application/pdf" width="100%" height="500px">
                    alt: <a href={this.props.currentArticle.content}>It is article</a>
                </object>
                <div><a href={this.props.currentArticle.content} className="btn-review" target="_blank">Open in a new window</a></div>
                {
                    this.props.currentArticle.stage == 3 ?
                        <div style={{ marginTop: '35px', marginBottom: '30px' }}>
                            <h3>Download edited article</h3>
                            <div className="input-block">
                                <label className="input-file-name pointer"
                                    htmlFor="article"
                                    ref={(fileLabel) => this.fileLabel = fileLabel}>
                                    <i className="fa fa-upload"></i> Choose a file...
                                </label>
                                <input
                                    className="input-file"
                                    type="file"
                                    id="article"
                                    name="article"
                                    ref={(input) => { this.article = input }}
                                    onChange={this.handleFileUpload.bind(this)}
                                />
                                {this.state.fieldsValid.content === false ?
                                    <span className="hint-error hint-error-file">The file must be in pdf format and lower than 10 Mb</span> : null
                                }
                            </div>
                        </div>
                        :
                        <div>
                            
                            {
                                this.state.comments.length ?
                                    <div className="previousComments">
                                        <h3 className="label-textarea">Your previous comments about this article</h3>
                                        {
                                            this.state.comments.map((comment, id) => {
                                                return <p><b>{id + 1}.</b> {comment.text} - <b><i>{getDate(comment.date) + "/" + getMonthNumber(comment.date) + "/" +  getYear(comment.date)}</i></b></p>
                                            })
                                        }
                                    </div>
                                    : null
                            }
                            <h3 className="label-textarea">Comment and whishes about article</h3>
                            <div>
                                <textarea className="article-comments" onChange={this.onCommentChange.bind(this)}>
                                </textarea>
                            </div>
                            <h3 className="label-textarea">Change the status of article</h3>
                        </div>
                }

                {
                    this.props.currentArticle.stage == 1 ?
                        <div className="form__select">
                            <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                                {
                                    this.props.currentArticle.number !== 2 ?
                                        <option value="2">Send to rework</option>
                                        : null
                                }
                                <option value="4">Send to review</option>
                                <option value="3">Rejected</option>
                            </select>
                        </div> : this.props.currentArticle.stage == 2 ?
                            <div className="form__select">
                                <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                                    {
                                        this.props.currentArticle.number !== 2 ?
                                            <option value="2">Send to rework</option>
                                            : null
                                    }
                                    <option value="5">Send to editor</option>
                                    <option value="3">Rejected</option>
                                </select>
                            </div> : null
                }

                {this.props.currentArticle.stage == 3 ?
                    <button className="btn-review" onClick={this.sendToPublish.bind(this)}>Send to publish</button> :
                    <button className="btn-review" onClick={this.sendReview.bind(this)}>Save</button>
                }
                <NotificationSystem ref="notificationSystem" />
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        userInfo: state.user.model,
        articles: state.articles.data,
        stages: state.stages.data,
        currentArticle: state.articles.currentArticle
    };
};

const mapDispatchToProps = state => ({
    getCurrentArticle: getCurrentArticle(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleReview));


