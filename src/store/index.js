/** @format */
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import reducers from "@redux";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [
  thunk,
  logger
  // more middleware
];

const configureStore = () => {
  return createStore(reducers, undefined, composeWithDevTools(applyMiddleware(...middleware)));
};

export default configureStore();
