import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import tipoPartidoReducer from '../src/components/ListadoPartidos/reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(tipoPartidoReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);