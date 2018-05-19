import React, { Component } from 'react';
import './ArticleReview.css';
import docs from 'assets/docs/article-review/test.pdf';


class ArticleReview extends Component {

    state = {
        
    }

    // componentDidMount(){
    //     console.log(this.props.location);
    // }

    render() {
        let articleInfo = this.props.location.state.info.data;
        let stages = this.props.location.state.info.stages;
        console.log(articleInfo);
        console.log(stages);

        return (
            <section className="ArticleReview">

                <object data={articleInfo.content} type="application/pdf" width="100%" height="500px">
                    alt: <a href={articleInfo.content}>It is article</a>
                </object>
                <div><a href={articleInfo.content} className="btn-review" target="_blank">Open in new window</a></div>
                <h3 className="label-textarea">Comment and whishes about article</h3>
                <div><textarea className="article-comments"></textarea></div>
                <h3 className="label-textarea">Change the status of article</h3>
                <div className="form__select">
                    <select name="select">
                        <option value="1">Acceped</option>
                        <option value="2">Rejected</option>
                    </select>
                </div>
                <button className="btn-review">Save</button>
            </section>
        )
    }
}

export default ArticleReview;