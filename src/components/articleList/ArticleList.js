import React, { Component } from 'react';

import Article from './article/Article';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Article />
                <Article />
                <Article />
            </div>
        );
    }
}