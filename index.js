import { Telegraf } from "telegraf";
import { callbackQuery, message } from "telegraf/filters";

const bot = new Telegraf("7066831640:AAEzqv_wkBARzajt_N-Mv9a4DS_x6uTxY2g")

// commandga javob
bot.command("quit", async (ctx) => {
    // aniq foydalanish
    await ctx.telegram.leaveChat(ctx.message.chat.id)

    // context qisqartmasi
    await ctx.leaveChat()
})

bot.on(message("text"), async (ctx) => {
    // aniq foydalanish
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

    //context qisqartmasi
    await ctx.reply(`Hello ${ctx.state.role}`)
})

bot.on(callbackQuery, async ctx=>{
    await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    await ctx.answerCbQuery()
})

bot.on('inline_query', async (ctx) => {
    const result = ["inline", "query"]
    // Explicit usage
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)
  
    // Using context shortcut
    await ctx.answerInlineQuery(result)
  })

  bot.launch()


  // Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))