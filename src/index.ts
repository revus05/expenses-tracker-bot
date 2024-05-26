import handleStartCommand from './handlers/handleStartCommand'
import handleTextMessage from './handlers/handleTextMessage'
import handleVoiceMessage from './handlers/handleVoiceMessage'
import handleInlineKeyboardClick from './handlers/handleInlineKeyboardClick'
import bot from './utils/bot'

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
