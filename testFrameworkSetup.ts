import util from "util";

const consoleWarn = console.warn;
const consoleError = console.error;

function logToError() {
  throw new Error(util.format.apply(this, arguments).replace(/^Error: (?:Warning: )?/, ""));
}

beforeAll(function() {
  // Make calls to console.warn and console.error throw an error.
  console.warn = logToError;
  console.error = logToError;
});

afterAll(function() {
  // Return console.warn and console.error to default behaviour.
  console.warn = consoleWarn;
  console.error = consoleError;
});
