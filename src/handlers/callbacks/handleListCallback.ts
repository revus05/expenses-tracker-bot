import { MyContext } from '../../utils/init/bot'
import findAllOccurrences from '../../utils/findAllOccurrences'
import { Expense } from '@prisma/client'
import prisma from '../../../prisma/client/prismaClient'
import { step } from '../../utils/init/config'
import listExpenses from '../../replies/listExpenses'
import getTotalSum from '../../queries/getTotalSum'
import { InlineKeyboard } from 'grammy'

type HandleListCallback = (ctx: MyContext) => Promise<void>

const handleListCallback: HandleListCallback = async ctx => {
  if (!ctx.callbackQuery || !ctx.callbackQuery.data || !ctx.from) {
    await ctx.reply('Error no data')
    return
  }

  await ctx.answerCallbackQuery()
  const indexes = findAllOccurrences(ctx.callbackQuery.data, '_')
  const skip = +ctx.callbackQuery.data.substring(indexes[0] + 1)

  let expenses: Expense[]
  if (ctx.callbackQuery.data.includes('Prev')) {
    expenses = await prisma.expense.findMany({
      where: {
        userId: ctx.from.id,
      },
      take: step,
      skip: skip,
    })
  } else {
    expenses = await prisma.expense.findMany({
      where: {
        userId: ctx.from.id,
      },
      take: step,
      skip: skip,
    })
  }

  const totalExpenses = await prisma.expense.count({
    where: {
      userId: ctx.from.id,
    },
  })

  let paginationKeyboard: InlineKeyboard | undefined
  if (totalExpenses > step) {
    paginationKeyboard = new InlineKeyboard()
    if (skip - step >= 0) {
      paginationKeyboard.text(`<< Предыдущие ${step}`, `listPrev_${skip - step}`)
    }
    if (skip + step < totalExpenses) {
      paginationKeyboard.text(
        totalExpenses - skip - step > step ? `Следущие ${step} >>` : `Последние ${totalExpenses - skip - step}`,
        `listNext_${skip + step}`,
      )
    }
  }

  let reply = listExpenses(expenses) + '<b>Итоговая сумма за месяц:</b> '
  await ctx.callbackQuery.message?.editText(reply, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard,
  })

  const totalSum = await getTotalSum(ctx.from.id)
  reply += totalSum

  await ctx.callbackQuery.message?.editText(reply, {
    parse_mode: 'HTML',
    reply_markup: paginationKeyboard,
  })
}

export default handleListCallback
