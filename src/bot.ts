import telegraf from "telegraf";
const bot = new telegraf(process.env.BOT_TOKEN, {
  username: process.env.BOT_USERNAME
});
export default bot;
