/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 2,
    name: "ipepcolour",
    description: "Explains the colouring of the IP/EP numbers on their respective reset buttons",
    check: true,
    acceptableArgs: undefined,
    sent: [`This is a visual improvement introduced in the web Reality update and adapted into the Android version. \nOnce you have at least 1e50 IP/EP the colour shows if you gain less (red), around the same (white), or more (green) IP/EP than you currently have.`]
  })
};