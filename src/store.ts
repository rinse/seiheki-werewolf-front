import {applyMiddleware, createStore} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import {rootReducer} from "./reducers/rootReducer";

const middleware = applyMiddleware(promiseMiddleware)
export const store = createStore(rootReducer, middleware)
