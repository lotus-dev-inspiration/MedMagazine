import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { translate } from 'react-i18next';


import './StartPage.css';

class StartPage extends Component {
    render() {
        const { t } = this.props

        return (
            <section className="StartPage">
                <Link className="startpage-link" to="/magazine">{t('startPage.start')}</Link>
            </section>
        );
    }
}

export default translate('translations')(StartPage);