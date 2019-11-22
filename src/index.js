import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import partidoReducer from './reducers/partidoReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(partidoReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);