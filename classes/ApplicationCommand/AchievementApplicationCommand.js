"use strict";

const { MessageAttachment } = require("discord.js");
const { ApplicationCommand } = require("./ApplicationCommand");
const { Achievement, achievements } = require("../../utils/achievements");

/**
 * @class AchievementApplicationCommand
 * @extends ApplicationCommand
 * @classdesc Command for executing achievements.js.
 */
class AchievementApplicationCommand extends ApplicationCommand {
  /**
   * Executes the command.
   * @param {Object} interaction - The interaction object used for the command that contains all useful information
   */
  execute(interaction) {
    const args = [this.getArgs(interaction)];
    if (args[0] === null) {
      interaction.reply({ content: this.sent[0], ephemeral: !this.hasHelperRole(interaction) });
      return;
    }
    if (args.length !== 0 && !this.acceptableArgs.includes(args[0])) {
      interaction.reply("This achievement is either useless or can be easily achieved.");
    } else this.regularCommand(interaction, args, interaction.channel.id);
  }

  regularCommand(interaction, args) {
    const achievementInfo = achievements[achievements.findAchievement(args[0])];
    const user = interaction.member === null ? interaction.user : interaction.member.user;
    const isHelper = this.hasHelperRole(interaction);

    const picture = new MessageAttachment(`images/achievements/${achievementInfo.id}.png`);
    const embed = Achievement(achievementInfo)
      .setThumbnail(`attachment://${achievementInfo.id}.png`)
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });

    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
  }
}

module.exports = { AchievementApplicationCommand };