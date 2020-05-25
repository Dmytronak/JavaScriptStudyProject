import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from "redux"
import { LoginReducer } from './shared/reducers/auth/login.reducer';
import { Provider } from 'react-redux';
import { LoginSaga } from './shared/sagas/auth/login.saga';
import JwtInterceptor from './shared/interceptors/jwt.interceptor';
import { history } from './shared/configurations/browser-history.config';
import {combineReducers} from 'redux'
import { ShopingCartReducer } from './shared/reducers/shoping-cart/shoping-cart.reducer';

JwtInterceptor();

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
    LoginReducer,
    ShopingCartReducer
});

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(LoginSaga);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
