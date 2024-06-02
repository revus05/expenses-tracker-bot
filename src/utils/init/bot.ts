import { hydrate, HydrateFlavor } from '@grammyjs/hydrate'
import { Bot, Context } from 'grammy'
import { config } from 'dotenv'
config()

export type MyContext = HydrateFlavor<Context>

const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')
bot.use(hydrate())

export default bot
