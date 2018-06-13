import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ArticleList from 'components/articleList/ArticleList';
import { getMagazine } from 'services/magazine-service';
import Spinner from 'components/spinner/Spinner';
import './ArticlesWrapperPage.css';
import MagazineContent from 'components/magazineContent/MagazineContent';

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
            archiveId: archiveId,
            magazineName: ''
        };
    }

    componentWillMount() {
        getMagazine(this.state.archiveId).then(response => {
            return response.json();
        }).then(data => {
            if(data.length) {
                this.setState({
                    articles: data[0].articles,
                    magazineName: data[0].name
                })
                console.log(data);
            } else {
                this.setState({
                    articles: data.articles,
                    magazineName: data.name
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
                        : 
                        <div className="magazine-wrapper">
                            <MagazineContent articles={this.state.articles}/>
                            <ArticleList magazineName={this.state.magazineName} articles={this.state.articles} />
                        </div>
                }
            </section>
        )
    }
}

export default withRouter(ArticlesWrapperPage);