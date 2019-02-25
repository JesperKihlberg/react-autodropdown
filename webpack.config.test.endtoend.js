"use strict";

let path = require("path");
let WebpackConfig = require("webpack-config");
let webpack = require("webpack");


module.exports = new WebpackConfig.Config().extend({
  "webpack.config.js": config => {
    return config;
  }
}).merge({
  target: "node",
  plugins: [
    // This is a workaround to avoid a warning. It is a modified workaround taken
    // from this thread: https://github.com/andris9/encoding/issues/16
    // The use of lodash/noop.js is just convenience.
    new webpack.NormalModuleReplacementPlugin(
      /\/iconv-loader$/,
      "lodash/noop.js")
  ],
  module: {
    // Disable handling of requireActual
    unknownContextRegExp: /$^/,
    unknownContextCritical: false
  },
  entry: {
    test: [
      path.resolve(__dirname, "test", "endtoend.ts")
    ]
  },
  output: {
    path: path.resolve("../../../../Debug/test-endtoend/js"),
  },
});
