import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './reducers/';

import './less/index.css';
import Chat from './component/chat';
import Login from './component/login';
import SignUp from './component/signup'
import Verify from './component/signup/verifiy'

const reducer = combineReducers({ ...reducers, routing: routerReducer });
const store = createStore(reducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" onEnter={() => browserHistory.push('/chat')} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
      <Route path="/signup" component={SignUp} />
      <Route path="/verify/:token/:id" component={Verify} />
    </Router>
  </Provider>, document.getElementById('root'));
