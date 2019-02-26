"use strict";

let path = require("path");
let webpack = require("webpack");
let WebpackConfig = require("webpack-config");
module.exports = new WebpackConfig.Config().extend({
  "webpack.config.app.js": config => {
    config.module.rules.filter(l => l.loader == "babel-loader");
    config.output.filename = "[name].js";
    return config;
  }
}).merge({
  devtool: "cheap-module-eval-source-map",
  entry: {
    app: [
      "eventsource-polyfill", // necessary for hot reloading with IE
      "webpack-hot-middleware/client",
    ]
  },
  output: {
    path: path.resolve("../../../../Debug/webclient-hotreload/js"),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
