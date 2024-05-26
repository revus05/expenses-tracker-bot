import { Bot, Context } from 'grammy'
import handleStartCommand from './handlers/handleStartCommand'
import handleTextMessage from './handlers/handleTextMessage'
import handleVoiceMessage from './handlers/handleVoiceMessage'
import handleInlineKeyboardClick from './handlers/handleInlineKeyboardClick'
import { hydrate, HydrateFlavor } from '@grammyjs/hydrate'

export type MyContext = HydrateFlavor<Context>
const bot = new Bot<MyContext>(process.env.BOT_TOKEN || '')
bot.use(hydrate())

export type UserState = {
  firstNumber?: number
  secondNumber?: number
}

let userStates: Record<number, UserState> = {}

bot.command('start', handleStartCommand)

bot.on('message:text', ctx => handleTextMessage(ctx, userStates))

bot.on('message:voice', handleVoiceMessage)

bot.on('callback_query:data', ctx => handleInlineKeyboardClick(ctx, userStates))

bot.start().then(() => {
  console.log('Server closed!')
})
