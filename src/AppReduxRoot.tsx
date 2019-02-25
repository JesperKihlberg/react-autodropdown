import "regenerator-runtime/runtime";
import React from "react";
import { Provider } from "react-redux";

import { Store, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./Redux/Reducers";
import IState from "./Redux/IState";
import createSagaMiddleware from "redux-saga";

import mySaga from "./Redux/sagas";

// Apply any type to work around missing applyRouterMiddleware in d.t.s file.
import { appRoutes as AppRoutes } from "./AppRoutes";

interface IAppRootInternalProps {
}
interface IAppRootExternalProps {
}

class AppReduxRoot extends React.Component<IAppRootExternalProps & IAppRootInternalProps, {}> {
  store: Store<any>;

  constructor(props: IAppRootExternalProps & IAppRootInternalProps) {
    super(props);
    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware();

    this.store = createStore<IState>(reducers, composeWithDevTools(
      applyMiddleware(sagaMiddleware)
    ));

    // then run the saga
    sagaMiddleware.run(mySaga);

  }
  render() {
    return (
      <Provider store={this.store as any}>
        < AppRoutes />
      </Provider>);
  }
}
export default AppReduxRoot;
