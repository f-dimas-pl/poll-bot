import {Bot, GrammyError, HttpError, InlineKeyboard, session} from "grammy";
import "dotenv/config";
import API_CONFIG from "./config/api.config.js";
const bot = new Bot(API_CONFIG.botToken);
import startCommand from "./handlers/command/start.js";
import requestContact from "./handlers/filter/requestContact.js";
import deactivateCommand from "./handlers/command/deactivate.js";

bot.use(session({
    initial: () => ({isRequireContact: false})
}))

bot.command('start', startCommand);
bot.on('message:contact', requestContact);
bot.command('deactivate', deactivateCommand)
bot.callbackQuery("deactivate_verification", deactivateCommand)

bot.callbackQuery("deactivate_verification_no", async (ctx) => {
    await ctx.deleteMessage();
})

bot.callbackQuery("deactivate_verification_yes", async (ctx) => {
    // await ctx.reply()
})

bot.command('create_poll', async (ctx) => {
    await ctx.reply('/')

    const {data, error} = await database
        .from('polls')
        .insert({
            theme: "Кандидат",
            title: "Кандидат",
            description: "Кандидат",
            variants: [1, 2, 3]
        })
        .select()

    console.log(data)
    console.log(error)
})

bot.command('poll', async (ctx) => {
    const {data} = await database
        .from('polls')
        .select()
        .single()

    if (data && data.variants) {
        const keyboard = new InlineKeyboard()

        data.variants.forEach(item => {
            keyboard.text(item.toString(), `variant_${item}`).row()
        })

        await ctx.reply(data.theme, {
            reply_markup: keyboard
        })
    }
})



bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

bot.start();