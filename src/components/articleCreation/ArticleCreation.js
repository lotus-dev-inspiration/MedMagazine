import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './ArticleCreation.css';
import Spinner from 'components/spinner/Spinner';
import { connect } from 'react-redux';
import { createArticle } from 'services/article-service';
import { fileValidation, fieldLengthValidation, descriptionValidation } from 'services/validation-service';
import baseUrl from 'helpers/baseUrl';

class ArticleCreation extends Component {
    constructor(props) {
        super(props);
        this.submitArticle = this.submitArticle.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onThemeChange = this.onThemeChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onUdcChange = this.onUdcChange.bind(this);
        this.onKeyWordsChange = this.onKeyWordsChange.bind(this);

        this.state = {
            name: "",
            theme: "it",
            description: "",
            language: "ua",
            content: "",
            udc: "",
            key_words: "",
            collaborators: "Petya",
            file: null,
            isArticleLoading: false,
            fieldsValid: {
                name: null,
                description: null,
                content: null,
                udc: null,
                key_words: null
            }
        }

    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.article) {
            this.setState({
                name: nextprops.article.name,
                theme: nextprops.article.theme,
                description: nextprops.article.description,
                language: nextprops.article.language,
                content: nextprops.article.content,
                udc: nextprops.article.udc,
                key_words: nextprops.article.key_words,
                collaborators: nextprops.article.collaborators
            })
        }
    }

    changeArticle(article) {
        fetch(`${baseUrl}/articles/${this.props.article.id}/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(article)
        })
    }

    submitArticle(e) {
        e.preventDefault();

        const dataValidated = !Object.values(this.state.fieldsValid).some(field => {
            return field !== true;
        });

        if (dataValidated) {
            const article = this.getArticle();
            this.setState({
                isArticleLoading: true
            });
            if (this.props.article == undefined) {
                createArticle(article).then((response) => {
                    return response.json();
                }).then(data => {
                    this.setState({
                        isArticleLoading: false
                    });
                    this.props.history.replace('/articles-review');
                }).catch((error) => {
                    this.setState({
                        isArticleLoading: false
                    });
                    console.log(error);
                });
            } else {
                let changeArticle = this.getArticle();
                if (this.props.article.stage == 1) {
                    changeArticle.status = 1
                } else {
                    changeArticle.status = 4
                }
                this.changeArticle(changeArticle);
                this.props.history.replace('/articles-review');
            }

        } else {
            this.setState({
                fieldsValid: {
                    name: fieldLengthValidation(this.state.name),
                    description: descriptionValidation(this.state.description),
                    content: fileValidation(this.state.file, 'pdf', 10)
                }
            })
        }
    }

    getArticle() {
        const article = {
            name: this.state.name,
            theme: this.state.theme,
            description: this.state.description,
            content: this.state.content,
            language: this.state.language,
            udc: this.state.udc,
            key_words: this.state.key_words,
            collaborators: this.state.collaborators,
            author: this.props.userInfo.id
        }
        return article;
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

    onNameChange(event) {
        const name = event.target.value;
        this.setState({
            name,
            fieldsValid: { ...this.state.fieldsValid, name: fieldLengthValidation(event.target.value) }
        })
    }

    onUdcChange(event) {
        const udc = event.target.value;
        this.setState({
            udc,
            fieldsValid: { ...this.state.fieldsValid, udc: fieldLengthValidation(event.target.value) }
        })
    }

    onThemeChange(event) {
        this.setState({
            theme: event.target.value
        })
    }

    onDescriptionChange(event) {
        const description = event.target.value;
        this.setState({
            description,
            fieldsValid: { ...this.state.fieldsValid, description: descriptionValidation(description) }
        })
    }

    onKeyWordsChange(event) {
        const key_words = event.target.value;
        this.setState({
            key_words,
            fieldsValid: { ...this.state.fieldsValid, key_words: fieldLengthValidation(event.target.value) }
        })
    }

    onLanguageChange(event) {
        this.setState({
            language: event.target.value
        })
    }

    render() {
        return (
            <section className="ArticleCreation">
                {this.props.article == undefined ?
                    <h1 className="section-heading">Fill and submit your article</h1> :
                    <h1 className="section-heading">Change and submit your article</h1>
                }

                <form className="form-wrapper" onSubmit={this.submitArticle}>
                    <div className="input-block">
                        <label className="input-name" htmlFor="name">Name</label>
                        <input
                            className="input-field"
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        {this.state.fieldsValid.name === false ?
                            <span className="hint-error">Name must be 3 symbols minimal</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="theme">Topic</label>
                        <select className="input-field select-field pointer" id="theme" name="language" value={this.state.theme} onChange={this.onThemeChange}>
                            <option value="it">Information technology</option>
                        </select>
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="udc">UDC</label>
                        <input
                            className="input-field"
                            type="text"
                            id="udc"
                            name="udc"
                            value={this.state.udc}
                            onChange={this.onUdcChange}
                        />
                        {this.state.fieldsValid.udc === false ?
                            <span className="hint-error">UDC must be 3 symbols minimal</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="language">Language</label>
                        <select className="input-field select-field pointer" id="language" name="language" value={this.state.language} onChange={this.onLanguageChange}>
                            <option value="ua">Ukrainian</option>
                            <option value="ru">Russian</option>
                            <option value="en">English</option>
                            <option value="other">Other...</option>
                        </select>
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="description">Description</label>
                        <textarea
                            className="input-description"
                            type="text"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                            maxLength="3000"
                        />
                        {this.state.fieldsValid.description === false ?
                            <span className="hint-error hint-error-description">Description must be more than 500 symbols</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="key_words">Key words</label>
                        <textarea
                            className="input-description"
                            type="text"
                            id="keyWords"
                            name="key_words"
                            value={this.state.key_words}
                            onChange={this.onKeyWordsChange}
                        />
                        {this.state.fieldsValid.key_words === false ?
                            <span className="hint-error hint-error-description">Key words must be 3 symbols minimal</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-file-name pointer"
                            htmlFor="article"
                            ref={(fileLabel) => this.fileLabel = fileLabel}
                            >
                            <i className="fa fa-upload"></i> Choose a file...
                        </label>
                        <input
                            className="input-file"
                            type="file"
                            id="article"
                            name="article"
                            ref={(input) => { this.article = input }}
                            onChange={this.handleFileUpload}
                        />
                        {this.state.fieldsValid.content === false ?
                            <span className="hint-error hint-error-file">The file must be in pdf format and lower than 10 Mb</span> : null
                        }
                    </div>
                    {this.props.article == undefined ?
                        <input type="submit" className="btn-submit pointer" value="Submit article" /> :
                        <input type="submit" className="btn-submit pointer" value="Change article" />
                    }

                </form>
                {this.state.isArticleLoading ? <Spinner /> : null}
            </section>
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

export default withRouter(connect(mapStateToProps, null)(ArticleCreation));