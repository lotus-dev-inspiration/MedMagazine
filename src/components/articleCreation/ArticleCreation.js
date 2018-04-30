import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './ArticleCreation.css';
import Spinner from 'components/spinner/Spinner';

import { createArticle } from 'services/article-service';

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
            isArticleLoading: false
        }
    }

    submitArticle(e) {
        e.preventDefault();
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
    }

    getArticle() {
        const article = {
            name: this.state.name,
            theme: this.state.theme,
            description: this.state.description,
            content: this.state.content,
            language: this.state.language,
            author: this.props.user.model.id
        }
        return article;
    }

    handleFileUpload(e) {
        const self = this;
        const reader = new FileReader();
        const file = e.target.files[0]; 
        
        if(file) {
            // if(file.size > 10000000) {
            //     console.log("The file must be no more than 5 Mb");
            //     return;
            // }
            // if(!file.type.includes("pdf")) {
            //     console.log("The file must be in pdf format");
            //     return;
            // }

            reader.onload = function () {
                const index = reader.result.indexOf("base64") + 7;
                const content = reader.result.slice(index);
                self.setState({
                    content: content
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
        this.setState({
            name: event.target.value
        })
    }

    onThemeChange(event) {
        this.setState({
            theme: event.target.value
        })
    }

    onDescriptionChange(event) {
        this.setState({
            description: event.target.value
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
                            required />
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
                            className=""
                            type="text"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                            maxLength="3000"
                            required 
                            />
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
                            required />
                    </div>
                    <input type="submit" className="btn-submit pointer" value="Submit article" />
                </form>
                {this.state.isArticleLoading ? <Spinner /> : null}
            </section>
        )
    }
}

export default withRouter(ArticleCreation);