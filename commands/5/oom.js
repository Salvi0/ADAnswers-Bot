"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "oom",

    check: true,
    description: "describes what an OoM (Order of Magnitude) is",
    sent: [`An OoM (or **O**rder **o**f **M**agnitude) is the difference between the exponents of numbers, e.g. 1e100 -> 1e108 is a difference of 8 OoMs.`]
  }),
};