"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { Log } = require("../FunctionClasses/Log");

/**
 * @class TimeStudyApplicationCommand
 * @extends ApplicationCommand
 * @classdesc Command for executing ec/eco/ecs/eternitychallenge/eternitychallengeorder/studytree/ts.js
 */
class TimeStudyApplicationCommand extends ApplicationCommand {
  /**
   * @inherentdoc
   */
  constructor(config) {
    super(config);
    this.ephemeral = config.ephemeral;
    if (this.acceptableArgs !== undefined) {
      this.argKey = [];
      this.argType = [];
      if (this.isECOorEC()) {
        this.argKey[0] = config.argInfo.ec.key;
        this.argType[0] = config.argInfo.ec.type;
        this.argKey[1] = config.argInfo.completion.key;
        this.argType[1] = config.argInfo.completion.type;
      } else if (this.isTS()) {
        this.argKey[0] = config.argInfo.tt.key;
        this.argType[0] = config.argInfo.tt.type;
        this.argKey[1] = config.argInfo.path.key;
        this.argType[1] = config.argInfo.path.type;
      } else if (this.isPeople()) {
        this.argKey[0] = config.argInfo.type.key;
        this.argType[0] = config.argInfo.type.type;
        this.argKey[1] = config.argInfo.name.key;
        this.argType[1] = config.argInfo.name.type;
        this.messageObject = config.messageObject;
      } else if (this.isHTP()) {
        this.argKey[0] = config.argInfo.type.key;
        this.argType[0] = config.argInfo.type.type;
        this.argKey[1] = config.argInfo.page.key;
        this.argType[1] = config.argInfo.page.type;
        this.messageObject = config.messageObject;
      } else {
        this.argKey = config.argInfo.key;
        this.argType = config.argInfo.type;
      }
    }
  }

  /**
   * Checks if the command is TS or EC.
   * @return {boolean}
   */
  isTSorEC() {
    return this.name === "ec" ||
    this.name === "eternitychallenge" ||
    this.name === "ts" ||
    this.name === "studytree";
  }

  /**
   * Checks if the command is TS.
   * @return {boolean}
   */
  isTS() {
    return this.name === "ts" ||
    this.name === "studytree";
  }

  isPeople() {
    return this.name === "people";
  }

  isHTP() {
    return this.name === "howtoplay";
  }

  /**
   * Checks if the command is EC.
   * @return {boolean}
   */
  isEC() {
    return this.name === "ec" ||
    this.name === "eternitychallenge";
  }

  /**
   * Checks if the command is ECO or EC.
   * @return {boolean}
   */
  isECOorEC() {
    return this.name === "ec" ||
    this.name === "eternitychallenge" ||
    this.name === "eco" ||
    this.name === "eternitychallengeorder";
  }

  isTSorECorECO() {
    return this.name === "ec" ||
    this.name === "ts" ||
    this.name === "eco";
  }

  /**
   * @inheritdoc
   * @return {Array}
   */
  getArgs(interaction) {
    const args = [];
    if (this.isECOorEC()) {
      args.push(interaction.options.getNumber("ec"));
      args.push(interaction.options.getNumber("completion"));
      if (this.isEC()) args.push(interaction.options.getBoolean("hide"));
      return args;
    }
    if (this.isTS()) {
      args.push(interaction.options.getNumber("theorems"));
      args.push(interaction.options.getString("path"));
      return args;
    }
    if (this.isPeople() || this.isHTP()) {
      args.push(interaction.options._group);
      args.push(interaction.options._subcommand);
      return args;
    }
    if (this.argType === "string") args.push(interaction.options.getString(this.argKey));
    if (this.argType === "number") args.push(interaction.options.getNumber(this.argKey));
    return args;
  }

  /**
   * @inheritdoc
   */
  execute(interaction) {
    let argMessage;
    let argMessageWithDM;
    let args;
    const allArgs = this.getArgs(interaction);
    const isHelper = this.hasHelperRole(interaction);

    if (this.isECOorEC()) args = [`${allArgs[0]}x${allArgs[1]}`];
    else if (this.isTS()) {
      args = allArgs;
      if (!args[1]) args[1] = "active";
    } else if (this.isPeople() || this.isHTP()) {
      args = allArgs;
    }

    if (this.type !== "shorthand" || this.isTSorECorECO()) {
      argMessage = this.getArgMessage(args);
      argMessageWithDM = this.getArgMessage(args, true);
    } else if (this.type === "shorthand") {
      argMessage = this.sent[0];
      argMessageWithDM = this.sent[0];
    }

    if (this.isEC() && isHelper) {
      interaction.reply({ content: argMessage, ephemeral: allArgs[2] }).catch(e => Log.error(`Unexpected error in EC command. ${e}`));
      interaction.followUp({ content: argMessageWithDM, ephemeral: allArgs[2] }).catch(e => Log.error(`Unexpected error in EC command. ${e}`));
      return;
    }

    interaction.reply({ content: argMessage, ephemeral: !isHelper }).catch(e => Log.error(`Unexpected error in ${this.name} command. ${e}`));
    if (this.isEC()) interaction.followUp({ content: argMessageWithDM, ephemeral: !isHelper }).catch(e => Log.error(`Unexpected error in ${this.name} command. ${e}`));
  }
}

module.exports = { TimeStudyApplicationCommand };