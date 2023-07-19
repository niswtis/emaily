// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  // we are in production - return the porduction set of keys
  module.exports = require("./production");
} else {
  // we are in development - return dev keys
  module.exports = require("./dev");
}
