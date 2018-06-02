import React, { Component } from 'react';
import './ArticleReview.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import baseUrl from 'helpers/baseUrl';
import { Link } from 'react-router-dom';
import { getCurrentArticle } from 'actions';
import { fileValidation} from 'services/validation-service';

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
            }
        }
    }

    componentWillMount() {
        this.getCurrentArticle();
    }

    componentDidMount() {
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

    sendToPublish = () => {
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
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
        
    }

    render() {
        let articleInfo = this.props.articles.find(el => el.id == window.location.pathname.split('/')[2]);

        return (
            <section className="ArticleReview">

                <object data={this.props.currentArticle.content} type="application/pdf" width="100%" height="500px">
                    alt: <a href={this.props.currentArticle.content}>It is article</a>
                </object>
                <div><a href={this.props.currentArticle.content} className="btn-review" target="_blank">Open in new window</a></div>
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
                                <option value="2">Send to rework</option>
                                <option value="4">Send to review</option>
                                <option value="3">Rejected</option>
                            </select>
                        </div> : this.props.currentArticle.stage == 2 ?
                            <div className="form__select">
                                <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                                    <option value="5">Send to editor</option>
                                    <option value="2">Send to rework</option>
                                    <option value="3">Rejected</option>
                                </select>
                            </div> : null
                }

                {this.props.currentArticle.stage == 3 ?
                    <Link to="/articles-review/"><button className="btn-review" onClick={this.sendToPublish.bind(this)}>Send to publish</button></Link> :
                    <Link to="/articles-review/"><button className="btn-review" onClick={this.sendReview.bind(this)}>Save</button></Link>
                }
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


