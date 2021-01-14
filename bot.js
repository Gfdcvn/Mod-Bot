const { token } = require("./config");
const AnimeClient = require("./src/client");
new AnimeClient().start(token, "./commands");
