import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/redux";
import './index.scss';
import {BrowserRouter} from "react-router-dom";

// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter >
    </Provider >,
    document.getElementById('root')
);

