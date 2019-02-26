"use strict";

let path = require("path");
let WebpackConfig = require("webpack-config");

module.exports = new WebpackConfig.Config().extend("webpack.config.app.js").merge({
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve("../../../../Debug/webclient/js"),
    filename: "[name].[hash].js",
  },
});
