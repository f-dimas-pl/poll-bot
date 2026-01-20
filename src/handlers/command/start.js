import {supabase as database} from "../../database.js";
import USER_MESSAGES from "../../messages/user.messages.js";
import {Keyboard} from "grammy";

const startCommand = async (ctx) => {
    const {data: userData, error} = await database
        .from('users')
        .select('')
        .eq('telegram_id', ctx.from.id)
        .single()

    console.log(userData);
    console.log(error)

    if (userData?.is_verification === false || !userData) {
        await ctx.reply(
            USER_MESSAGES.welcome(ctx.from.first_name, ctx.from.last_name), {
                parse_mode: "HTML"
            }
        )

        await ctx.reply(
            USER_MESSAGES.warningVerification(), {
                parse_mode: "HTML",
                reply_markup: new Keyboard()
                    .requestContact("Сообщить номер телефона")
                    .resized()
            }
        )

        ctx.session.isRequireContact = true;
    } else if (userData?.is_verification === true) {
        await ctx.reply('Меню')
    }
}

export default startCommand;