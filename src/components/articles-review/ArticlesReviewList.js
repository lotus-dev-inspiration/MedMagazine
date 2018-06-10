import React, { Component, Fragment } from 'react';
import docs from 'assets/docs/article-review/test.pdf';
import './ArticlesReviewList.css';
import ArticleView from './articleView/ArticleView';
import { getTime } from 'helpers/date-helper';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getReviewArticles, getStages } from 'actions';
import baseUrl from 'helpers/baseUrl';
import Spinner from 'components/spinner/Spinner';


class Tabs extends Component {

    state = {
        selected: this.props.selected || 0
    }

    handleChange(index) {
        this.setState({ selected: index })
    }

    render() {
        return (
            <div>
                <ul className="inline">
                    {this.props.children.map((elem, index) => {
                        let style = index == this.state.selected ? 'selected' : '';
                        return <li className={style} key={index} onClick={this.handleChange.bind(this, index)}>{elem.props.title}</li>
                    })}
                </ul>
                <div className="tab">{this.props.children[this.state.selected]}
                </div>
            </div>
        )
    }
}

class Panel extends Component {
    render() {
        return <div>{this.props.children}</div>
    }
}



class ArticlesReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArticlesLoading: true,
            isStagesLoading: true
        }
    }

    componentWillMount() {
        this.getReviewArticles();
        this.getStages();
    }

    getReviewArticles() {
        fetch(`${baseUrl}/users/${this.props.userInfo.id}/articles`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            this.props.getReviewArticles(data);
            this.setState({
                isArticlesLoading: false
            })
        }).catch(error => {
            console.log(error);
        })
    }

    getStages() {
        fetch(`${baseUrl}/stages`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(data => {
            this.props.getStages(data.objects);
            this.setState({
                isStagesLoading: false
            })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <section className="ArticlesReviewList">
                {this.props.userInfo.groups.length === 0 ?
                    <h1 className="header">My articles</h1> :
                    <h1 className="header">Articles, which wait review</h1>
                }
                {
                    this.state.isArticlesLoading || this.state.isStagesLoading ?
                    <Spinner/> :
                    <Fragment>
                    {
                                this.props.userInfo.groups[0] === 2 ?
                                    <React.Fragment>
                                        <Tabs selected={0}>
                                            <Panel title="Test">
                                                {
                                                    this.props.articles.length !== 0 && this.props.stages.length !== 0 ?
                                                        <div>
                                                            {
                                                                this.props.articles.sort((a, b) => { return getTime(b.date) - getTime(a.date) })
                                                                    .filter(article => article.status === 1).map((article) => {
                                                                        return (
                                                                            <ArticleView data={article} key={article.id} />
                                                                        )
                                                                    })
                                                            }
                                                        </div> : null
                                                }
                                            </Panel>
                                            <Panel title="Editing">
                                                {
                                                    this.props.articles.length !== 0 && this.props.stages.length !== 0 ?
                                                        <div>
                                                            {
                                                                this.props.articles.sort((a, b) => { return getTime(b.date) - getTime(a.date) })
                                                                    .filter(article => article.status === 5).map((article) => {
                                                                        return (
                                                                            <ArticleView data={article} key={article.id} />
                                                                        )
                                                                    })
                                                            }
                                                        </div> : null
                                                }
                                            </Panel>
                                            <Panel title="Rework">
                                                {
                                                    this.props.articles.length !== 0 && this.props.stages.length !== 0 ?
                                                        <div>
                                                            {
                                                                this.props.articles.sort((a, b) => { return getTime(b.date) - getTime(a.date) })
                                                                    .filter(article => article.status === 2).map((article) => {
                                                                        return (
                                                                            <ArticleView data={article} key={article.id} />
                                                                        )
                                                                    })
                                                            }
                                                        </div> : null
                                                }
                                            </Panel>
                                        </Tabs>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        {
                                            this.props.articles.length !== 0 && this.props.stages.length !== 0 ?
                                                <div>
                                                    {
                                                        this.props.articles.sort((a, b) => { return getTime(b.date) - getTime(a.date) }).map((article) => {
                                                            return (
                                                                <ArticleView data={article} key={article.id} />
                                                            )
                                                        })
                                                    }
                                                </div> : null
                                        }
                                    </React.Fragment>
                    }
                    </Fragment>
                    
                }
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        userInfo: state.user.model,
        articles: state.articles.data,
        stages: state.stages.data
    };
};

const mapDispatchToProps = state => ({
    getReviewArticles: getReviewArticles(state),
    getStages: getStages(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlesReviewList));