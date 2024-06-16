import getCurrencyKeyboard from '../utils/keyboards/getCurrencyKeyboard'
import { MyContext } from '../utils/init/bot'

type HandleSetPreferredCurrencyCommand = (ctx: MyContext) => Promise<void>

const handleSetPreferredCurrencyCommand: HandleSetPreferredCurrencyCommand = async ctx => {
  const currencyKeyboard = getCurrencyKeyboard('setPreferredCurrency')

  await ctx.reply('Выберите новую валюту: ', {
    reply_markup: currencyKeyboard,
  })
}

export default handleSetPreferredCurrencyCommand
