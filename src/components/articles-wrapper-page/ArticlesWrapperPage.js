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
            archiveId = 'last';
        } else {
            archiveId = +path[path.length - 1];
        }
        this.state = {
            articles: null,
            archiveId: archiveId
        };
    }

    componentWillMount() {
        getMagazine(this.state.archiveId).then(response => {
            return response.json();
        }).then(data => {
            if(data.length) {
                this.setState({
                    articles: data[0].articles
                })
            } else {
                this.setState({
                    articles: data.articles
                })
            }
        });
    }

    render() {
        return (
            <section className="ArticlesWrapperPage">
                {
                    (!this.state.articles)
                        ? < Spinner />
                        : <ArticleList articles={this.state.articles} />
                }
            </section>
        )
    }
}

export default withRouter(ArticlesWrapperPage);