import createSagaMiddleware from "@redux-saga/core";
import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = compose(composeWithDevTools(applyMiddleware(sagaMiddleware)))(
  createStore
)(rootReducer);
sagaMiddleware.run(rootSaga);

export default store;
