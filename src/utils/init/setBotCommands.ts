import bot from './bot'

const setBotCommands = async () => {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Начать диалог' },
    { command: 'set_preferred_currency', description: 'Задать валюту пользователя' },
  ])
}

export default setBotCommands
