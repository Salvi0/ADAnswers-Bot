/* eslint-disable no-console */
"use strict";

const { combined } = require("../messages");

/**
 * Starts intervals for the bot. Currently, the only interval being started is the switching bot status, and also decimal time
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function startIntervals(client) {
  setInterval(setBotStatus, 15000, client);
}

/**
 * Changes the bot status, currently every minute.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function setBotStatus(client) {
  const next = combined.next();
  console.log(`Changed status to: Listening to${next}`);
  client.user.setActivity(next, { type: "LISTENING" });
}

module.exports = {
  startIntervals,
  setBotStatus
};