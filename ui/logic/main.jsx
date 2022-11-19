import React, { Component } from "react";
import { render } from "react-dom";
import App from "ui/components/app.jsx";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { createBrowserHistory } from "history";
import routerReducer from "third-party/redux-first/reducer.js";
import routerListener from "third-party/redux-first/listener.js";
import routerMiddleware from "third-party/redux-first/middleware.js";
import reducer from "./reducer.js";
import processRoute from "./process-route.js";
import asyncDispatchMiddleware from "third-party/redux-async.js";
import createDebounce from "third-party/redux-debounced.js";
import _ from "underscore";
import getResult from "noughts-and-crosses/logic/get-result.js";
import iterateTree from "./iterate-tree.js";
import * as R from "ramda";
import engine from "./engine.js";

const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({
  url: _.partial(routerReducer, _, _, details => processRoute(store, details)),
  app: reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(asyncDispatchMiddleware),
    applyMiddleware(createDebounce()),
    applyMiddleware(historyMiddleware)
  )
);

routerListener(history, store);

const renderDom = () =>
  render(<App store={store} />, document.getElementById("root"));

store.subscribe(renderDom);
renderDom();

engine.addEventListener("message", ({data}) => store.dispatch(data));

setInterval(() => engine.postMessage({type: "GET_BEST_LINES"}), 500);

//setTimeout(() => engine.postMessage({type: "STOP"}), 20000);

engine.postMessage({type: "INIT"});
