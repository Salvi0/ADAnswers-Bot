/* eslint-disable max-len */
"use strict";

const ECs = require("../../utils/ecs");
const { ChallengeApplicationCommand } = require("../../classes/ApplicationCommand/ChallengeApplicationCommand");
const { MessageEmbed } = require("discord.js");

const footerText = () => (Math.random > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by MrKrutaman#1705`);

const eternityChallenge = challengeInfo => new MessageEmbed()
  .setTitle(`Eternity Challenge ${challengeInfo.challengeID}x${challengeInfo.completion}`)
  .setColor("#b241e3")
  .setThumbnail(ECs.ECImages[challengeInfo.challengeID])
  .addFields(
    { name: "Unlock requirements", value: `${challengeInfo.requirements}` },
    { name: "Challenge", value: `${ECs.ECDescriptions[challengeInfo.challengeID]}` },
    { name: "Goal", value: `${challengeInfo.goal} Infinity Points ${challengeInfo.completionReqs === undefined ? `` : `in ${challengeInfo.completionReqs}.`}` },
    { name: "Strategy", value: `${challengeInfo.ttForCompletion} TT recommended
    Other completions: ${challengeInfo.otherCompletions} 
    ${challengeInfo.note === null ? `` : `\n    Note: \`${challengeInfo.note}\``}` },
    { name: "Tree", value: `${challengeInfo.tree}` },
    { name: "Reward", value: `${ECs.ECRewards[challengeInfo.challengeID].reward}` },
    { name: "Reward formula", value: `${ECs.ECRewards[challengeInfo.challengeID].formula}` },
    { name: "Next EC", value: `${challengeInfo.nextEC}` },
  )
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

module.exports = {
  command: new ChallengeApplicationCommand({

    name: "eternitychallenge",
    description: "Has a shorthand: `/ec`. Requires one argument: `/eternitychallenge [ECNumber]x[CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree.",
    check: "ecsCheck",
    acceptableArgs: ECs.order.concat(ECs.orderWithMultSigns),
    sent: undefined,
    getArgMessage(args, tree) {
      if (!this.acceptableArgs.includes(args[0])) return `That is not an Eternity Challenge!`;
      const splitArgs = args[0].split("x");
      const challengeID = Math.floor(Math.abs(splitArgs[0]));
      const completion = Math.floor(Math.abs(splitArgs[1]));
      const ec = ECs.EternityChallenges[(challengeID - 1) * 5 + (completion - 1)];
      const nextEC = args[0] === "12x5" ? "You have no more ECs left to complete!" : ECs.order[ECs.order.indexOf(args[0]) + 1];

      if (tree) return `${ec.tree}`;
      return eternityChallenge({
        challengeID,
        completion,
        get requirements() {
          if (challengeID === 11 || challengeID === 12) return `${ec.unlock.amount} and 1 Time Theorem`;
          return `${ec.unlock.amount} ${ec.unlock.currency} and ${ec.unlock.tt} Time Theorems`;
        },
        goal: ec.ip,
        completionReqs: ec.completionReqs,
        ttForCompletion: ec.tt,
        otherCompletions: ECs.otherCompletions(challengeID, completion),
        tree: ec.tree,
        note: ec.note,
        nextEC,
      });
    },
    argInfo: {
      ec: { key: "ec", type: "number" },
      completion: { key: "completion", type: "number" },
    },
    ephemeral: true
  })
};