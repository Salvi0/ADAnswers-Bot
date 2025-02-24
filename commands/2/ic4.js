/* eslint-disable max-len */
"use strict";

const { ChallengeApplicationCommand } = require("../../classes/ApplicationCommand/ChallengeApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new ChallengeApplicationCommand({
    name: "ic4",
    description: "shorthand for `/challenge ic4`",
    type: "shorthand",
    check: "weirdICsCheck",
    getArgMessage() {
      return ChallengeCommand.command.messageObject.ic4;
    },
    sent: [ChallengeCommand.command.messageObject.ic4],
  })
};
