import { createStore, applyMiddleware, combineReducers } from "redux";
// import { createLogger } from "redux-logger";
import { authReducer } from "./2-reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ authReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
// logger is for console

export default store;
