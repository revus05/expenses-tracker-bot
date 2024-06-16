import { MyContext } from '../utils/init/bot'
import prisma from '../../prisma/client/prismaClient'
import { PeriodicExpense } from '@prisma/client'
import getPeriodicExpensesKeyboard from '../utils/keyboards/getPeriodicExpensesKeyboard'
import listPeriodicExpenses from '../replies/periodicExpenses/listPeriodicExpenses'

type HandlePeriodicExpensesCommand = (ctx: MyContext) => Promise<void>

const handlePeriodicExpensesCommand: HandlePeriodicExpensesCommand = async ctx => {
  const periodicExpenses: PeriodicExpense[] = await prisma.periodicExpense.findMany({
    where: {
      userId: ctx.from?.id,
    },
  })

  let resultString = await listPeriodicExpenses(periodicExpenses)

  await ctx.reply(resultString, {
    reply_markup: getPeriodicExpensesKeyboard(),
    parse_mode: 'HTML',
  })
}

export default handlePeriodicExpensesCommand
