import { Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const bot = new Telegraf("7066831640:AAEzqv_wkBARzajt_N-Mv9a4DS_x6uTxY2g");

const sardor = 1179267491;
const admins = [sardor];

bot.command("start", async (ctx) => {
  //   await ctx.sendAnimation(
  //     "https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif"
  //   );
  await ctx.sendMessage(
    `Salom ${ctx.message.from.first_name} 🖐 \nFilm nomini yoki kodini kriting✍️`
  );
});

bot.command("settings", async (ctx) => {
  // await ctx.setChatMenuButton("hello menu button")
  Markup.button.text("salom markup button", false);
});


bot.command("video", (ctx)=>{
  console.log("maybe it doesn't work");
  ctx.replyWithVideo({ url: "http://fayllar1.ru/28/kinolar/Godzilla%20minus%201%202024%201080p%20O'zbek%20tilida%20(asilmedia.net).mp4" }, { caption: "movie title" });
})

bot.on(message("text"), async (ctx) => {
  if (admins.includes(ctx.chat.id)) {
    await ctx.reply(`You are admin`);
  } else {
    await ctx.reply(`🫡`);
    await ctx.reply(`Film qidirilmoqda....`);
  }
});

// bot.on(message("video"), async (ctx) => {
//   if (admins.includes(ctx.chat.id)) {
//     await ctx.reply(`You are admin and you send video message`);
//   } else {
//     await ctx.reply(
//       `This feature available soon but now you can send movie code or name only`
//     );
//   }
// });


bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
