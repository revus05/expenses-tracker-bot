import { $Enums, Expense } from '@prisma/client'
import prisma from '../../../prisma/client/prismaClient'
import getCategoryText from '../../utils/getCategoryText'
import getAddedNewExpenseText from '../../replies/addedNewExpense'
import { MyContext } from '../../utils/bot'
import findAllOccurrences from '../../utils/findAllOccurrences'

type HandleAddCategoryCallback = (ctx: MyContext) => Promise<void>

const handleAddCategoryCallback: HandleAddCategoryCallback = async ctx => {
  if (!ctx.from || !ctx.from.id || !ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data.')
    return
  }

  const splittersIndexes = findAllOccurrences(ctx.callbackQuery.data, '-')
  const category = ctx.callbackQuery.data.substring(
    splittersIndexes[0] + 1,
    splittersIndexes[1],
  ) as $Enums.ExpenseCategory
  const expenseId = parseInt(ctx.callbackQuery.data.substring(splittersIndexes[1] + 1, splittersIndexes[2]))

  const updatedExpense: Expense = await prisma.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      category,
    },
  })

  await ctx.answerCallbackQuery(`Выбрано: ${getCategoryText(ctx.callbackQuery.data)}`)

  await ctx.callbackQuery?.message?.editText(await getAddedNewExpenseText(updatedExpense))
}

export default handleAddCategoryCallback
