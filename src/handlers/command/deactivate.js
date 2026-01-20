import USER_MESSAGES from "../../messages/user.messages.js";
import {InlineKeyboard} from "grammy";

const deactivateCommand = async (ctx) => {
    await ctx.reply(
        USER_MESSAGES.warningDeactivate(), {
            parse_mode: "HTML",
            reply_markup: new InlineKeyboard()
                .text("Да", "deactivate_verification_yes")
                .row()
                .text("Нет", "deactivate_verification_no")
        }
    )
}

export default deactivateCommand;