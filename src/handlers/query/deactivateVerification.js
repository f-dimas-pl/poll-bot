import {supabase as database} from "../../database.js"
import USER_MESSAGES from "../../messages/user.messages.js";

export const deactivateVerificationYes = async (ctx) => {
    await ctx.deleteMessage();

    const {data, error} = await database
        .from('users')
        .delete()
        .eq('telegram_id', ctx.from.id)

    await ctx.reply(
        USER_MESSAGES.successDeactivate(),
        {parse_mode: "HTML"}
    )
}

export const deactivateVerificationNo = async (ctx) => {
    await ctx.deleteMessage();
}