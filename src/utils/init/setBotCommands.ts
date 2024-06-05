import bot from './bot'

const setBotCommands = async () => {
  await bot.api.setMyCommands([
    { command: 'start', description: 'Начать диалог' },
    { command: 'set_preferred_currency', description: 'Задать валюту пользователя' },
    { command: 'list', description: 'Вывести список трат' },
  ])
}

export default setBotCommands
