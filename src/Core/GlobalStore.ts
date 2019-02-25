import { createStore, Store as IReduxStore, applyMiddleware } from "redux";
import reducers from "../Redux/reducers";
import IState from "../Redux/IState";

import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";

import mySaga from "../Redux/sagas";

let Store: IReduxStore<IState> = null;

export const initializeGlobalStore = () => {

  const sagaMiddleware = createSagaMiddleware();

  Store = createStore<IState>(reducers, composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  ));

  // then run the saga
  sagaMiddleware.run(mySaga);

  return Store;
};

export const getStore = () => Store;
