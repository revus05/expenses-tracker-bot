import { User } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import checkIsUserRegistered from '../queries/checkIsUserRegistered'
import { MyContext } from '../utils/init/bot'
import getWelcomeMessage from '../replies/welcomeMessage'
import getMenuKeyboard from '../utils/keyboards/getMenuKeyboard'

type HandleStartCommand = (ctx: MyContext) => Promise<void>

const handleStartCommand: HandleStartCommand = async ctx => {
  const isUserRegistered = await checkIsUserRegistered(ctx.from?.id)
  if (isUserRegistered) {
    await ctx.reply(getWelcomeMessage(), {
      parse_mode: 'HTML',
      reply_markup: getMenuKeyboard(),
    })
    return
  }
  const newUser: User = await prisma.user.create({
    data: {
      id: ctx.from?.id,
    },
  })
  if (!newUser) {
    await ctx.reply('Ошибка при создании записи пользователя для вас')
    return
  }
  await ctx.reply(getWelcomeMessage(), {
    parse_mode: 'HTML',
    reply_markup: getMenuKeyboard(),
  })
}

export default handleStartCommand
