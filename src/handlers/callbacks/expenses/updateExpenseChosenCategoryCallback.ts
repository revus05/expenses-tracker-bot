import { MyContext } from '../../../utils/init/bot'
import getCommand from '../../../utils/getCommand'
import findAllOccurrences from '../../../utils/findAllOccurrences'
import { $Enums } from '@prisma/client'
import prisma from '../../../../prisma/client/prismaClient'
import expenseInfo from '../../../replies/expenses/expenseInfo'
import getExpenseKeyboard from '../../../utils/keyboards/getExpenseKeyboard'
import getCategoryText from '../../../utils/getCategoryText'

type UpdateExpenseChosenCategoryCallback = (ctx: MyContext) => Promise<void>

const updateExpenseChosenCategoryCallback: UpdateExpenseChosenCategoryCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data')
    return
  }

  const command = getCommand(ctx.callbackQuery.data, 'updateExpenseChosenCategory')

  if (!command) {
    await ctx.reply('Error no data')
    return
  }

  const indexes = findAllOccurrences(ctx.callbackQuery.data, '_')
  const category = ctx.callbackQuery.data.substring(indexes[0] + 1) as $Enums.ExpenseCategory

  const updatedExpense = await prisma.expense.update({
    where: {
      id: ctx.session.expenseId,
    },
    data: {
      category,
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
    await ctx.answerCallbackQuery(`Категория ${getCategoryText(updatedExpense.category)} уже установлена!`)

    ctx.callbackQuery.message?.delete()
    return
  }

  if (updatedExpense) {
    await ctx.answerCallbackQuery(
      '✅ Успешно!\n' +
        `Транзакция №${updatedExpense.id} обновлена
` +
        `Новая категория: ${getCategoryText(updatedExpense.category)}`,
    )
  } else {
    await ctx.answerCallbackQuery('Ошибка')
  }

  ctx.callbackQuery.message?.delete()
}

export default updateExpenseChosenCategoryCallback
