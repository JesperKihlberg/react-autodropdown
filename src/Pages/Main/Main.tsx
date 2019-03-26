import React from "react";
import AutoDropdown from "index";

const styles = require("./Main.scss");

interface IMainDispatchProps {}

interface IMainExternalProps {}

interface IMainProps extends IMainExternalProps, IMainDispatchProps {}

class Main extends React.Component<IMainProps, {}> {
  render() {
    return (
      <div>
        MAIN{" "}
        <div>
          <AutoDropdown
            elementClassNames={{ input: styles.input }}
            elements={[{ name: "test1", id: "test" }, { name: "test2", id: "tes2t" }, { name: "test3", id: "test2" }]}
          />
        </div>
        <div>Hestesko</div>
      </div>
    );
  }
}

export default Main;
