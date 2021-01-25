const { Message, MessageEmbed } = require("discord.js");
const Client = require("../src/client");
const fs = require("fs");
const rules = fs.readFileSync("./rules.txt");
const warnModel = require("../models/warn");
const max = "4";

async function r4(client, message, args, user) {
  const embed = new MessageEmbed()
    .setAuthor(user.user.tag, user.user.avatarURL({ dynamic: true }))
    .addField("User:", user)
    .addField("Staff:", message.author)
    .setThumbnail(user.user.avatarURL({ dynamic: true }));
  message.channel.send(`Ok proper Action was taken thanks for letting me know`);
  let rulenumber = "#2";
  let reason = "Using Excessive Cursing";

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
      action: ["Warning"],
    });
    await warnDoc.save();
    client.config.chan.send(
      `${user} Was Warned! For ${reason} Rule: ${rulenumber}`
    );
    embed.addField("Offence:", "1");
    embed.addField("Rule:", rulenumber);
    embed.addField("Reason:", reason);
    embed.setTitle("Warn");
    embed.setTimestamp();
    client.config.channel.send(embed);
    return;
  } else {
    if (warnDoc.offence === "3") {
      client.config.chan.send(
        `${user} Was Temp Muted For 30 Minutes! For: ${reason} Rule: ${rulenumber}`
      );
      user.roles.add(client.config.mute.id);
      let action2;
      let newoffence = Number(warnDoc.offence) + 1;
      if (newoffence === 4) action2 = "Temp Mute";
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
      embed.addField("Lasts:", "30 Minutes");
      embed.setTitle("Temp Mute");
      embed.setTimestamp();
      client.config.channel.send(embed);
      setTimeout(() => {
        user.roles.remove(client.config.mute.id);
        client.config.chan.send(`${user} Was Unmuted for: Time Is Up!`);

        embed.addField("Reason:", "Time is up!");
        embed.addField("Lasted:", "30 Minutes");
        embed.setTitle("Temp Mute");
        embed.setTimestamp();
        client.config.channel.send(embed);
      }, 1800000);
      return;
    } else if (warnDoc.offence === "4") {
      client.config.chan.send(
        `${user} Was Kicked For: ${reason} Rule: ${rulenumber}`
      );
      user.kick({ reason });
      let action2;
      let newoffence = Number(warnDoc.offence) + 1;
      if (newoffence === 5) action2 = "Kick";
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
      embed.setTitle("Kick");
      embed.setTimestamp();
      client.config.channel.send(embed);
      return;
    } else if (warnDoc.offence === "5") {
      client.config.chan.send(
        `${user} Was Banned For ${reason} Rule: ${rulenumber}`
      );
      client.config.main.members.ban(user.id, { reason });
      let action2;
      let newoffence = Number(warnDoc.offence) + 1;
      if (newoffence === 6) action2 = "Ban";
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
    } else {
      let action2;
      let newoffence = Number(warnDoc.offence) + 1;
      if (newoffence === 2) action2 = "Warning";
      if (newoffence === 3) action2 = "Warning";
      warnDoc.warnings.push(reason);
      warnDoc.moderator.push(message.author.tag);
      warnDoc.date.push(new Date());
      warnDoc.rule.push(rulenumber);
      warnDoc.action.push(action2);
      warnDoc.offence = newoffence.toString();
      await warnDoc.save().catch((err) => console.log(err));
      if (action2 === "Warning") {
        embed.addField("Offence:", newoffence);
        embed.addField("Rule:", rulenumber);
        embed.addField("Reason:", reason);
        embed.setTimestamp();
        embed.setTitle("Warn");
        client.config.channel.send(embed);
        return client.config.chan.send(
          `${user} Was Warned! For ${reason} Rule: ${rulenumber}`
        );
      }
    }
  }
}
module.exports = {
  r4,
};
