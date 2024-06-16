import { MyContext } from '../../../utils/init/bot'
import getCurrencyKeyboard from '../../../utils/keyboards/getCurrencyKeyboard'
import findAllOccurrences from '../../../utils/findAllOccurrences'
import getCommand from '../../../utils/getCommand'

type UpdateExpenseCurrencyCallback = (ctx: MyContext) => Promise<void>

const updateExpenseCurrencyCallback: UpdateExpenseCurrencyCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data')
    return
  }

  const command = getCommand(ctx.callbackQuery.data, 'updateExpenseCurrency')

  if (!command) {
    await ctx.reply('Error no data')
    return
  }

  const indexes = findAllOccurrences(command, '_')
  ctx.session.expenseId = +command.substring(indexes[0] + 1)

  await ctx.answerCallbackQuery()
  const currencyKeyboard = getCurrencyKeyboard(`updateExpenseChosenCurrency`)

  await ctx.reply('Выберите новую валюту: ', {
    reply_markup: currencyKeyboard,
  })

  ctx.session.messageId = ctx.callbackQuery?.message?.message_id || 0
}

export default updateExpenseCurrencyCallback
