"use strict";

const { Log } = require("../FunctionClasses/Log");
const { ApplicationCommand } = require("./ApplicationCommand");

class ChallengeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    try {
      if (this.name !== "eternitychallenge" && this.name !== "ec") {
        const arg = this.type === "shorthand" ? undefined : interaction.options.getString("challenge");
        const info = this.type === "shorthand" ? undefined : interaction.options.getString("info");
        const embed = this.getArgMessage(arg, info);
        const user = interaction.member === null ? interaction.user : interaction.member.user;
        embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });
        const isHelper = this.hasHelperRole(interaction);

        if (this.type !== "shorthand" && this.acceptableArgs.includes(arg)) interaction.reply({ embeds: [embed], ephemeral: !isHelper });
        else interaction.reply({ embeds: [embed], ephemeral: !isHelper });
      } else {
        const args = this.getArgs(interaction);
        const challenge = [`${args[0]}x${args[1]}`];
        const embed = this.getArgMessage(challenge);
        const user = interaction.member === null ? interaction.user : interaction.member.user;
        const isHelper = this.hasHelperRole(interaction);

        embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });
        interaction.reply({ embeds: [embed], ephemeral: !isHelper });
      }
    } catch (e) {
      Log.error(e);
    }
  }

  getArgs(interaction) {
    const args = [];
    args.push(interaction.options.getNumber("ec"));
    args.push(interaction.options.getNumber("completion"));
    args.push(interaction.options.getBoolean("hide"));
    return args;
  }
}

module.exports = {
  ChallengeApplicationCommand,
};