import React from "react";

interface IMainDispatchProps {}

interface IMainExternalProps {}

interface IMainProps extends IMainExternalProps, IMainDispatchProps {}

class Main extends React.Component<IMainProps, {}> {
  render() {
    return <div>MAIN</div>;
  }
}

export default Main;
