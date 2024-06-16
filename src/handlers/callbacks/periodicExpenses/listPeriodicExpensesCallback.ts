import { MyContext } from '../../../utils/init/bot'
import { PeriodicExpense } from '@prisma/client'
import prisma from '../../../../prisma/client/prismaClient'
import listPeriodicExpenses from '../../../replies/periodicExpenses/listPeriodicExpenses'
import getPeriodicExpensesKeyboard from '../../../utils/keyboards/getPeriodicExpensesKeyboard'
import { InlineKeyboard } from 'grammy'

type ListPeriodicExpensesCallback = (ctx: MyContext) => Promise<void>

const listPeriodicExpensesCallback: ListPeriodicExpensesCallback = async ctx => {
  await ctx.answerCallbackQuery()

  const periodicExpenses: PeriodicExpense[] = await prisma.periodicExpense.findMany({
    where: {
      userId: ctx.from?.id,
    },
  })

  let periodicExpenseList = await listPeriodicExpenses(periodicExpenses)

  await ctx.callbackQuery?.message?.editText(periodicExpenseList.periodicExpenses, {
    reply_markup: new InlineKeyboard([
      ...periodicExpenseList.keyboard.inline_keyboard,
      ...getPeriodicExpensesKeyboard().inline_keyboard,
    ]),
    parse_mode: 'HTML',
  })
}

export default listPeriodicExpensesCallback
