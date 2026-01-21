import {InlineKeyboard} from "grammy";
import {supabase as database} from "../../database.js";

const pollCommand = async (ctx) => {
    const {data: polls} = await database
        .from('polls')
        .select('*')

    if (polls) {
        const keyboard = new InlineKeyboard()

        polls.forEach(poll => {
            keyboard
                .text(poll.theme, `poll_${poll.id}`)
                .row()
        })

        await ctx.reply("Опросы", {reply_markup: keyboard})
    }
}

export default pollCommand