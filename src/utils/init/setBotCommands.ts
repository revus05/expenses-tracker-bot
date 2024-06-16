import bot from './bot'

const setBotCommands = async () => {
  await bot.api.setMyCommands([{ command: 'start', description: 'Начать диалог' }])
}

export default setBotCommands
