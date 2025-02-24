/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({

    name: "earlyeternityprogression",
    description: "describes getting through the first few eternities",
    check: "earlyEternityCheck",
    sent: [`1.  First eternity's EP on TD1
    2.  (Buying TS21 path + RESPEC) Eternity at e426IP for 3EP, spend all on TT
    3.  (Buy TS42) Eternity at e500IP for 4 EP
    (Buy TS51) Eternity at e614IP for 8EP
    4.  Buy TS61, then get 100 eternities.
    
    Afterwards, check out this flowchart (also pinned in eternity to ec1): https://i.imgur.com/pdmy3bN.png`]
  })
};
