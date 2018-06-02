import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ArticleList from 'components/articleList/ArticleList';
import { getArticles } from 'services/article-service';
import { getMagazine } from 'services/magazine-service';
import Spinner from 'components/spinner/Spinner';
import './ArticlesWrapperPage.css';

class ArticlesWrapperPage extends Component {
    constructor(props) {
        super(props);
        const path = this.props.location.pathname.split("/");
        let archiveId = null;
        if(path.length < 3) {
            archiveId = 5;
        } else {
            archiveId = +path[path.length - 1];
        }
        this.state = {
            articles: null,
            archiveId: archiveId,
            magazine: null
        };
    }

    componentWillMount() {
        getMagazine(this.state.archiveId).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                magazine: data
            })

            getArticles().then(response => {
                return response.json();
            }).then(data => {
                this.setState({
                    articles: data
                })

                const magazine = this.state.magazine;

                let articles = magazine.articles.map(articleId => {
                    return this.state.articles.find(article => article.id === articleId);
                });

                articles = articles.filter(article => article);

                magazine.articles = articles;


                this.setState({
                    magazine: magazine
                })

            });
        });
    }

    render() {
        return (
            <section className="ArticlesWrapperPage">
                {
                    (!this.state.magazine || !this.state.articles)
                        ? < Spinner />
                        : <ArticleList articles={this.state.magazine.articles} />
                }
            </section>
        )
    }
}

export default withRouter(ArticlesWrapperPage);