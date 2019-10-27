import WizardScene from "telegraf/scenes/wizard";
import shell from "shelljs";
import bot from "../../bot";

const ExecWizard = new WizardScene(
  "Exec",
  ctx => {
    ctx.reply("⛏ Send commands...");
    ctx.wizard.next();
  },
  async ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    if (ctx.session.w_dir) {
      shell.cd(ctx.session.w_dir);
    }
    const command = ctx.message.text;
    const w_dir = command.match(/^cd (.*)$/);
    w_dir ? shell.cd(w_dir[1]) : null;
    const output = shell.exec(command, {
      silent: true
    });
    if (output.stdout && output.stdout.length > 4090) {
      ctx.replyWithDocument({
        source: Buffer.from(output.stdout),
        filename: `output_${new Date().getTime()}`
      });
    } else ctx.reply(output.stdout || "Executed");
  }
);

export default ExecWizard;
