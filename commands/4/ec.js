"use strict";

// This is for if/when I can make the buttons not cause the stupid "unknown interaction" error.
// Like yeah right, unknown interaction my ass, it's just discord.js being an idiot.
// const { ECApplicationCommand } = require("../classes/ApplicationCommand/ECApplicationCommand");
const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");
const EternityChallengeCommand = require("./eternitychallenge");

module.exports = {
  command: new TimeStudyApplicationCommand({
    name: "ec",
    description: "shorthand for /eternitychallenge",
    type: "shorthand",
    check: "ecsCheck",
    sent: undefined,
    acceptableArgs: EternityChallengeCommand.command.acceptableArgs,
    getArgMessage(arg, tree) {
      return EternityChallengeCommand.command.getArgMessage(arg, tree);
    },
    argInfo: {
      ec: { key: "ec", type: "number" },
      completion: { key: "completion", type: "number" },
    },
    ephemeral: true
  })
};