const mongoose = require("mongoose");

const warn = mongoose.Schema({
  guildID: String,
  memberID: String,
  warnings: Array,
  moderator: Array,
  date: Array,
  offence: String,
  rule: Array,
  action: Array,
});

module.exports = mongoose.model("warn", warn);
