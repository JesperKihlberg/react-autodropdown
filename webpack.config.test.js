"use strict";

let path = require("path");
let WebpackConfig = require("webpack-config");

module.exports = new WebpackConfig.Config().extend({
  "webpack.config.js": config => {
    return config;
  }
}).merge({
  module: {
    // Disable handling of requireActual
    unknownContextRegExp: /$^/,
    unknownContextCritical: false
  },
  entry: {
    test: [
      path.resolve(__dirname, "test", "unittests.ts")
    ]
  },
  output: {
    path: path.resolve("../../../../Debug/test/js"),
  },
});
