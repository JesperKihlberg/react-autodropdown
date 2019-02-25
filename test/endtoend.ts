// Use "var" to avoid compile error "Cannot redeclare block-scoped variable 'tests'"
// tslint:disable-next-line:no-var-keyword
var tests = require.context("../nightwatch/tests/", true, /\.ts?$/);
tests.keys().forEach(tests);
