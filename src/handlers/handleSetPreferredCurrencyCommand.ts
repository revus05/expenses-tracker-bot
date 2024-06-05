import { CommandContext } from 'grammy'
import getCurrencyKeyboard from '../utils/getCurrencyKeyboard'
import { MyContext } from '../utils/init/bot'

type HandleSetPreferredCurrencyCommand = (ctx: CommandContext<MyContext>) => Promise<void>

const handleSetPreferredCurrencyCommand: HandleSetPreferredCurrencyCommand = async ctx => {
  const currencyKeyboard = getCurrencyKeyboard()

  await ctx.reply('handleSetPreferredCurrencyCommand', {
    reply_markup: currencyKeyboard,
  })
}

export default handleSetPreferredCurrencyCommand
