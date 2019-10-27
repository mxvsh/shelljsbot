import bot from "../bot";
import { Execute } from "../lib/process";
import db from "../db";

import session from "telegraf/session";
import Stage from "telegraf/stage";
import ExecWizard from "./scenes/exec";

const stage = new Stage([ExecWizard]);
bot.use(session());
bot.use(stage.middleware());
bot.hears(/\/exec ?((.|\n)*)?/, async (ctx: any) => {
  bot.telegram.sendChatAction(ctx.chat.id, "typing");
  const [, command] = ctx.match;
  if (command) {
    const then = new Date().getTime();
    Execute(command).then(async (output: string) => {
      const time_taken = new Date().getTime() - then;
      await ctx.reply(output || "Program executed");
      if (db.get("send_time_taken").value()) {
        ctx.reply(`Time taken: <code>${time_taken}ms</code>`, {
          parse_mode: "html"
        });
      }
    });
  } else {
    ctx.scene.enter("Exec");
  }
});
