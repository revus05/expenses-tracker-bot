import { CommandContext } from 'grammy'
import { User } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import checkIsUserRegistered from '../queries/checkIsUserRegistered'
import { MyContext } from '../utils/bot'
import getWelcomeMessage from '../replies/welcomeMessage'

type HandleStartCommand = (ctx: CommandContext<MyContext>) => Promise<void>

const handleStartCommand: HandleStartCommand = async ctx => {
  const isUserRegistered = await checkIsUserRegistered(ctx.from?.id)
  if (isUserRegistered) {
    await ctx.reply(getWelcomeMessage())
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
  await ctx.reply(getWelcomeMessage())
}

export default handleStartCommand
