import React, {Component} from 'react';
import './ArticleReview.css';
import docs from 'assets/docs/article-review/test.pdf';


class ArticleReview extends Component{
    render(){
        return(
            <section className="ArticleReview">
              
              <object data={docs} type="application/pdf" width="100%" height="500px">
                    alt: <a href={docs}>It is article</a>
              </object>
              <div><a href={docs} className="btn-review" target="_blank">Open in new window</a></div>
              <h3 className="label-textarea">Comment and whishes about article</h3>
              <div><textarea className="article-comments"></textarea></div>
              <h3 className="label-textarea">Change the status of article</h3>
              <div class="form__select">
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