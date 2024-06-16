import { MyContext } from '../../../utils/init/bot'
import prisma from '../../../../prisma/client/prismaClient'
import { Currency, User } from '@prisma/client'
import preferredCurrencySelected from '../../../replies/preferredCurrencySelected'
import findAllOccurrences from '../../../utils/findAllOccurrences'

type UpdatePreferredChosenCurrencyCallback = (ctx: MyContext) => Promise<void>

const updatePreferredChosenCurrencyCallback: UpdatePreferredChosenCurrencyCallback = async ctx => {
  if (!ctx.callbackQuery?.data) {
    await ctx.reply('Error no data')
    return
  }

  const indexes = findAllOccurrences(ctx.callbackQuery?.data, '_')
  const currency = ctx.callbackQuery?.data.substring(indexes[0] + 1) as Currency

  const updatedUser: User = await prisma.user.update({
    where: {
      id: ctx.from?.id,
    },
    data: {
      preferredCurrency: currency,
    },
  })
  const answer = preferredCurrencySelected(updatedUser.preferredCurrency)
  await ctx.answerCallbackQuery(answer)
  await ctx.callbackQuery?.message?.editText(answer)
}

export default updatePreferredChosenCurrencyCallback
