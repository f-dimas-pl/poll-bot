import {Bot, GrammyError, HttpError, session} from "grammy";
import "dotenv/config";
import API_CONFIG from "./config/api.config.js";
const bot = new Bot(API_CONFIG.botToken);
import startCommand from "./handlers/command/start.js";
import pollCommand from "./handlers/command/poll.js";
import createPoll from "./handlers/command/createPoll.js";
import deactivateCommand from "./handlers/command/deactivate.js";
import requestContact from "./handlers/filter/requestContact.js";
import {deactivateVerificationNo, deactivateVerificationYes} from "./handlers/query/deactivateVerification.js";

bot.use(session({
    initial: () => ({isRequireContact: false})
}))

bot.command('start', startCommand);
bot.command('create_poll', createPoll)
bot.command('poll', pollCommand)
bot.command('deactivate', deactivateCommand)

bot.on('message:contact', requestContact);

bot.callbackQuery("deactivate_verification", deactivateCommand)
bot.callbackQuery("deactivate_verification_no", deactivateVerificationNo)
bot.callbackQuery("deactivate_verification_yes", deactivateVerificationYes)

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