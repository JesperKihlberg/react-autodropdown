let path = require("path");
let express = require("express");
let webpack = require("webpack");
let config = require("./config/webpack.config.dev.hotreload");
let fs = require("fs");
let https = require("https");

const APP_PORT = 3003;
let app = express();
let compiler = webpack(config);

console.log(`App is now running on http://localhost:${APP_PORT}`);

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: "/" + config.output.publicPath,
  stats: { colors: true, chunks: false }
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/", function(req, res, next) {
  let filename = path.join(compiler.outputPath, "..", "index.html");
  compiler.outputFileSystem.readFile(filename, function(err, result) {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(APP_PORT, "0.0.0.0", function(err) {
  if (err) {
    console.log(err);
    return;
  }
});
