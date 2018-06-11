import React from 'react';
import ReactDOM from 'react-dom';

import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from 'reducers/index';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
        <App />
    </Provider>
    </I18nextProvider>,
    document.getElementById('root'));
registerServiceWorker();
