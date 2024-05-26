import { CommandContext, Context } from 'grammy'
import { User } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import { MyContext } from '../index'
import checkIsUserRegistered from '../queries/checkIsUserRegistered'

type HandleStartCommand = (ctx: CommandContext<MyContext>) => Promise<void>

const handleStartCommand: HandleStartCommand = async ctx => {
  const isUserRegistered = await checkIsUserRegistered(ctx.from?.id)
  if (isUserRegistered) {
    await ctx.reply('С возвращением! Отправляйте мне все свои расходы и я буду отслеживать ваши траты')
    return
  }
  const newUser: User = await prisma.user.create({
    data: {
      id: ctx.from?.id,
      preferredCurrency: 'BYN',
    },
  })
  if (!newUser) {
    await ctx.reply('Ошибка при создании записи пользователя для вас')
    return
  }
  await ctx.reply('Добро пожаловать! Отправляйте мне все свои расходы и я буду отслеживать ваши траты')
  return
}

export default handleStartCommand
