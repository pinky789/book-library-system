import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import getAppStore from './store/store';
import App from './App';

import { Provider } from 'react-redux';

const store = getAppStore();

const template = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(template, document.getElementById('root'));


