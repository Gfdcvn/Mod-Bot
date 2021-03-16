const { Message, MessageEmbed } = require("discord.js");
const Client = require("../src/client");
const fs = require("fs");
const rules = fs.readFileSync("./rules.txt");
const warnModel = require("../models/warn");
const max = "4";

async function r11(client, message, args, user) {
  const embed = new MessageEmbed()
    .setAuthor(user.user.tag, user.user.avatarURL({ dynamic: true }))
    .addField("User:", user)
    .addField("Staff:", message.author)
    .setThumbnail(user.user.avatarURL({ dynamic: true }));
  message.channel.send(`Ok proper Action was taken thanks for letting me know`);
  let rulenumber = "#11";
  let reason = "Under the age of 18";

  let warnDoc = await warnModel.findOne({
    guildID: message.guild.id,
    memberID: user.id,
  });

  client.config.chan.send(
    `${user} Was Banned For ${reason} Rule: ${rulenumber}`
  );
  client.config.main.members.ban(user.id, { reason });

  embed.addField("Offence:", "NO OFFENCE NUMBER PERMA BAN");
  embed.addField("Rule:", rulenumber);
  embed.addField("Reason:", reason);
  embed.setTitle("Ban");
  embed.setTimestamp();
  client.config.channel.send(embed);
  return;
}
module.exports = {
  r11,
};
