/* eslint-disable max-len */
"use strict";

const AchievementsCommand = require("../commands/5/achievements");
const AntitablesCommand = require("../commands/6/antitables");
const ChallengeCommand = require("../commands/5/challenge");
const DilationtreesCommand = require("../commands/4/dilationtrees");
const infinitygrindingCommand = require("../commands/3/infinitygrinding");
const RealityCommand = require("../commands/8/reality");
const PeopleCommand = require("../commands/69/people");
const HowtoplayCommand = require("../commands/6/howtoplay");

/**
 * @param {string} command - The command to get the message object for.
 * @returns {Object} - The message object for the command.
 */
function getMessageObject(command) {
  switch (command) {
    case "antitables": return AntitablesCommand.command.messageObject;
    case "achievements": return AchievementsCommand.command.messageObject;
    case "challenge": return ChallengeCommand.command.messageObject;
    case "dilationtrees": return DilationtreesCommand.command.messageObject;
    case "infinitygrinding": return infinitygrindingCommand.command.messageObject;
    case "reality": return RealityCommand.command.messageObject;
    case "people": return PeopleCommand.command.messageObject;
    case "howtoplay": return HowtoplayCommand.command.messageObject;
    default: return `Unknown message object.`;
  }
}

function htpChoices(which) {
  const choices = [];
  const htp = getMessageObject("howtoplay");
  for (const thing in htp[which]) {
    choices.push({
      name: thing,
      description: thing,
      type: "SUB_COMMAND"
    });
  }
  return choices;
}

/**
 * Gets the choices for a specific command.
 * @param {string} command - The command to get the choices for.
 * @param {string} which - Used in eternitychallenge for getting both completions and challenges.
 * @returns {Array} - The choices for the command.
 */
function getChoices(command, which) {
  const choices = [];
  if (command === "achievements") {
    for (const ach in getMessageObject(command)) {
      if (!ach.startsWith("r")) {
        choices.push({
          name: ach,
          value: ach,
          type: "STRING"
        });
      }
    }
  } else if (command === "eternitychallenge") {
    let max = 0;
    if (which === "challenges") max = 12;
    else max = 5;
    for (let i = 1; i <= max; i++) {
      choices.push({
        name: i,
        value: i,
        type: "NUMBER"
      });
    }
  } else if (command === "studytree") {
    choices.push({
      name: "active",
      value: "active",
      type: "STRING",
    }, {
      name: "passive",
      value: "passive",
      type: "STRING",
    }, {
      name: "idle",
      value: "idle",
      type: "STRING",
    });
  } else if (command === "people") {
    const mo = getMessageObject(command);
    if (which === "moderators") {
      for (const mod in mo.moderators) {
        choices.push({
          name: mod,
          description: mod,
          type: "SUB_COMMAND"
        });
      }
    } else if (which === "nonmods") {
      for (const nonmod in mo.nonmods) {
        choices.push({
          name: nonmod,
          description: nonmod,
          type: "SUB_COMMAND"
        });
      }
    }
  } else if (command === "howtoplay") {
    return htpChoices(which);
  } else {
    for (const ach in getMessageObject(command)) {
      choices.push({
        name: ach,
        value: ach,
        type: "STRING"
      });
    }
  }
  return choices;
}

