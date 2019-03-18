"use strict";

let path = require("path");
let WebpackConfig = require("webpack-config");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = new WebpackConfig.Config().extend("webpack.config.js").merge({
  entry: {
    app: [
      path.resolve(path.resolve("src") + "/app.tsx")
    ]
    // ,
    // graphiqlapp: path.resolve(__dirname, "src", "graphiqlapp.tsx")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: "body",
      filename: "../index.html",
      chunks: ["app"]
    })
    // ,
    // new HtmlWebpackPlugin({
    //   template: "public/graphiql.html",
    //   inject: "body",
    //   filename: "../graphiql.html",
    //   chunks: ["graphiqlapp"]
    // })
  ],
});
