import {InlineKeyboard} from "grammy";

const pollCommand = async (ctx) => {
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
}

export default pollCommand