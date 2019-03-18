import React from "react";
import { AutoDropdown } from "Components/AutoDropdown/AutoDropdown";

interface IMainDispatchProps {}

interface IMainExternalProps {}

interface IMainProps extends IMainExternalProps, IMainDispatchProps {}

class Main extends React.Component<IMainProps, {}> {
  render() {
    return (
      <div>
        MAIN{" "}
        <div>
          <AutoDropdown elements={[{ name: "test", id: "test" },{ name: "test", id: "tes2t" },{ name: "test", id: "test2" }]} />
        </div>
        <div>
          Hestesko
        </div>
      </div>
    );
  }
}

export default Main;
