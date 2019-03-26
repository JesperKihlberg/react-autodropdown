"use strict";

let path = require("path");
let webpack = require("webpack");

let glob = require("glob");
let autoprefixer = require("autoprefixer");
let ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const extractCss = new ExtractTextPlugin("package.css");

let libraryName = "package";
let outputFile = libraryName + ".js";

const isTypescript = function(fileName) {
  return (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) && !fileName.endsWith(".d.ts");
};
const isTypescriptOrJavascript = function(fileName) {
  return isTypescript(fileName) || fileName.endsWith(".js");
};
function srcPath(subdir) {
  return path.join(path.resolve("src"), subdir);
}

module.exports = {
  mode: "production",
  entry: {
    app: [path.resolve("typings") + "/package.d.ts", path.resolve("src") + "/index.tsx"]
  },
  output: {
    path: path.resolve("lib"),
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    // extractCss,
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development") }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
    alias: {
      API: srcPath("API"),
      Components: srcPath("Components"),
      Pages: srcPath("Pages"),
      Redux: srcPath("Redux"),
      Core: srcPath("Core")
    }
  },
  module: {
    rules: [
      {
        test: isTypescript,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          emitErrors: false
        }
      },
      {
        test: /\.js\.flow$/,
        loader: "ignore-loader"
      },
      {
        test: isTypescriptOrJavascript,
        loader: "babel-loader",
        include: path.resolve("src"),
        exclude: /(node_modules|bower_components)/,
        query: {
          plugins: [
            [
              "react-intl",
              {
                messagesDir: "./build/messages/"
              }
            ]
          ],
          presets: ["@babel/preset-env"]
        }
      },
      {
        // Note ts-loader must be listed after babel-loader since babel should be applied to the result of ts-compilation.
        // ts ---(ts-loader)--> es6 ----(babel-loader)-----> es5
        test: isTypescript,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.d\.ts$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|ico)$/,
        loader: "url-loader?limit=100000"
      },
      {
        // Global css
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              root: "./",
              modules: true,
              importLoaders: 2,
              localIdentName: "[local]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: "resolve-url-loader"
          }
        ]
      },
      {
        // local css
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              root: "./",
              modules: true,
              importLoaders: 3,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader?sourceMap"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              root: "./",
              modules: true,
              importLoaders: 4,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader?sourceMap"
          },
          {
            loader: "sass-resources-loader?sourceMap",
            options: {
              resources: [
                "./assets/styles/site-customizations.default.scss",
                "./assets/styles/bootstrap/pre-customizations.default.scss",
                "./node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss",
                "./assets/styles/bootstrap/customizations.scss"
              ]
            }
          }
        ]
      },

      {
        test: /\.jpg$/,
        loader: "file-loader"
      }
    ]
  }
};
