import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './ArticleCreation.css';
import Spinner from 'components/spinner/Spinner';
import { connect } from 'react-redux';
import { createArticle, changeArticle } from 'services/article-service';
import { fileValidation, fieldLengthValidation, descriptionValidation } from 'services/validation-service';
import { translate } from 'react-i18next';

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
        this.changeArticleSubmit = this.changeArticleSubmit.bind(this);

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
            number: 0,
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
                collaborators: nextprops.article.collaborators,
                number: nextprops.article.number
            })
        }
    }

    changeArticleSubmit(e) {
        this.setState({
            fieldsValid: {
                name: fieldLengthValidation(this.state.name),
                description: descriptionValidation(this.state.description),
                content: fileValidation(this.state.file, 'pdf', 10),
                udc: fieldLengthValidation(this.state.udc),
                key_words: fieldLengthValidation(this.state.key_words)
            }
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
            if (this.props.article === undefined) {
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
                let changedArticle = this.getArticle();

                if (this.props.article.stage === 1) {
                    changedArticle.status = 1
                } else {
                    changedArticle.status = 4
                }
                changedArticle.id = this.props.article.id;
                
                changeArticle(changedArticle).then(() => this.props.history.replace('/articles-review'));
            }

        } else {
            this.setState({
                fieldsValid: {
                    name: fieldLengthValidation(this.state.name),
                    description: descriptionValidation(this.state.description),
                    content: fileValidation(this.state.file, 'pdf', 10),
                    udc: fieldLengthValidation(this.state.udc),
                    key_words: fieldLengthValidation(this.state.key_words)
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
            author: this.props.userInfo.id,
            number: this.state.number
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
        const { t } = this.props

        return (
            <section className="ArticleCreation">
                {this.props.article == undefined ?
                    <h1 className="section-heading">{t('articleCreation.fill')}</h1> :
                    <h1 className="section-heading">{t('articleCreation.change')}</h1>
                }

                <p className="times-to-submit">({t('articleCreation.left')}: <span>{3 - this.state.number}</span>)</p>

                <form className="form-wrapper" onSubmit={this.submitArticle}>
                    <div className="input-block">
                        <label className="input-name" htmlFor="name">{t('articleCreation.name')}:</label>
                        <input
                            className="input-field"
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        {this.state.fieldsValid.name === false ?
                            <span className="hint-error">{t('articleCreation.nameMust')}</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="theme">{t('articleCreation.topic')}:</label>
                        <select className="input-field select-field pointer" id="theme" name="language" value={this.state.theme} onChange={this.onThemeChange}>
                            <option value="it">{t('articleCreation.it')}</option>
                        </select>
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="udc">{t('articleCreation.udc')}:</label>
                        <input
                            className="input-field"
                            type="text"
                            id="udc"
                            name="udc"
                            value={this.state.udc}
                            onChange={this.onUdcChange}
                        />
                        {this.state.fieldsValid.udc === false ?
                            <span className="hint-error">{t('articleCreation.udcMust')}</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="language">{t('articleCreation.language')}:</label>
                        <select className="input-field select-field pointer" id="language" name="language" value={this.state.language} onChange={this.onLanguageChange}>
                            <option value="ua">{t('articleCreation.ua')}</option>
                            <option value="ru">{t('articleCreation.ru')}</option>
                            <option value="en">{t('articleCreation.en')}</option>
                            <option value="other">{t('articleCreation.other')}</option>
                        </select>
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="description">{t('articleCreation.description')}:</label>
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
                            <span className="hint-error hint-error-description">{t('articleCreation.descriptionMust')}</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="key_words">{t('articleCreation.keywords')}:</label>
                        <textarea
                            className="input-description"
                            type="text"
                            id="keyWords"
                            name="key_words"
                            value={this.state.key_words}
                            onChange={this.onKeyWordsChange}
                        />
                        {this.state.fieldsValid.key_words === false ?
                            <span className="hint-error hint-error-description">{t('articleCreation.keywordsMust')}</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-file-name pointer"
                            htmlFor="article"
                            ref={(fileLabel) => this.fileLabel = fileLabel}
                            >
                            <i className="fa fa-upload"></i> {t('articleCreation.file')}
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
                            <span className="hint-error hint-error-file">{t('articleCreation.fileMust')}</span> : null
                        }
                    </div>
                    {
                        this.props.article == undefined ?
                            <input type="submit" className="btn-submit pointer" value={t('articleCreation.submit')} /> :
                            <input type="submit" className="btn-submit pointer" value={t('articleCreation.submitChange')} onClick={this.changeArticleSubmit} />
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

export default translate('translations')(withRouter(connect(mapStateToProps, null)(ArticleCreation)));