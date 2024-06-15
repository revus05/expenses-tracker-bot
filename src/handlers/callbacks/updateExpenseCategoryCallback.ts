import { MyContext } from '../../utils/init/bot'
import getCategoryKeyboard from '../../utils/keyboards/getCategoryKeyboard'
import getCommand from '../../utils/getCommand'
import findAllOccurrences from '../../utils/findAllOccurrences'

type UpdateExpenseCategoryCallback = (ctx: MyContext) => Promise<void>

const updateExpenseCategoryCallback: UpdateExpenseCategoryCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data')
    return
  }

  const command = getCommand(ctx.callbackQuery.data, 'updateExpenseCategory')

  if (!command) {
    await ctx.reply('Error no data')
    return
  }

  const indexes = findAllOccurrences(command, '_')
  ctx.session.expenseId = +command.substring(indexes[0] + 1)

  await ctx.answerCallbackQuery()
  const currencyKeyboard = getCategoryKeyboard(`updateExpenseChosenCategory`)

  await ctx.reply('Выберите новую валюту: ', {
    reply_markup: currencyKeyboard,
  })

  ctx.session.messageId = ctx.callbackQuery?.message?.message_id || 0
}

export default updateExpenseCategoryCallback