module.exports = {
  getChoices,
  all: [
    {
      name: "161or162",
      description: "Early Eternity command. Explains whether to chose TS161 or TS162"
    },
    {
      name: "1minuteinf",
      description: "explains the UI change at infinity in under a minute"
    },
    {
      name: "5hours",
      description: "Explains the long-standing 5 hours joke"
    },
    { name: "abb", description: "sends an abbreviation guide" },
    {
      name: "achievements",
      description: "sends link to achievements guide",
      options: [{
        name: "achievement",
        type: "STRING",
        description: "which achievement do you want to see a guide for? choice not required!",
        required: false,
        choices: getChoices("achievements")
      }]
    },
    {
      name: "adbonus",
      description: "Sends ad bonus formulas/multipliers"
    },
    {
      name: "androidorweb",
      description: "sends the pinned message from the mobile channel describing the differences."
    },
    {
      name: "antitables",
      description: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables.",
      options: [{
        name: "when",
        type: "STRING",
        description: "At what point in the game are you? prebreak, postbreak, or posteternity?",
        required: true,
        choices: getChoices("antitables")
      }]
    },
    {
      name: "bankedinfinities",
      description: "describes banked infinities, what they do, and how to get them."
    },
    {
      name: "bottombuttons",
      description: "shows what the bottom buttons are"
    },
    {
      name: "breakinfinity",
      description: "describes break infinity and gives an order to get break infinity upgrades"
    },
    {
      name: "bugo",
      description: "sends that screenshot of the break infinity upgrade order spreadsheet"
    },
    { name: "bulkbuy", description: "describes bulk buy" },
    { name: "c9", description: "shorthand for `/challenge c9`" },
    {
      name: "challenge",
      description: "Args: all challenges, including `ecs`. Returns a guide for each argument.",
      options: [{
        name: "challenge",
        type: "STRING",
        description: "What challenge would you like to see a guide for?",
        required: true,
        choices: getChoices("challenge")
      },
      {
        name: "info",
        type: "STRING",
        description: "(Optional) What information about the challenge do you want to see?",
        required: false,
        choices: [{
          name: "unlock",
          value: "unlock",
          type: "STRING",
          description: "Shows requirements to unlock challenge"
        }, {
          name: "challenge",
          value: "challenge",
          type: "STRING",
          description: "Shows the challenge itself"
        }, {
          name: "goal",
          value: "goal",
          type: "STRING",
          description: "Shows the challenge goal"
        }, {
          name: "strategy",
          value: "strategy",
          type: "STRING",
          description: "Shows the challenge strategy"
        }, {
          name: "reward",
          value: "reward",
          type: "STRING",
          description: "Shows the challenge reward (and formula, when applicable)"
        }]
      }]
    },
    {
      name: "challengecodes",
      description: 'Sends a picture with all of the challenges notated with their "code"'
    },
    {
      name: "changeectree",
      description: "Describes how to change your tree for doing an EC"
    },
    {
      name: "channels",
      description: "Sends a list of channels and their ids/part of game progress"
    },
    {
      name: "columns",
      description: "sends an image with the columns of infinity upgrades"
    },
    {
      name: "commands",
      description: "sends a link to the website with all commands"
    },
    {
      name: "contributors",
      description: "sends a list of contributors and what they helped with!"
    },
    {
      name: "deadchat",
      description: "sends that one message from spec that he said that one time"
    },
    {
      name: "decimal",
      description: "Explains how break_infinity.js works"
    },
    { name: "dilation", description: "describes dilation" },
    {
      name: "dilationgrind",
      description: "sends a message pertaining to reaching dilation"
    },
    {
      name: "dilationtrees",
      description: "Sends a tree for your progress in dilation, `first` or `after3paths`",
      options: [{
        name: "when",
        type: "STRING",
        description: "At what point in the game are you? `first` or `after3paths`?",
        required: true,
        choices: getChoices("dilationtrees")
      }]
    },
    {
      name: "dimboostorgalaxy",
      description: "tells you if you should do a dimboost or galaxy"
    },
    {
      name: "discordformatting",
      description: "returns a link to a list of discord formatting stuff"
    },
    {
      name: "earlyeternityprogression",
      description: "describes getting through the first few eternities"
    },
    {
      name: "earlyinfinity",
      description: "Describes how to progress pre-2x better Galaxies"
    },
    { name: "ec",
      description: "shorthand for /eternitychallenge",
      options: [{
        name: "ec",
        type: "NUMBER",
        description: "What Eternity Challenge are you doing?",
        required: true,
        choices: getChoices("eternitychallenge", "challenges")
      },
      {
        name: "completion",
        type: "NUMBER",
        description: "What is the completion number?",
        required: true,
        choices: getChoices("eternitychallenge", "completions")
      },
      {
        name: "hide",
        type: "BOOLEAN",
        description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.",
        required: false
      }]
    },
    {
      name: "eco",
      description: "Shorthand of /eternitychallengeorder.",
      options: [{
        name: "ec",
        type: "NUMBER",
        description: "What Eternity Challenge are you doing?",
        required: false,
        choices: getChoices("eternitychallenge", "challenges")
      },
      {
        name: "completion",
        type: "NUMBER",
        description: "What is the completion number?",
        required: false,
        choices: getChoices("eternitychallenge", "completions")
      }]
    },
    { name: "ecs", description: "shorthand for `/challenge ecs`" },
    {
      name: "eep",
      description: "shorthand for /earlyeternityprogression"
    },
    {
      name: "ep",
      description: "calculates the amount of IP required to get the number of EP specified < 1000.",
      options: [{
        name: "ep",
        type: "NUMBER",
        description: "How many EP do you want to calculate?",
        required: true
      }]
    },
    {
      name: "eternitychallenge",
      description: "Requires one argument: `/eternitychallenge [ECNumber]x[CompletionNumber]`.",
      options: [{
        name: "ec",
        type: "NUMBER",
        description: "What Eternity Challenge are you doing?",
        required: true,
        choices: getChoices("eternitychallenge", "challenges")
      },
      {
        name: "completion",
        type: "NUMBER",
        description: "What is the completion number?",
        required: true,
        choices: getChoices("eternitychallenge", "completions")
      },
      {
        name: "hide",
        type: "BOOLEAN",
        description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.",
        required: false
      }]
    },
    {
      name: "eternitychallengeorder",
      description: "Returns the EC order. Will show the previous EC when provided a challenge.",
      options: [{
        name: "ec",
        type: "NUMBER",
        description: "What Eternity Challenge are you doing?",
        required: false,
        choices: getChoices("eternitychallenge", "challenges")
      },
      {
        name: "completion",
        type: "NUMBER",
        description: "What is the completion number?",
        required: false,
        choices: getChoices("eternitychallenge", "completions")
      }]
    },
    {
      name: "eternitygrinding",
      description: "describes how to eternity grind",
      options: [{
        name: "when",
        type: "STRING",
        description: "at what point in the game you are. early < 110k eternities, late < 1m",
        required: true,
        choices: [
          {
            name: "early",
            value: "early",
            description: "early eternity grinding to get 110k eternities",
            type: "STRING"
          },
          {
            name: "late",
            value: "late",
            description: "late eternity grinding to get 1 million eternities",
            type: "STRING"
          }
        ]
      }]
    },
    {
      name: "failec",
      description: "Describes what ECs you can fail and how/when"
    },
    {
      name: "firstsplit",
      description: "Describes how to progress on the time study tree pre-TS171"
    },
    {
      name: "galaxyboost",
      description: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy"
    },
    {
      name: "galaxyscaling",
      description: "Explains the change in scaling at 100 (and 800) Antimatter Galaxies"
    },
    {
      name: "grindingforbreak",
      description: "Describes how to reach Break Infinity."
    },
    { name: "ic4", description: "shorthand for `/challenge ic4`" },
    { name: "ic5", description: "shorthand for `/challenge ic5`" },
    { name: "importexport", description: "How to import/export saves" },
    {
      name: "infinity",
      description: "tells how much AM you need for infinity"
    },
    {
      name: "infinitydimensions",
      description: "Describes what infinity dimensions (and infinity power) does."
    },
    {
      name: "infinitygrinding",
      description: "Args: `early`, `late`. Early is for EC4, late is for banking infinities.",
      options: [{
        name: "when",
        type: "STRING",
        description: "at what point in the game you are. early is for EC4, late for Binfs",
        required: true,
        choices: [
          {
            name: "early",
            value: "early",
            description: "early infinity grinding to get EC4",
            type: "STRING"
          },
          {
            name: "late",
            value: "late",
            description: "late infinity grinding to get Binfs",
            type: "STRING"
          }
        ]
      }]
    },
    {
      name: "invertedtheme",
      description: "response to the frequent web bug report that the inverted theme is bugged."
    },
    {
      name: "ipepcolor",
      description: "Explains the coloring of the IP/EP numbers on their reset buttons"
    },
    {
      name: "ipepcolour",
      description: "Explains the colouring of the IP/EP numbers on their reset buttons"
    },
    { name: "justask", description: "sends a passive aggressive thing" },
    { name: "matterportal", description: "Matter Portal news tickers" },
    {
      name: "meta",
      description: "internal bot information"
    },
    {
      name: "helper",
      description: "sends a consent form to become a designated helper"
    },
    {
      name: "modifications",
      description: "Explains the modifications of AD"
    },
    {
      name: "news",
      description: "Args: `listmobile` and `listweb`. Args are optional.",
      options: [{
        name: "list",
        type: "STRING",
        description: "list mobile or web news",
        required: false,
        choices: [
          {
            name: "listmobile",
            value: "listmobile",
            description: "list mobile news",
            type: "STRING"
          },
          {
            name: "listweb",
            value: "listweb",
            description: "list web news",
            type: "STRING"
          }
        ]
      }]
    },
    {
      name: "notations",
      description: "Sends a link to the Notations GitHub repo."
    },
    {
      name: "occlusion",
      description: "a guide of how to fix out-of-focus tabs on chrome not giving full progress"
    },
    { name: "offlineticks", description: "offline ticks stuff" },
    {
      name: "oom",
      description: "describes what an OoM (Order of Magnitude) is"
    },
    {
      name: "paperclips",
      description: "Explanation of the origin of paperclips."
    },
    { name: "pins", description: "pins" },
    {
      name: "reality",
      description: "Information surrounding the upcoming reality update.",
      options: [{
        name: "feature",
        type: "STRING",
        description: "Choose a feature/thing you want to know more about",
        required: true,
        choices: getChoices("reality")
      }]
    },
    { name: "respec", description: "Describes what respec studies does" },
    { name: "sacrifice", description: "describes sacrifice and when to" },
    {
      name: "savebank",
      description: "Provides a link to Buck's save bank."
    },
    { name: "secondsplit", description: "describes second split paths" },
    {
      name: "setcrunchauto",
      description: "Describes how to set your crunch autobuyer."
    },
    { name: "site", description: "Says the game site" },
    { name: "slightsmile", description: "kaj no" },
    {
      name: "studytree",
      description: "Generates a Time Study tree based on your total Time Theorems. See /tstreerange",
      options: [{
        name: "theorems",
        type: "NUMBER",
        description: "The number of Time Theorems you have",
        required: true
      },
      {
        name: "path",
        type: "STRING",
        description: "The path you want to use in your tree. Only takes effect after 54 TT",
        required: false,
        choices: getChoices("studytree")
      }]
    },
    {
      name: "swipetrick",
      description: "Explains swipe trick for mobile"
    },
    { name: "thanks", description: "say thanks" },
    {
      name: "ts",
      description: "shorthand for `/studytree`. See /tstreerange",
      options: [{
        name: "theorems",
        type: "NUMBER",
        description: "The number of Time Theorems you have",
        required: true
      },
      {
        name: "path",
        type: "STRING",
        description: "The path you want to use in your tree. Only takes effect after 54 TT",
        required: false,
        choices: getChoices("studytree")
      }]
    },
    {
      name: "tstreerange",
      description: "Says why sometimes the bot will recommend a tree for more TT than you have"
    },
    {
      name: "xkcd",
      description: "has an arg: XKCD number. sends the link to that xkcd",
      options: [{
        name: "xkcd",
        type: "NUMBER",
        description: "XKCD number",
        required: true
      }]
    },
    {
      name: "help",
      description: "Sends a help page.",
      options: [
        {
          name: "page",
          description: "The page to send. Defaults to `1`.",
          type: "INTEGER"
        }
      ]
    },
    {
      name: "people",
      description: `people I know that are cool`,
      options: [
        {
          name: "moderators",
          description: "opinions on moderators",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("people", "moderators")
        },
        {
          name: "nonmods",
          description: "non mods",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("people", "nonmods")
        }
      ]
    },
    {
      name: "time",
      description: "Displays the current time, in Decimal time. https://en.wikipedia.org/wiki/Decimal_time"
    },
    {
      name: "replicanti",
      description: "Describes Replicanti in all of their glory"
    },
    {
      name: "slashcommand",
      description: "explains how TS and EC slash commands work with their args and how to type them"
    },
    {
      name: "howtoplay",
      description: `Pages from the how to play on Mobile.`,
      options: [
        {
          name: "faq",
          description: "pages from the faq",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "faq")
        },
        {
          name: "tickspeed",
          description: "Tickspeed howtoplay",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "tickspeed")
        },
        {
          name: "dimensions",
          description: "Dimensions howtoplay",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "dimensions")
        },
        {
          name: "softresets",
          description: "soft reset how to play pages, f.e. dimboost/galaxy pages",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "softresets")
        },
        {
          name: "achievements",
          description: "describes achievements",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "achievements")
        },
        {
          name: "sacrifice",
          description: "explains sacrifice",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "sacrifice")
        },
        {
          name: "infinity",
          description: "explains infinity",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "infinity")
        },
        {
          name: "challenges",
          description: "explains the three challenge types",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "challenges")
        },
        {
          name: "autobuyers",
          description: "explains autobuyers",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "autobuyers")
        },
        {
          name: "breakinfinity",
          description: "explains replicanti",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "breakinfinity")
        },
        {
          name: "replicanti",
          description: "explains replicanti",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "replicanti")
        },
        {
          name: "eternity",
          description: "explains eternity",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "eternity")
        },
        {
          name: "timestudies",
          description: "explains time studies",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "timestudies")
        },
        {
          name: "dilation",
          description: "explains time dilation",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "dilation")
        },
      ]
    },
    {
      name: "iugo",
      description: "pre break infinity upgrade order routes"
    },
    {
      name: "secretachievements",
      description: "sends link to secret achievement guide."
    },
    {
      name: "xd",
      description: "explains the XD channel"
    },
    {
      name: "roles",
      description: "explains that you can get an Android or Web player role"
    },
    {
      name: "tamtf",
      description: "teach a man to fish"
    },
    {
      name: "user",
      description: "get information about a user",
      options: [{
        name: "user",
        description: "a user",
        type: "USER",
        required: true
      }]
    },
    {
      name: "peakipmin",
      description: "Tells why peak IP/min disappears at e100 IP"
    }
  ],
  find(name) {
    return this.all.find(ob => ob.name === name) ?? "Unknown command";
  }
};