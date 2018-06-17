import React from 'react';
import './Requirements.css';
import { translate } from 'react-i18next';


const Requirements = (props) => {
    const { t } = props

    return <section className="Requirements">
        <div className="content">
            <div className="pay-attention">
                <p className="pay-attention__heading">{t('requirements.payAtt')}</p>
                <ul className="pay-attention__list">
                    <li className="pay-attention__item">{t('requirements.payAttP1')},</li>
                    <li className="pay-attention__item">{t('requirements.payAttP2')},</li>
                    <li className="pay-attention__item">{t('requirements.payAttP3')},</li>
                    <li className="pay-attention__item">{t('requirements.payAttP4')},</li>
                    <li className="pay-attention__item">{t('requirements.payAttP5')}.</li>
                </ul>
            </div>
            <h1 className="heading">{t('requirements.rules')}</h1>
            <ol className="requirements__list">
                <li className="requirements__item">{t('requirements.rulesItem1')}.
            </li>
                <li className="requirements__item">{t('requirements.rulesItem2')}:
            <ul className="requirements__sublist">
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem1')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem2')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem3')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem4')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem5')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem6')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem7')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem8')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem9')},</li>
                        <li className="requirements__subitem">{t('requirements.rulesItem2Subitem10')}.</li>
                    </ul>
                </li>
                <li className="requirements__item">{t('requirements.rulesItem3')}.</li>
                <li className="requirements__item">{t('requirements.rulesItem4')}.</li>
                <li className="requirements__item">{t('requirements.rulesItem5')}.</li>
                <li className="requirements__item">{t('requirements.rulesItem6')}.</li>
            </ol>
        </div>
    </section>
};

export default translate('translations')(Requirements);