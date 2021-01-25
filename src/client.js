const { Client, Collection, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");
const fs = require("fs");
const { prefix, version, apiurl, mongourl } = require("../config");
const { staffserver, mainserver } = require("../settings/servers");
const { logs, gen } = require("../settings/channels");
const mongoose = require("mongoose");
mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(console.log("Mongo Activated.."));

class AnimeClient extends Client {
  constructor() {
    super({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
    this.commands = new Collection();
  }
  start(token, cmd) {
    this.login(token);
    readdirSync(join(process.cwd(), cmd)).map((data) => {
      var file = require(join(process.cwd(), cmd, data));
      this.commands.set(file.name, file);
    });

    this.on("ready", async () => {
      console.log("Bot Has Started!");
      this.user.setPresence({
        activity: { name: "Chats", type: "WATCHING" },
        status: "dnd",
      });
    });
    this.on("message", async (message) => {
      if (message.author.bot || !message.guild) return;
      if (!message.content.toLowerCase().startsWith(prefix)) return;
      let staff = this.guilds.cache.get(staffserver);
      let main = this.guilds.cache.get(mainserver);
      var guild = this.guilds.cache.get(staffserver);
      var guild2 = this.guilds.cache.get(mainserver);
      var channel = guild.channels.cache.get(logs);
      var chan = guild2.channels.cache.get(gen);
      var mute = main.roles.cache.get("664354061717340200");

      this.config = {
        prefix,
        staff,
        main,
        channel,
        chan,
        mute,
      };

      let args = message.content
        .slice(this.config.prefix.length)
        .trim()
        .split(" ");
      const cmd = args[0];
      const command = this.commands.get(cmd.toLowerCase());
      if (!command) return;
      command.run(this, message, args).catch(console.error);
    });
  }
}

module.exports = AnimeClient;
