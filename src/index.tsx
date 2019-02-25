import "babel-polyfill";
import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import AppReduxRoot from "./AppReduxRoot";

const runAppInternal = () => {
  ReactDOM.render(<AppReduxRoot />, document.getElementById("root"));
};

const runApp = () => {
    runAppInternal();
};

export { runApp };
