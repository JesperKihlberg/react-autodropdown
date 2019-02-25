// Use "var" to avoid compile error "Cannot redeclare block-scoped variable 'req'"
// tslint:disable-next-line:no-var-keyword
var req = require.context("../src/", true, /spec\.tsx?$/);
req.keys().forEach(req);
