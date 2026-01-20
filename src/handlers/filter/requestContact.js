import USER_MESSAGES from "../../messages/user.messages.js";
import {supabase as database} from "../../database.js";
import {InlineKeyboard} from "grammy";

const requestContact = async (ctx) => {
    if (ctx.from.id !== ctx.message.contact.user_id && ctx.session.isRequireContact) {
        return await ctx.reply(
            USER_MESSAGES.warningVerificationMethodButton(), { parse_mode: "HTML" }
        );
    }

    if (ctx.session.isRequireContact) {
        const phoneNumber = ctx.message.contact.phone_number;

        const { data: userData, error: userDataError } = await database
            .from('users')
            .select('telegram_id, number_phone')
            .eq('number_phone', phoneNumber)
            .maybeSingle();

        if (userData) {
            const { data: userDataUpdate, error: userDataUpdateError } = await database
                .from('users')
                .update({ telegram_id: ctx.from.id, is_verification: true })
                .eq('number_phone', phoneNumber)
                .select();

            console.log('User updated:', userDataUpdate);
        } else {
            const { error: insertError } = await database
                .from('users')
                .insert({
                    telegram_id: ctx.from.id,
                    number_phone: phoneNumber,
                    is_verification: true
                });

            if (insertError) {
                console.error('Insert error:', insertError.message);
                return;
            }
        }

        const serverMessage = await ctx.reply("Подождите пожалуйста", {
            reply_markup: { remove_keyboard: true }
        });

        await ctx.api.deleteMessage(ctx.chatId, serverMessage.message_id);

        await ctx.reply(
            USER_MESSAGES.successVerification(), {
                parse_mode: "HTML",
                reply_markup: new InlineKeyboard()
                    .text("Деактивировать верификацию", "deactivate_verification")
            }
        );

        ctx.session.isRequireContact = false;
    }
}

export default requestContact