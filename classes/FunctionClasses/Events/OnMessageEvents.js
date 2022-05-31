"use strict";

const Global = require("../../../utils/constants");
const { ids } = require("../../../utils/config.json");
const { Log } = require("../Log");
const { MessageEmbed } = require("discord.js");
const { Time } = require("../Time");
const { Events } = require("./Events");

class OnMessageEvents extends Events {
  constructor(message) {
    super(message);
    this.message = message;
    this.args = message.content.slice(2).trim().split(/ +/u);
  }

  async isScammer() {
    const isMod = await this.isMod();
    return this.message.author.id !== ids.bot &&
    this.message.content.includes("@everyone") &&
    this.message.content.includes("http") &&
    !isMod;
  }

  get intercomCondition() {
    return this.message.content.toLowerCase().startsWith(`++intercom`) && message.author.id === ids.earth;
  }

  async isMod() {
    const mods = await this.mods();
    return await this.message.guildId === ids.AD.serverID ? mods.includes(this.message.author.id) : false;
  }

  async helperCondition() {
    return await this.message.content.toLowerCase() === "++helpers" && ((this.message.author.id === ids.earth && this.message.guildId === ids.AD.serverID) || this.isMod());
  }

  async mods() {
    await this.message.guild.members.fetch();
    return this.message.guild.roles.resolve(ids.AD.modRole).members.map(member => member.id);
  }

  stickerDelete() {
    const message = this.message;
    message.delete()
      .then(() => {
        // Mod logs in antimatter dimensions
        const person = `${message.author.username}#${message.author.discriminator}`;
        Global.client.channels.cache.get(ids.AD.modLogs).send(`${person} sent a sticker in <#${message.channelId}>.`);
        Log.info(`[${Date()}] ${person} sent a sticker in <#${message.channelId}>.`);
      }).catch(error => {
        Log.error(`[${Date()}] ${error}`);
      });
  }

  mentioned() {
    const message = this.message;
    message.author.send("hey, you mentioned me! I'm here to help you! For more information about commands, check out `/help`! you can use me in DMs as well!");
  }

  async helpers() {
    const message = this.message;
    const roleInfo = await this.message.guild.roles.resolve(ids.helperRole);
    const namesAndIDs = roleInfo.members.map(member => `${member.user.username}#${member.user.discriminator} (${member.user.id}) [${member.roles.highest.name}]`);

    Log.info(namesAndIDs.join("\n"));
    message.reply(`Currently, ${roleInfo.members.size} person(s) have the Helper role.`);
    message.author.send(namesAndIDs.join("\n"));
  }

  async intercom() {
    let id;
    const message = this.message;
    const args = this.args;
    if (args[0].length === "213071245896450068".length) id = args[0];
    else id = Global.lastErrorUserID;
    const user = await Global.client.users.fetch(id);
    Global.lastErrorUserID = id;
    const person = `${user.username}#${user.discriminator}`;
    const sent = id === args[0] ? message.content.slice(`++intercom`.length + id.length + 2) : message.content.slice(`++intercom`.length);
    user.send(`${sent}\n**/-------------------------------------------------------------/**\n the above message was sent by earth#1337, the owner of the bot. this is a one way intercom.`).catch(error => {
      Log.error(`[${Date()}] ${error}`);
      message.reply(`Cannot send messages to ${person}.`);
    });
    Log.info(`Intercom message successfully sent to ${person}. Message: \n
    ${sent}`);
    message.reply(`Successfully sent message to ${person}.`);
  }

  muteScammers() {
    const message = this.message;
    const embed = new MessageEmbed()
      .setTitle(`${message.author.username}#${message.author.discriminator}`)
      .setThumbnail(message.author.avatarURL())
      .setColor("BLURPLE")
      .addField("Message", message.content)
      .setDescription(`Message sent by <@${message.author.id}> was deleted and member was muted.`)
      .setTimestamp(Time.newDate());
    // Add muted
    message.member.roles.add(message.guild.roles.cache.get(ids.mutedRole));
    // Delete message
    message.delete();
    // Send deleted message in #modchannel
    message.guild.channels.cache.get(ids.AD.modChannel).send({ embeds: [embed] });
  }

  async run() {
    if (this.message.mentions.has("830197123378053172")) this.mentioned();
    try {
      if (this.message.guildId === ids.AD.serverID) {
        if (this.message.stickers.size > 0) this.stickerDelete();
        if (await this.isScammer()) this.muteScammers();
        if (this.message.channelId === ids.AD.general) return;
        if (!this.message.content.startsWith("++")) return;
        if (!Global.client.application?.owner) await Global.client.application?.fetch();
      }
      if (this.intercomCondition) await this.intercom();
    } catch (error) {
      Log.error(`[${Date()}] ${error}`);
    }
  }
}

module.exports = { OnMessageEvents };