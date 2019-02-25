import React from "react";

import { HashRouter } from "react-router-dom";

import Main from "Pages/Main/Main";

// Apply any type to work around missing applyRouterMiddleware in d.t.s file.
import * as ReactRouterTS from "react-router";
const Route = ReactRouterTS.Route as any;

interface IAppRootInternalProps {}
interface IAppRootExternalProps {}
interface IAppRootDispatchProps {
  registerBrandImageAction: (brandImage: new () => React.Component<any, any>) => void;
}

class AppRoutes extends React.Component<IAppRootExternalProps & IAppRootInternalProps & IAppRootDispatchProps, {}> {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Main} />
      </HashRouter>
    );
  }
}

export const appRoutes = AppRoutes as React.ComponentClass<IAppRootExternalProps>;
