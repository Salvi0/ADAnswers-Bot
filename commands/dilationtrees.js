/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 4,
  name: "dilationtrees",
  description: "Args: `first`, `after3paths`. First is for your first Dilation (and until you get the 3 paths upgrade), and will spit out two trees: one for if you have 1e6 eternities and one if you don't. after3paths is for the tree after the three paths upgrade. By that point, you should have 1e6 eternities.",
  execute(message, args, id) {
    if (functions.endgameCheck(id)) {
      switch (args[0]) {
      case "first":
        message.channel.send(`With 1 million Eternities: \`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,192,201,72,82,92,102,191,211,212,193,213,214,222,223,232,225,233,228|0\`
        Without 1 million Eternities \`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181,192,201,72,82,92,102,191,211,212,193,213,214,222,223,232,225,233,228|0\``);
        break;
      case "after3paths":
        message.channel.send("`11,21,22,31,32,33,41,42,51,61,62,72,71,73,82,81,83,92,91,93,102,103,101,111,123,133,143,151,161,162,171,181,192,191,193,212,211,213,214,222,223,232,225,233,228|0`");
        break;
      default:
        if (args[0] === undefined) message.channel.send(`This command requires an arg!  Args are \`first\` and \`after3paths\``);
        else message.channel.send(`Unknown argument ${args[0]} in command \`++dilationtrees\`. Args are \`first\` and \`after3paths\``);
      }
    } else {
      message.channel.send("This command only works in Dilation channels!");
    }
  }
};