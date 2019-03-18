let path = require("path");
let express = require("express");
let webpack = require("webpack");
let config = require("./config/webpack.config.dev.hotreload");
let fs = require("fs");
let https = require("https");

const APP_PORT = 3003;
const APP_PORT_SEC = 3446;
let app = express();
let compiler = webpack(config);

const cert = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

console.log(`App is now running on https://localhost:${APP_PORT_SEC}`);
// console.log(`GraphiQL is now running on https://localhost:${APP_PORT_SEC}/graphiql.html`);

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: "/" + config.output.publicPath,
  stats: { colors: true, chunks: false }
}));

app.use(require("webpack-hot-middleware")(compiler));

// app.get(["/graphiql.html", "/graphql"], function(req, res, next) {
//   // res.sendFile(path.join(__dirname, "public", "index.html"));
//   let filename = path.join(compiler.outputPath, "..", "graphiql.html");
//   compiler.outputFileSystem.readFile(filename, function(err, result) {
//     if (err) {
//       return next(err);
//     }
//     res.set("content-type", "text/html");
//     res.send(result);
//     res.end();
//   });
// });

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

https.createServer(cert, app).listen(APP_PORT_SEC, "0.0.0.0", function(err) {
  if (err) {
    console.log(err);
    return;
  }
});

app.listen(APP_PORT, "0.0.0.0", function(err) {
  if (err) {
    console.log(err);
    return;
  }
});
