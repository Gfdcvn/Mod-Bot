const { Message, MessageEmbed } = require("discord.js");
const Client = require("../src/client");
const fs = require("fs");
const rules = fs.readFileSync("./rules.txt");
const warnModel = require("../models/warn");

module.exports = {
  name: "punish",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    if (!message.member.roles.cache.has("788094783607537725"))
      return message.channel.send(`Error! Your Not A <@&788094783607537725>!`);
    var user =
      message.mentions.members.first() || client.users.cache.get(args[1]);
    if (!user) return message.channel.send(`Error! No User Provided!`);

    const memberPosition = user.roles.highest.position;
    const authorPotation = message.member.roles.highest.position;

    if (authorPotation <= memberPosition)
      return message.channel.send(
        "You Can't punish this member. There Higher Or Equal To your."
      );
    message.reply(`Please Select a rule! \n ${rules}`);

    const filter3 = (m) => m.author.id === message.member.id;

    var department3 = (await message.channel.awaitMessages(filter3, { max: 1 }))
      .first()
      .content.toLowerCase();

    const { one, two, three, r4, r5, r6, r7, r8 } = require("../rules/main");

    if (department3 === "1") {
      return one(client, message, args, user);
    }
    if (department3 === "2") {
      return two(client, message, args, user);
    }
    if (department3 === "3") {
      return three(client, message, args, user);
    }
    if (department3 === "4") {
      return r4(client, message, args, user);
    }
    if (department3 === "5") {
      return r5(client, message, args, user);
    }
    if (department3 === "6") {
      return r6(client, message, args, user);
    }
    if (department3 === "7") {
      return r7(client, message, args, user);
    }
    if (department3 === "8") {
      return r8(client, message, args, user);
    } else {
      return message.reply("Invalid Rule selection!");
    }
  },
};
