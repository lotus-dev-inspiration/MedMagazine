import React, { Component } from 'react';
import './ArticleReview.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import baseUrl from 'helpers/baseUrl';
import { getCurrentArticle } from 'actions';
import { fileValidation } from 'services/validation-service';
import { getArticleComments } from 'services/article-service';
import NotificationSystem from 'react-notification-system';
import { getDate, getYear, getMonthNumber } from 'helpers/date-helper';
import { translate } from 'react-i18next';


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

    // reviewComment = `${this.relevance.value}`;

    test = () => {
        console.log(this.relevance.value);
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

            if (data.number === 2 && data.stage === 1) {
                statusToSetDefault = 4;
            } else if (data.number === 2 && data.stage === 2) {
                statusToSetDefault = 5;
            }

            this.setState({
                ...this.state,
                commentReview: {
                    ...this.state.commentReview,
                    status: statusToSetDefault,
                    number: data.number
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

        let reviewComment = '';
        if (this.props.userInfo.groups[0] === 1) {
            if (this.novelty.value === "" || this.relevance.value === "" || this.methods.value === "" || this.theoria.value === "" || this.practical.value === "" || this.literature.value === "" || this.wish.value === "") {
                this._addNotification('Fill all fields, please', 'error');
            } else {
                reviewComment = `${this.props.t('articleReview.relevanceProblem')}: ${this.relevance.value};
            ${this.props.t('articleReview.novelty')}: ${this.novelty.value};
            ${this.props.t('articleReview.usedResearchMethods')}: ${this.methods.value};
            ${this.props.t('articleReview.theoretical')}: ${this.theoria.value};
            ${this.props.t('articleReview.practical')}: ${this.practical.value};
            ${this.props.t('articleReview.levelLiterature')}: ${this.literature.value};
            ${this.wish.value}`;

            }
        } else if (this.props.userInfo.groups[0] === 2 && this.props.currentArticle.stage == 1) {

            if (this.design.value === "" || this.conclusion.value === "" || this.quality.value === "") {
                this._addNotification('Fill all fields, please', 'error');
            } else {
                reviewComment = ` 
            ${this.props.t('articleReview.design')}: ${this.design.value};
            ${this.props.t('articleReview.conclusion')}: ${this.conclusion.value};
            ${this.props.t('articleReview.quality')}: ${this.quality.value};
            ${this.wish.value}`;

            }
        }
        this.state.commentReview.comment.text = reviewComment;

        let number = this.state.commentReview.number;
        if (this.state.commentReview.status !== 2) {
            number = 0;
        } else {
            number = ++number;
        }
        this.setState({
            ...this.state,
            commentReview: {
                ...this.state.commentReview,
                number
            }
        }, () => {
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
        });
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
        const { t } = this.props;
        let articleInfo = this.props.articles.find(el => el.id == window.location.pathname.split('/')[2]);

        return (
            <section className="ArticleReview">

                <h3 style={{ marginBottom: "20px" }}>{this.props.currentArticle.name}</h3>
                <h4 style={{ marginBottom: "10px" }}>{t('articleReview.description')}:</h4>
                <p>{this.props.currentArticle.description}</p>
                <h4 style={{ marginTop: "20px", marginBottom: "20px" }}>{t('articleReview.keywords')} : <span>{this.props.currentArticle.key_words}</span></h4>
                <object data={this.props.currentArticle.content} type="application/pdf" width="100%" height="500px">
                    alt: <a href={this.props.currentArticle.content}>It is article</a>
                </object>
                <div><a href={this.props.currentArticle.content} className="btn-review" target="_blank">{t('articleReview.open')}</a></div>
                {
                    this.props.currentArticle.stage == 3 ?
                        <div style={{ marginTop: '35px', marginBottom: '30px' }}>
                            <h3>{t('articleReview.upload')}</h3>
                            <div className="input-block">
                                <label className="input-file-name pointer"
                                    htmlFor="article"
                                    ref={(fileLabel) => this.fileLabel = fileLabel}>
                                    <i className="fa fa-upload"></i> {t('articleReview.choose')}...
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
                                    <span className="hint-error hint-error-file">{t('articleReview.fileMust')}</span> : null
                                }
                            </div>
                        </div>
                        :
                        <div>

                            {
                                this.state.comments.length ?
                                    <div className="previousComments">
                                        <h3 className="label-textarea">{t('articleReview.previous')}</h3>
                                        {
                                            this.state.comments.map((comment, id) => {
                                                return <p><b>{id + 1}.</b> {comment.text} - <b><i>{getDate(comment.date) + "/" + getMonthNumber(comment.date) + "/" + getYear(comment.date)}</i></b></p>
                                            })
                                        }
                                    </div>
                                    : null
                            }
                            {this.props.userInfo.groups[0] === 1 ?
                                <React.Fragment>
                                    <h3 style={{ marginTop: '30px' }}>{t('articleReview.rateArticle')}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <div className="question">
                                            <div className="input-field-wrapper">
                                                <span className="input-heading">{t('articleReview.relevanceProblem')}</span>
                                                <div className="input-wrapper">
                                                    <input
                                                        className="input-field started"
                                                        type="text"
                                                        name="relevance"
                                                        ref={(input) => this.relevance = input}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="input-field-wrapper">
                                                <span className="input-heading">{t('articleReview.novelty')}</span>
                                                <div className="input-wrapper">
                                                    <input
                                                        className="input-field started"
                                                        type="text"
                                                        name="novelty"
                                                        ref={(input) => this.novelty = input}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="input-field-wrapper">
                                                <span className="input-heading">{t('articleReview.usedResearchMethods')}</span>
                                                <div className="input-wrapper">
                                                    <input
                                                        className="input-field started"
                                                        type="text"
                                                        name="methods"
                                                        ref={(input) => this.methods = input}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="input-field-wrapper">
                                                <span className="input-heading">{t('articleReview.theoretical')}</span>
                                                <div className="input-wrapper">
                                                    <input
                                                        className="input-field started"
                                                        type="text"
                                                        name="theoria"
                                                        ref={(input) => this.theoria = input}
                                                        required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="answer">
                                            <div className="input-field-wrapper">
                                                <span className="input-heading">{t('articleReview.practical')}</span>
                                                <div className="input-wrapper">
                                                    <input
                                                        className="input-field started"
                                                        type="text"
                                                        name="practical"
                                                        ref={(input) => this.practical = input}
                                                        required />
                                                </div>
                                            </div>
                                            <div className="input-field-wrapper">
                                                <span className="input-heading">{t('articleReview.levelLiterature')}</span>
                                                <div className="input-wrapper">
                                                    <input
                                                        className="input-field started"
                                                        type="text"
                                                        name="literature"
                                                        ref={(input) => this.literature = input}
                                                        required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment> : (this.props.userInfo.groups[0] === 2 && this.props.currentArticle.stage === 1) ?
                                    <React.Fragment>
                                        <h3 style={{ marginTop: '30px' }}>{t('articleReview.rateArticle')}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <div className="question">
                                                <div className="input-field-wrapper">
                                                    <span className="input-heading">{t('articleReview.design')}</span>
                                                    <div className="input-wrapper">
                                                        <input
                                                            className="input-field started"
                                                            type="text"
                                                            name="design"
                                                            ref={(input) => this.design = input}
                                                            required />
                                                    </div>
                                                </div>
                                                <div className="input-field-wrapper">
                                                    <span className="input-heading">{t('articleReview.conclusion')}</span>
                                                    <div className="input-wrapper">
                                                        <input
                                                            className="input-field started"
                                                            type="text"
                                                            name="conclusion"
                                                            ref={(input) => this.conclusion = input}
                                                            required />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="answer">
                                                <div className="input-field-wrapper">
                                                    <span className="input-heading">{t('articleReview.quality')}</span>
                                                    <div className="input-wrapper">
                                                        <input
                                                            className="input-field started"
                                                            type="text"
                                                            name="quality"
                                                            ref={(input) => this.quality = input}
                                                            required />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </React.Fragment> : null
                            }
                            <h3 className="label-textarea">{t('articleReview.wishes')}</h3>
                            <div>
                                {/* <textarea className="article-comments" onChange={this.onCommentChange.bind(this)}>
                                </textarea> */}
                                <textarea className="article-comments" ref={(node) => this.wish = node}>
                                </textarea>
                            </div>
                            <h3 className="label-textarea">{t('articleReview.change')}</h3>
                        </div>
                }

                {
                    this.props.currentArticle.stage == 1 ?
                        <div className="form__select">
                            <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                                {
                                    this.props.currentArticle.number !== 2 ?
                                        <option value="2">{t('articleReview.rework')}</option>
                                        : null
                                }
                                <option value="4">{t('articleReview.review')}</option>
                                <option value="3">{t('articleReview.rejected')}</option>
                            </select>
                        </div> : this.props.currentArticle.stage == 2 ?
                            <div className="form__select">
                                <select name="select" value={this.state.commentReview.status} onChange={this.onStatusChange.bind(this)}>
                                    {/* {
                                        this.props.currentArticle.number !== 2 ?
                                            <option value="2">Send to rework</option>
                                            : null
                                    } */}
                                    <option value="2">{t('articleReview.rework')}</option>
                                    <option value="5">{t('articleReview.editor')}</option>
                                    <option value="3">{t('articleReview.rejected')}</option>
                                </select>
                            </div> : null
                }

                {this.props.currentArticle.stage == 3 ?
                    <button className="btn-review" onClick={this.sendToPublish.bind(this)}>{t('articleReview.publish')}</button> :
                    <button className="btn-review" onClick={this.sendReview.bind(this)}>{t('articleReview.save')}</button>
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

export default translate('translations')(withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleReview)));


