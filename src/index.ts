import bot from './utils/bot'
import handleStartCommand from './handlers/handleStartCommand'
import handleTextMessage from './handlers/handleTextMessage'
import handleVoiceMessage from './handlers/handleVoiceMessage'
import handleInlineKeyboardClick from './handlers/handleInlineKeyboardClick'
import handleSetPreferredCurrencyCommand from './handlers/handleSetPreferredCurrencyCommand'

bot.api
  .setMyCommands([
    { command: 'start', description: 'Начать диалог' },
    { command: 'set_preferred_currency', description: 'Задать валюту пользователя' },
  ])
  .then(() => console.log('Команды для бота добавлены'))

bot.command('start', handleStartCommand)

bot.command('set_preferred_currency', handleSetPreferredCurrencyCommand)

bot.on('message:text', ctx => handleTextMessage(ctx))

bot.on('message:voice', handleVoiceMessage)

bot.on('callback_query:data', ctx => handleInlineKeyboardClick(ctx))

bot.start().then(() => {
  console.log('Бот выключен')
})
