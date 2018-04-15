import React, { Component } from 'react';
import './ArticleCreation.css';

import { createArticle } from 'services/article-service';

class ArticleCreation extends Component {
    constructor(props) {
        super(props);
        this.submitArticle = this.submitArticle.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    submitArticle(e) {
        e.preventDefault();
        // const article = this.getArticle();
        // createArticle(article).then((response) => {
        //     return response.json();
        // }).then(data => {
        //     console.log(data);
        // }).catch((error) => {
        //     console.log(error);
        // }); 
        console.log(this.article.files[0]);
    }

    getArticle() {
        const article = {
            name: this.name.value,
            theme: this.theme.value,
            description: this.description.value,
            content: this.content.value,
            author: this.props.user.model.id,
            reviewers: [1],
            status: "Uploaded"
        }
        return article;
    }

    handleFileUpload(e) {
        const file = e.target.files[0]; 
        if(file) {
            if(file.size > 10000) {
                console.log("The file must be no more than 5 Mb");
                return false;
            }
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
                            ref={(input) => { this.name = input }}
                            required />
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="theme">Topic</label>
                        <input
                            className="input-field"
                            type="text"
                            id="theme"
                            name="theme"
                            ref={(input) => { this.theme = input }}
                            required />
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="description">Description</label>
                        <input
                            className="input-field"
                            type="text"
                            id="description"
                            name="description"
                            ref={(input) => { this.description = input }}
                            required />
                    </div>
                    <div className="input-block">
                        <label className="input-name" htmlFor="content">Content</label>
                        <input
                            className="input-field"
                            type="text"
                            id="content"
                            name="content"
                            ref={(input) => { this.content = input }}
                            required />
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
            </section>
        )
    }
}

export default ArticleCreation;