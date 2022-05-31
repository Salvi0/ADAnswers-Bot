"use strict";

const { MessageAttachment } = require("discord.js");
const { Log } = require("../FunctionClasses/Log");
const { ApplicationCommand } = require("./ApplicationCommand");

class ChallengeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    try {
      if (this.name !== "eternitychallenge" && this.name !== "ec") {
        const arg = this.type === "shorthand" ? this.name : interaction.options.getString("challenge");
        const info = this.type === "shorthand" ? undefined : interaction.options.getString("info");
        const embed = this.getArgMessage(arg, info);
        const user = interaction.member === null ? interaction.user : interaction.member.user;
        const picture = new MessageAttachment(`images/challenges/${arg.toUpperCase()}.png`);
        const isHelper = this.hasHelperRole(interaction);

        embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });
        embed.setThumbnail(`attachment://${arg.toUpperCase()}.png`);

        interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
      } else {
        const args = this.getArgs(interaction);
        const challenge = [`${args[0]}x${args[1]}`];
        const embed = this.getArgMessage(challenge, false, args[3]);
        const user = interaction.member === null ? interaction.user : interaction.member.user;
        const picture = new MessageAttachment(`images/challenges/EC${args[0]}.png`);
        const isHelper = this.hasHelperRole(interaction);

        if (args[3] === "tree") {
          interaction.reply({ content: this.getArgMessage(challenge, true), ephemeral: !isHelper });
          return;
        }

        embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });
        embed.setThumbnail(`attachment://EC${args[0]}.png`);
        interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
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
    args.push(interaction.options.getString("info"));
    return args;
  }
}

module.exports = {
  ChallengeApplicationCommand,
};