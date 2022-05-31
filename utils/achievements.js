"use strict";

const { MessageEmbed } = require("discord.js");

const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Achievement art by Omsi`);

function getFields(achievementInfo) {
  const fields = [
    { name: "Achievement", value: `${achievementInfo.achievement}` },
    { name: "Strategy", value: `${achievementInfo.strategy}` },
  ];

  if (achievementInfo.reward) {
    fields.push({ name: "Reward", value: `${achievementInfo.reward}` });
    if (achievementInfo.rewardFormula) fields.push({ name: "Reward formula", value: `${achievementInfo.rewardFormula}` });
  }

  return fields;
}

const Achievement = achievementInfo => new MessageEmbed()
  .setTitle(`Achievement ${achievementInfo.id} ("${achievementInfo.fullName}")`)
  .setColor("#4980cc")
  // We will set the image in AchievementApplicationCommand
  .addFields(getFields(achievementInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const achievements = {
  "23": {
    id: 23,
    fullName: "9th Dimension is a lie",
    achievement: "Have exactly 99 8th Antimatter Dimensions",
    reward: "8th Antimatter Dimensions are 10% stronger",
    strategy: `Get it after your first galaxy and the 90 8th dim costing dimboost by toggling Until 10 next to tickspeed.`,
  },
  "28": {
    id: 28,
    fullName: "There's no point in doing that...",
    achievement: "Buy a single 1st Antimatter Dimension when you have over 1e150 of them.",
    reward: "1st Antimatter Dimensions are 10% stronger",
    strategy: `After you have e150 1st dims, toggle Until 10 next to tickspeed and buy a 1st dim.`,
  },
  "36": {
    id: 36,
    fullName: `Claustrophobic`,
    achievement: `Infinity with just 1 Antimatter Galaxy. (Your Antimatter Galaxies are reset on Infinity.)`,
    reward: `Multiply starting tick speed by 1.02.`,
    strategy: `Do ***not*** do this on your first Infinity. When you Infinity, Galaxies are reset back to 0, so you can attempt it later when it's easier.`
  },
  "71": {
    id: 71,
    fullName: `Error 909: Dimension Not Found`,
    achievement: `Get to Infinity with only a single 1st Antimatter Dimension without Dimension Boosts or Antimatter Galaxies, while in the 2nd Antimatter Dimension Autobuyer Challenge.`,
    reward: `1st Antimatter Dimensions are 3 times stronger.`,
    strategy: `Do it after the e39 ID2. Disable boost, galaxy and all dim autobuyers, go into C2 and buy 10 1st dims.`
  },
  "77": {
    id: 77,
    fullName: "Zero Deaths",
    achievement: `Get to Infinity without Dimension Boosts or Antimatter Galaxies while in a Normal Challenge.`,
    reward: `Antimatter Dimensions 1-4 are 25% stronger`,
    strategy: `Trivial after you get ID1. Do it in C3. It doesn't need to be attempted early; if it is, it takes about 16+ hours before ID1.`
  },
  "81": {
    id: 81,
    fullName: "Game Design is my Passion/Hevipelle did nothing wrong",
    achievement: `Beat Infinity Challenge 5 in 15 seconds or less.`,
    strategy: `Trivial after Eternity. You can do it before then, but it's more tedious.`
  },
  "87": {
    id: 87,
    fullName: "2 Million Infinities",
    achievement: `Infinity 2 million (2e6) times.`,
    reward: `Infinities more than 5 seconds long give ×250 more Infinities.`,
    strategy: `Buy TS 32, disable galaxy autobuyer, set boost autobuyer to 0s, and crunch autobuyer to 0.1-1s depending on how long it takes to buy dimboosts for 32.`,
  },
  "91": {
    id: 91,
    fullName: `Ludicrous speed`,
    achievement: `Big Crunch for 1e200 Infinity Points in 2 seconds or less.`,
    reward: `All Antimatter Dimensions are significantly stronger in the first 5 seconds of Infinities`,
    rewardFormula: `\`max((5 - time in this infinity in seconds) * 60, 1)\``,
    strategy: `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`
  },
  "92": {
    id: 92,
    fullName: `I break for nobody`,
    achievement: `Big Crunch for 1e250 Infinity Points in 20 seconds or less`,
    reward: `All Antimatter Dimensions are significantly stronger in the first 5 seconds of Infinities`,
    rewardFormula: `\`max((1 - time in this infinity in minutes) * 100, 1)\``,
    strategy: `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`
  },
  "97": {
    id: 97,
    fullName: "Yes, this is hell/Like jumping on a lego",
    achievement: `Get the sum of Infinity Challenge times under 6.66 seconds.`,
    strategy: `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`
  },
  "107": {
    id: 107,
    fullName: "Do you really need a guide for this",
    achievement: `Eternity with less than 10 Infinities`,
    strategy: `Respec out of TS 32 and infinity in under 5s to avoid multiplying your infinity gain. Effortless with TS181. Alternatively, read the achievement image.`
  },
  "108": {
    id: 108,
    fullName: "We could afford 9",
    achievement: `Eternity with **exactly** 9 Replicanti`,
    strategy: `Get it once you can eternity easily without buying replicanti. Then do an eternity and buy 2-3% replicanti chance and a few interval upgrades.`
  },
  "111": {
    id: 111,
    fullName: "Yo dawg, I heard you liked infinities...",
    achievement: `Have all your Infinities in your past 10 Infinities be at least 1.8e308 times higher Infinity Points than the previous one.`,
    reward: `Your antimatter doesn't reset on Dimension Boosts or Antimatter Galaxies`,
    strategy: `Get it once you can quickly reach e4000 IP. Set autocrunch to 2e308 x last, eternity, and wait. We use 2e308 in order to avoid any unlucky errors.`,
  },
  "114": {
    id: 114,
    fullName: "You're a mistake.",
    achievement: "Fail an Eternity Challenge",
    reward: `A fading sense of accomplishment`,
    rewardFormula: `Sense of accomplishment (fading)`,
    strategy: `Can only be done in EC4 and EC12, as those are the only Eternity Challenges that can be failed.`
  },
  "116": {
    id: 116,
    fullName: "Do I really need to infinity",
    achievement: `Eternity with only 1 Infinity`,
    reward: `Multiplier to Infinity Points based on Infinities`,
    rewardFormula: `\`Infinities ^ log10(2) / 4\` (affected by TS31)`,
    strategy: `Respec out of TS 32 and infinity in under 5s to avoid multiplying your infinity gain. Effortless with TS181. Alternatively, read the achievement image for Achievement 107.`
  },
  "125": {
    id: 125,
    fullName: "Like feasting on a behind.",
    achievement: `Reach 1e90 Infinity Points without having any Infinities or any 1st Antimatter Dimensions in your current Eternity.`,
    reward: "Infinity Point multiplier based on time spent this Infinity",
    rewardFormula: `thisInfinity = \`Time.thisInfinity.totalSeconds * 10 + 1\` \n \`2 ^ log(thisInfinity) * min(thisInfinity ^ 0.11, 500)\``,
    // eslint-disable-next-line max-len
    strategy: `Only possible after you buy TS 181. Using idle, disable AD/ID autobuyers and eternity, enter normal challenge 12, and buy a 4th dim. Depending on how many EP you have, it can be achieved instantly or it takes up to 60 minutes.`,
  },
  "126": {
    id: 126,
    fullName: "Popular music",
    achievement: `Have 180 times more Replicanti Galaxies than Antimatter Galaxies`,
    reward: `Replicanti Galaxies divide your Replicanti by 1.8e308 instead of resetting them to 1`,
    strategy: `Reach at least 180 max RGs (can buy antimatter galaxies). Use active path because of 50% more RGs. Disable galaxy autobuyer, crunch, then buy 180 RGs.`
  },
  "131": {
    id: 131,
    fullName: "No ethical consumption",
    achievement: `Get 5e9 Banked Infinities`,
    reward: `After Eternity you permanently keep 5% of your Infinities as Banked Infinities (stacks with TS191 to a total of 10%)`,
    strategy: `See \`/infinitygrinding late\`. Done in conjunction with r134 (When Will It Be Enough).`,
  },
  "133": {
    id: 133,
    fullName: "I never liked this infinity stuff anyways",
    achievement: `Reach 1e200,000 Infinity Points without buying any Infinity Dimensions or the ×2 Infinity Point multiplier`,
    reward: "You start Eternities with all Infinity Challenges unlocked and completed",
    rewardFormula: `Due to eternity milestone 7 you beat ICs as soon as you unlock them. But you don't have the rewards in the first few ticks on a new eternity, because you still need to reach the amount of AM to unlock those ICs.
    This achievements grants you those rewards even if you haven't unlocked ICs yet.
    However, this achievement reward is pretty much negligible as not having the IC rewards in the first ~100ms won't hinder you that much.`,
    strategy: `Disable your ID autobuyer and the autobuyer for the 2xIP multiplier on the Infinity Upgrades (not Break Infinity Upgrades!) tab`
  },
  "134": {
    id: 134,
    fullName: "When Will It Be Enough",
    achievement: `Reach 1e18,000 Replicanti`,
    reward: `You gain Replicanti 2 times faster under 1.8e308 Replicanti`,
    strategy: `Disable RG autobuyer while grinding banked infinities and wait. Done in conjunction with r131 (No Ethical Consumption). Takes 9 hours on mobile, 30 on web.`
  },
  findAchievement(name) {
    return Object.keys(achievements).find(key => achievements[key].fullName === name);
  }
};

module.exports = {
  Achievement,
  achievements
};