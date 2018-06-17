import React, { Component, Fragment } from 'react';
import './Archive.css';
import { getMagazines } from 'services/magazine-service';
import { getYear, getDate, getMonthName, getTime } from 'helpers/date-helper';
import Spinner from 'components/spinner/Spinner';
import { translate } from 'react-i18next';



class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            magazines: null,
            isMagazinesLoading: true
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
                magazines: magazines,
                isMagazinesLoading: false
            });
        });

    }


    render() {
        const { t } = this.props

        return (
            <section className="Archive">
                {
                    this.state.isMagazinesLoading
                        ? <Spinner />
                        : <Fragment>
                            {
                                this.state.magazines && this.state.magazines.length
                                    ? <h1 className="archive-heading">{t('archive.archive')}</h1>
                                    : <h1 className="archive-heading">{t('archive.noavail')}</h1>
                            }
                            {
                                this.state.magazines.map(magazine => {
                                    return <article key={magazine.id} className="archive-magazine">
                                        <div className="pc-img">
                                        </div>
                                        <div>
                                        <h2>{magazine.name}</h2>
                                            <p>{t('archive.direction')}: {magazine.theme}</p>
                                        <div>
                                                {t('archive.date')}: &nbsp;
                                <span>{getDate(magazine.date)} </span>
                                            <span>{getMonthName(magazine.date)}, </span>
                                            <span>{getYear(magazine.date)}</span>
                                        </div>
                                            <a className="info-read-more" href={"archive/" + magazine.id}>{t('archive.view')}</a>
                                        </div>
                                    </article>;
                                })
                            }
                        </Fragment>
                }
            </section>
        );
    }
}

export default translate('translations')(Archive);