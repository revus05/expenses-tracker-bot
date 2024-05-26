import { CommandContext } from 'grammy'
import { User } from '@prisma/client'
import prisma from '../../prisma/client/prismaClient'
import checkIsUserRegistered from '../queries/checkIsUserRegistered'
import { MyContext } from '../utils/bot'

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
