import getCategoryValue from '../utils/getCategoryValue'
import { Expense } from '@prisma/client'
import getAddedNewExpenseText from '../replies/addedNewExpense'
import { UserState } from '../index'
import { MyContext } from '../utils/bot'
import createExpense from '../queries/createExpense'
import { Category } from '../types/categories'
import countTotalUserExpenses from '../queries/countTotalUserExpenses'

type HandleInlineKeyboardClick = (ctx: MyContext, userStates: Record<number, UserState>) => Promise<void>

const handleInlineKeyboardClick: HandleInlineKeyboardClick = async (ctx, userStates) => {
  if (
    !ctx.from ||
    !ctx.from.id ||
    !ctx.callbackQuery ||
    !ctx.callbackQuery.data ||
    !userStates[ctx.from.id].firstNumber
  ) {
    await ctx.reply('Error no data.')
    return
  }

  const id = ctx.from.id
  await ctx.answerCallbackQuery(`Выбрано: ${getCategoryValue(ctx.callbackQuery.data)}`)

  const expense: Expense = await createExpense(userStates[id].firstNumber || 0, id, ctx.callbackQuery.data as Category)
  const total = await countTotalUserExpenses(id)
  await ctx.callbackQuery?.message?.editText(await getAddedNewExpenseText(expense, total))
  userStates[id].firstNumber = 0
}

export default handleInlineKeyboardClick
