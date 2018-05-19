import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './ArticleCreation.css';
import Spinner from 'components/spinner/Spinner';

import { createArticle } from 'services/article-service';
import { fileValidation, fieldLengthValidation, descriptionValidation} from 'services/validation-service';

class ArticleCreation extends Component {
    constructor(props) {
        super(props);
        this.submitArticle = this.submitArticle.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onThemeChange = this.onThemeChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);

        this.state = {
            name: "",
            theme: "it",
            description: "",
            language: "ua",
            content: "",
            udc: "testing",
            key_words: "test",
            collaborators: "Petya",
            file: null,
            isArticleLoading: false,
            fieldsValid: {
                name: null,
                description: null,
                content: null
            }
        }

    }

    submitArticle(e) {
        e.preventDefault();

        const dataValidated = !Object.values(this.state.fieldsValid).some(field => {
            return field !== true;
        });

        if(dataValidated) {
            const article = this.getArticle();
            this.setState({
                isArticleLoading: true
            });
            createArticle(article).then((response) => {
                return response.json();
            }).then(data => {
                this.setState({
                    isArticleLoading: false
                });
                this.props.history.replace('/account');
            }).catch((error) => {
                this.setState({
                    isArticleLoading: false
                });
                console.log(error);
            });
        } else {
            this.setState({
                fieldsValid: {
                    name: fieldLengthValidation(this.state.name),
                    description: descriptionValidation(this.state.description),
                    content: fileValidation(this.state.file,'pdf', 10)
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
            author: this.props.user.model.id
        }
        return article;
    }

    handleFileUpload(e) {
        const self = this;
        const reader = new FileReader();
        const file = e.target.files[0]; 
        
        if(file) {

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
                if(idx > 10) {
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

    onLanguageChange(event) {
        this.setState({
            language: event.target.value
        })
    }

    render() {
        return (
            <section className="ArticleCreation">
                <h1 className="section-heading">Fill and submit your article</h1>
                <form className="form-wrapper" onSubmit={this.submitArticle}>
                    <div className="input-block">
                        <label className="input-name" htmlFor="name">Name</label>
                        <input
                            className="input-field"
                            type="text"
                            id="name"
                            name="name"
                            value = {this.state.name}
                            onChange={this.onNameChange}
                            />
                        {this.state.fieldsValid.name === false ?
                            <span className="hint-error">Name must be 3 symbols minimal</span> : null
                        }
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="theme">Topic</label>
                        <select className="input-field select-field pointer" id="theme" name="language" value={this.state.theme} onChange={this.onThemeChange}>
                            <option value="electronics">Electronics</option>
                            <option value="it">Information technology</option>
                            <option value="medicine">Medicine</option>
                            <option value="physics">Physics</option>
                            <option value="math">Mathematics</option>
                            <option value="other">Other...</option>
                        </select>
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
                            onChange={this.handleFileUpload}
                            />
                        {this.state.fieldsValid.content === false ?
                            <span className="hint-error hint-error-file">The file must be in pdf format and lower than 10 Mb</span> : null
                        }
                    </div>
                    <input type="submit" className="btn-submit pointer" value="Submit article" />
                </form>
                {this.state.isArticleLoading ? <Spinner /> : null}
            </section>
        )
    }
}

export default withRouter(ArticleCreation);