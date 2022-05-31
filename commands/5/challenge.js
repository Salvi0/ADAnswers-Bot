/* eslint-disable max-len */
"use strict";

const { MessageEmbed } = require("discord.js");
const { ChallengeApplicationCommand } = require("../../classes/ApplicationCommand/ChallengeApplicationCommand");
const { challenges } = require("../../utils/challenges");

const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by MrKrutaman#1705`);

const shownFields = (challenge, requestedFields) => {
  const challengeInfo = challenges[challenge];
  switch (requestedFields) {
    case "unlock": return [{ name: "Unlock requirements", value: `${challengeInfo.requirements}` }];
    case "challenge": return [{ name: "Challenge", value: `${challengeInfo.challenge}` }];
    case "goal": return [{ name: "Goal", value: `${challengeInfo.goal}` }];
    case "strategy": return [{ name: "Strategy", value: `${challengeInfo.strategy}` }];
    case "reward": {
      const fields = [{ name: "Reward", value: `${challengeInfo.reward}` }];
      if (challengeInfo.rewardFormula) fields.push({ name: "Reward formula", value: `${challengeInfo.rewardFormula}` });
      return fields;
    }
    default: {
      const fields = [
        { name: "Unlock requirements", value: `${challengeInfo.requirements}` },
        { name: "Challenge", value: `${challengeInfo.challenge}` },
        { name: "Goal", value: `${challengeInfo.goal}` },
        { name: "Strategy", value: `${challengeInfo.strategy}` },
        { name: "Reward", value: `${challengeInfo.reward}` }
      ];
      if (challengeInfo.rewardFormula) fields.push({ name: "Reward formula", value: `${challengeInfo.rewardFormula}` });
      return fields;
    }
  }
};

const normalChallenge = challengeInfo => new MessageEmbed()
  .setTitle(`Challenge ${challengeInfo.number}`)
  .setColor("#22aa48")
  .setThumbnail(challengeInfo.image)
  .addFields(shownFields(`c${challengeInfo.number}`))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const infinityChallenge = challengeInfo => new MessageEmbed()
  .setTitle(`Infinity Challenge ${challengeInfo.number}`)
  .setColor("#b67f33")
  .setThumbnail(challengeInfo.image)
  .addFields(shownFields(`ic${challengeInfo.number}`))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

// We use this to create base embeds, just so we don't have to recreate them every time.
// We do still recreate them for when a specific field is requested, because these get overwrriten if you don't.
const newChallengeMessageObject = {
  "c2": normalChallenge(challenges.c2),
  "c3": normalChallenge(challenges.c3),
  "c4": normalChallenge(challenges.c4),
  "c5": normalChallenge(challenges.c5),
  "c6": normalChallenge(challenges.c6),
  "c7": normalChallenge(challenges.c7),
  "c8": normalChallenge(challenges.c8),
  "c9": normalChallenge(challenges.c9),
  "c10": normalChallenge(challenges.c10),
  "c11": normalChallenge(challenges.c11),
  "c12": normalChallenge(challenges.c12),
  "ic1": infinityChallenge(challenges.ic1),
  "ic2": infinityChallenge(challenges.ic2),
  "ic3": infinityChallenge(challenges.ic3),
  "ic4": infinityChallenge(challenges.ic4),
  "ic5": infinityChallenge(challenges.ic5),
  "ic6": infinityChallenge(challenges.ic6),
  "ic7": infinityChallenge(challenges.ic7),
  "ic8": infinityChallenge(challenges.ic8),
};

module.exports = {
  command: new ChallengeApplicationCommand({
    name: "challenge",
    description: "Args: all challenges, including `ecs`. Returns a guide for each argument. All of these commands have shorthands as well, f.e `/challenge c9` will return the same result as `/c9`",
    check: "challengeCheck",
    acceptableArgs: Object.keys(newChallengeMessageObject),
    sent: undefined,
    getArgMessage(arg, info) {
      // Efficiency that excites
      if (!info) return newChallengeMessageObject[arg];
      if (arg.startsWith("c")) {
        return normalChallenge(challenges[arg]).setFields(shownFields(arg, info));
      }
      if (arg.startsWith("ic")) {
        return infinityChallenge(challenges[arg]).setFields(shownFields(arg, info));
      }
      return `Unknown arg in command challenge.`;
    },
    messageObject: newChallengeMessageObject,
    argInfo: {
      challenge: {
        key: "challenge",
        type: "string",
      },
      info: {
        key: "info",
        type: "string",
      }
    }
  }),
};
