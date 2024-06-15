import { MyContext } from '../../utils/init/bot'
import prisma from '../../../prisma/client/prismaClient'
import findAllOccurrences from '../../utils/findAllOccurrences'
import { Expense } from '@prisma/client'
import expenseInfo from '../../replies/expenseInfo'
import getExpenseKeyboard from '../../utils/keyboards/getExpenseKeyboard'

type ExpenseCallback = (ctx: MyContext) => Promise<void>

const handleExpenseCallback: ExpenseCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery?.data) {
    await ctx.reply('Error no data')
    return
  }
  await ctx.answerCallbackQuery()
  const indexes = findAllOccurrences(ctx.callbackQuery?.data, '_')
  const expenseId = +ctx.callbackQuery?.data.substring(indexes[0] + 1, indexes[1])

  const expense: Expense | null = await prisma.expense.findFirst({
    where: {
      id: expenseId,
    },
  })

  if (!expense) {
    return
  }

  const keyboard = getExpenseKeyboard(
    expense.id,
    ctx.callbackQuery.message?.message_id || 0,
    expense.category || '',
    expense.description || '',
  )

  await ctx.callbackQuery.message?.editText(expenseInfo(expense), {
    parse_mode: 'HTML',
    reply_markup: keyboard,
  })
}

export default handleExpenseCallback
