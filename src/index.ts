require("dotenv").config();
const { ADMIN_ID } = process.env;
import bot from "./bot";

// Midlleware
bot.use(async (ctx, next) => {
  if (ADMIN_ID.split(",").indexOf(ctx.from.id.toString()) < 0) {
    ctx.reply(`❌ You are not authorized to use this bot.`);
  } else {
    next();
  }
});

// Load Handlers
require("./handlers/command");
require("./handlers/setting");

// Launch the bot
bot.launch();
