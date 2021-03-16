const { Message, MessageEmbed } = require("discord.js");
const Client = require("../src/client");
const fs = require("fs");
const rules = fs.readFileSync("./rules.txt");
const warnModel = require("../models/warn");
const max = "4";

async function r7age(client, message, args, user) {
  const embed = new MessageEmbed()
    .setAuthor(user.user.tag, user.user.avatarURL({ dynamic: true }))
    .addField("User:", user)
    .addField("Staff:", message.author)
    .setThumbnail(user.user.avatarURL({ dynamic: true }));
  message.channel.send(`Ok proper Action was taken thanks for letting me know`);
  let rulenumber = "#7";
  let reason = "Under the age of 13";

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

async function r7(client, message, args, user) {
  const embed = new MessageEmbed()
    .setAuthor(user.user.tag, user.user.avatarURL({ dynamic: true }))
    .addField("User:", user)
    .addField("Staff:", message.author)
    .setThumbnail(user.user.avatarURL({ dynamic: true }));
  message.channel.send(`Ok proper Action was taken thanks for letting me know`);
  let rulenumber = "#7";
  let reason = "Discord TOS Violation";

  let warnDoc = await warnModel.findOne({
    guildID: message.guild.id,
    memberID: user.id,
  });

  if (!warnDoc) {
    warnDoc = new warnModel({
      guildID: message.guild.id,
      memberID: user.id,
      warnings: [reason],
      moderator: [message.author.tag],
      date: [new Date()],
      offence: "1",
      rule: [rulenumber],
      action: ["Ban"],
    });
    await warnDoc.save();
    client.config.chan.send(
      `${user} Was Banned! For ${reason} Rule: ${rulenumber}`
    );
    embed.addField("Offence:", "1");
    embed.addField("Rule:", rulenumber);
    embed.addField("Reason:", reason);
    embed.setTitle("Warn");
    embed.setTimestamp();
    client.config.channel.send(embed);
    return;
  } else {
    client.config.chan.send(
      `${user} Was Banned For ${reason} Rule: ${rulenumber}`
    );
    client.config.main.members.ban(user.id, { reason });
    let action2;
    let newoffence = Number(warnDoc.offence) + 1;

    warnDoc.warnings.push(reason);
    warnDoc.moderator.push(message.author.tag);
    warnDoc.date.push(new Date());
    warnDoc.rule.push(rulenumber);
    warnDoc.action.push(action2);
    warnDoc.offence = newoffence.toString();
    await warnDoc.save().catch((err) => console.log(err));
    embed.addField("Offence:", newoffence);
    embed.addField("Rule:", rulenumber);
    embed.addField("Reason:", reason);
    embed.setTitle("Ban");
    embed.setTimestamp();
    client.config.channel.send(embed);
    return;
  }
}
module.exports = {
  r7,
  r7age,
};
