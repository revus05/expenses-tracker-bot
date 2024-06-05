import bot from './utils/init/bot'
import handleStartCommand from './handlers/handleStartCommand'
import handleTextMessage from './handlers/handleTextMessage'
import handleVoiceMessage from './handlers/handleVoiceMessage'
import handleInlineKeyboardClick from './handlers/handleInlineKeyboardClick'
import handleSetPreferredCurrencyCommand from './handlers/handleSetPreferredCurrencyCommand'
import setBotCommands from './utils/init/setBotCommands'
import handleListCommand from './handlers/handleListCommand'

setBotCommands().then(() => {
  console.log('Команды бота добавлены')
})

bot.command('start', handleStartCommand)

bot.command('set_preferred_currency', handleSetPreferredCurrencyCommand)

bot.command('list', handleListCommand)

bot.on('message:text', ctx => handleTextMessage(ctx))

bot.on('message:voice', handleVoiceMessage)

bot.on('callback_query:data', ctx => handleInlineKeyboardClick(ctx))

bot.start().then(() => {
  console.log('Бот выключен')
})
