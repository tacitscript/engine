import App from "ui/components/app.js";
import {createBrowserHistory} from "history";
import routerReducer from "submodules/tacitscript/common/lib/redux-first/reducer.js";
import routerListener from "submodules/tacitscript/common/lib/redux-first/listener.js";
import routerMiddleware from "submodules/tacitscript/common/lib/redux-first/middleware.js";
import reducer from "./reducer.js";
import processRoute from "./process-route.js";
import asyncDispatchMiddleware from "submodules/tacitscript/common/lib/redux-async.js";
import createDebounce from "submodules/tacitscript/common/lib/redux-debounced.js";
import engine from "./engine.js";

const {applyMiddleware, createStore, combineReducers, compose} = Redux;

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

const renderDom = () => ReactDOM.render(<App store={store} />, document.getElementById("root"));

store.subscribe(renderDom);
renderDom();

engine.addEventListener("message", ({data}) => store.dispatch(data));

setInterval(() => engine.postMessage({type: "GET_BEST_LINES"}), 500);

//setTimeout(() => engine.postMessage({type: "STOP"}), 20000);

engine.postMessage({type: "INIT"});
