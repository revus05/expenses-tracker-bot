import { InlineKeyboard } from 'grammy'
import { MyContext } from '../utils/init/bot'
import { Expense } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import listExpenses from '../replies/expenses/listExpenses'
import getTotalSum from '../queries/getTotalSum'
import { step } from '../utils/init/config'

type HandleListCommand = (ctx: MyContext) => Promise<void>

const handleListCommand: HandleListCommand = async ctx => {
  if (!ctx.from) {
    return
  }

  const totalExpenses = await prisma.expense.count({
    where: {
      userId: ctx.from.id,
    },
  })

  const expenses: Expense[] = await prisma.expense.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId: ctx.from.id,
    },
    take: step,
  })

  if (!expenses.length) {
    await ctx.reply('Нет трат')
    return
  }
  let paginationKeyboard: InlineKeyboard | undefined
  if (totalExpenses > step) {
    paginationKeyboard = new InlineKeyboard()
    paginationKeyboard.text(
      totalExpenses - step > step ? `Следущие ${step} >>` : `Последние ${totalExpenses - step} >>`,
      `listNext`,
    )
  }

  ctx.session.skip = 0

  let reply = listExpenses(expenses, await getTotalSum(ctx.from.id), 0)
  await ctx.reply(reply.expenses, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard
      ? new InlineKeyboard([...reply.keyboard.inline_keyboard, ...paginationKeyboard.inline_keyboard])
      : reply.keyboard,
  })
}

export default handleListCommand
