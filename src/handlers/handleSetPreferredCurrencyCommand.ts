import { CommandContext, Context } from 'grammy'
import getCurrencyKeyboard from '../utils/getCurrencyKeyboard'

type HandleSetPreferredCurrencyCommand = (ctx: CommandContext<Context>) => Promise<void>

const handleSetPreferredCurrencyCommand: HandleSetPreferredCurrencyCommand = async ctx => {
  const currencyKeyboard = getCurrencyKeyboard()

  await ctx.reply('handleSetPreferredCurrencyCommand', {
    reply_markup: currencyKeyboard,
  })
}

export default handleSetPreferredCurrencyCommand
