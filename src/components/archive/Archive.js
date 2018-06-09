import React, { Component } from 'react';
import MagazinesFilter from 'components/magazines-filter/MagazinesFilter';
import './Archive.css';
import { getMagazines } from 'services/magazine-service';
import { getArticles } from 'services/article-service';
import { getYear, getDate, getMonthName, getTime } from 'helpers/date-helper';
import Spinner from 'components/spinner/Spinner';


class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            magazines: null
        }
    }

    componentWillMount() {
        getMagazines().then(response => {
            return response.json();
        }).then(data => {

            let magazines = data;

            magazines.sort((a, b) => {
                return getTime(a.date) < getTime(b.date);
            });

            this.setState({
                magazines: magazines
            });
        });

    }


    render() {
        return (
            <section className="Archive">
                {
                    this.state.magazines && this.state.magazines.length 
                    ? <h1 className="archive-heading">Magazines' Archieve</h1>
                        : <h1 className="archive-heading">No available Archieves</h1>
                }
                {
                    this.state.magazines ?
                        this.state.magazines.map(magazine => {
                            return <article key={magazine.id} className="archive-magazine">
                                <h2>{magazine.name}</h2>
                                <p>Direction: {magazine.theme}</p>
                                <div>
                                    Date: &nbsp;
                                <span>{getDate(magazine.date)} </span>
                                    <span>{getMonthName(magazine.date)}, </span>
                                    <span>{getYear(magazine.date)}</span>
                                </div>
                                <a className="info-read-more" href={"archive/" + magazine.id}>View magazine</a>
                            </article>;
                        }) : <Spinner />
                }
            </section>
        );
    }
}

export default Archive;