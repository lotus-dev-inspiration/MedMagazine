import React from 'react';
import './Footer.css';

import { translate, Trans } from 'react-i18next';

const Footer = (props) => {
    
    const { t, i18n } = props;

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <footer className="Footer">
            <div className="footer-languages">
                <i className="fa fa-globe globe"></i>
                <button className="footer-language" onClick={() => changeLanguage('ua')}>ua</button>
                <button className="footer-language" onClick={() => changeLanguage('en')}>en</button>
            </div>
            <p className="footer-content">
                <span className="footer-madeby">{t('footer.madeby')}</span> 
                <a className="footer-link" href="https://github.com/Spyrot" target="_blank"> Spyrot</a>
                <a className="footer-link" href="https://github.com/vladshyrinov" target="_blank"> Vlad.Shyrinov</a>
                <a className="footer-link" href="https://github.com/valentine1004" target="_blank"> Valentine1004</a> 
            </p>
        </footer>
    );
}

export default translate('translations')(Footer);
