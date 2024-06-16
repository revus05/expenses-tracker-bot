import getCurrencyKeyboard from '../../../utils/keyboards/getCurrencyKeyboard'
import { MyContext } from '../../../utils/init/bot'

type UpdatePreferredCurrencyCallback = (ctx: MyContext) => Promise<void>

const updatePreferredCurrencyCallback: UpdatePreferredCurrencyCallback = async ctx => {
  await ctx.answerCallbackQuery()
  const currencyKeyboard = getCurrencyKeyboard('updatePreferredChosenCurrency')

  await ctx.reply('Выберите новую валюту: ', {
    reply_markup: currencyKeyboard,
  })
}

export default updatePreferredCurrencyCallback
