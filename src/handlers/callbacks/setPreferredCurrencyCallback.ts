import { MyContext } from '../../utils/init/bot'
import prisma from '../../../prisma/client/prismaClient'
import { Currency, User } from '@prisma/client'
import preferredCurrencySelected from '../../replies/preferredCurrencySelected'

type SetPreferredCurrencyCallback = (ctx: MyContext) => Promise<void>

const handleSetPreferredCurrencyCallback: SetPreferredCurrencyCallback = async ctx => {
  const updatedUser: User = await prisma.user.update({
    where: {
      id: ctx.from?.id,
    },
    data: {
      preferredCurrency: ctx.callbackQuery?.data?.replace('setPreferredCurrency_', '') as Currency,
    },
  })
  const answer = preferredCurrencySelected(updatedUser.preferredCurrency)
  await ctx.answerCallbackQuery(answer)
  await ctx.callbackQuery?.message?.editText(answer)
}

export default handleSetPreferredCurrencyCallback
