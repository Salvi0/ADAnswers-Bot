"use strict";

const { execute } = require("./eternitychallenge");

module.exports = {
  name: "ec",
  number: 6,
  description: "shorthand for ++eternitychallenge",
  type: "shorthand",
  execute(message, args, id) {
    execute(message, args, id);
  }
};