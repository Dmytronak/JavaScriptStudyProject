import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from "redux"
import { LoginReducer } from './shared/reducers/auth/login.reducer';
import { Provider } from 'react-redux';
import { LoginSaga } from './shared/sagas/auth/login.saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    LoginReducer,
    applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(LoginSaga);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
