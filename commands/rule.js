const { Message, MessageEmbed } = require("discord.js");
const Client = require("../src/client");
const fs = require("fs");
const rules = fs.readFileSync("./rules.txt");
const warnModel = require("../models/warn");

module.exports = {
  name: "rule",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.roles.cache.has("814142348258181141"))
      return message.channel.send(`Error! Your Not A <@&814142348258181141>!`);
    const embed = new MessageEmbed()
      .setTitle("Rules:")
      .setFooter("Updated: 9:10PM EST/EDT 3/14/21")
      .setColor("#df00fa");
    const felids = {
      {
        name: "**1.**",
        value: "No advertising (on the server or via DM)",
        inline: true,
      },
      { name: "**2.**", value: "test", inline: true },
    };
    for (const { name, value, inline } in felids) {
      embed.addField(name, value, inline);
    }
    await message.channel.send(embed);
    // message.react("");
  },
};
