import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import Main from "Pages/Main/Main";

const runAppInternal = () => {
  ReactDOM.render(<Main />, document.getElementById("root"));
};

const runApp = () => {
    runAppInternal();
};

export { runApp };
