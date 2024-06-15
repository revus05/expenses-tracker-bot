import { MyContext } from '../../utils/init/bot'
import findAllOccurrences from '../../utils/findAllOccurrences'
import prisma from '../../../prisma/client/prismaClient'
import getCommand from '../../utils/getCommand'

type DeleteExpenseCallback = (ctx: MyContext) => Promise<void>

const handleDeleteExpenseCallback: DeleteExpenseCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data) {
    await ctx.reply('Error no data')
    return
  }
  const command = getCommand(ctx.callbackQuery.data, 'deleteExpense')
  if (!command) {
    await ctx.reply('Error no data')
    return
  }
  const indexes = findAllOccurrences(command, '_')
  const expenseId = +command.substring(indexes[0] + 1)

  await prisma.expense.delete({
    where: {
      id: expenseId,
    },
  })

  await ctx.answerCallbackQuery('❌ Трата удалена!')
}

export default handleDeleteExpenseCallback
