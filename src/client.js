const { Client, Collection, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");
const fs = require("fs");
const { prefix, version, apiurl, mongourl } = require("../config");
const { staffserver } = require("../settings/servers");
const { logs } = require("../settings/channels");

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
      var guild = this.guilds.cache.get(staffserver);
      var channel = guild.channels.cache.get(logs);
      channel.send("I Have Started!");
    });
  }
}

module.exports = AnimeClient;
