import { MyContext } from '../../utils/init/bot'
import getCommand from '../../utils/getCommand'
import findAllOccurrences from '../../utils/findAllOccurrences'
import { $Enums } from '@prisma/client'
import prisma from '../../../prisma/client/prismaClient'
import expenseInfo from '../../replies/expenseInfo'
import getExpenseKeyboard from '../../utils/keyboards/getExpenseKeyboard'
import { getCurrencyCodeWithFlag } from '../../data/currencies'

type UpdateExpenseChosenCurrencyCallback = (ctx: MyContext) => Promise<void>

const updateExpenseChosenCurrencyCallback: UpdateExpenseChosenCurrencyCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data')
    return
  }

  const command = getCommand(ctx.callbackQuery.data, 'updateExpenseChosenCurrency')

  if (!command) {
    await ctx.reply('Error no data')
    return
  }

  const indexes = findAllOccurrences(ctx.callbackQuery.data, '_')
  const currency = ctx.callbackQuery.data.substring(indexes[0] + 1) as $Enums.Currency

  const updatedExpense = await prisma.expense.update({
    where: {
      id: ctx.session.expenseId,
    },
    data: {
      currency,
    },
  })

  try {
    await ctx.api.editMessageText(ctx.chat?.id || 0, ctx.session.messageId, expenseInfo(updatedExpense), {
      parse_mode: 'HTML',
      reply_markup: getExpenseKeyboard(
        updatedExpense.id,
        ctx.session.messageId,
        updatedExpense.category || '',
        updatedExpense.description || '',
      ),
    })
  } catch (e) {
    await ctx.answerCallbackQuery(`Валюта уже ${getCurrencyCodeWithFlag(updatedExpense.currency)}!`)

    ctx.callbackQuery.message?.delete()
    return
  }

  if (updatedExpense) {
    await ctx.answerCallbackQuery(
      '✅ Успешно!\n' +
        `Транзакция №${updatedExpense.id} обновлена\n` +
        `Новая валюта: ${getCurrencyCodeWithFlag(updatedExpense.currency)}`,
    )
  }
  ctx.callbackQuery.message?.delete()
}

export default updateExpenseChosenCurrencyCallback
