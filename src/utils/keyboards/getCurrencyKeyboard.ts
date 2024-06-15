import { InlineKeyboard } from 'grammy'
import { currencyCodes, currencyCodesWithFlags } from '../../data/currencies'

type GetCurrencyKeyboard = (command: string) => InlineKeyboard

const getCurrencyKeyboard: GetCurrencyKeyboard = command => {
  const keyboard = new InlineKeyboard()
  currencyCodesWithFlags.forEach((currency, i) => {
    keyboard.text(currency, `${command}_${currencyCodes[i]}`)
    if (i % 4 == 3) {
      keyboard.row()
    }
  })

  return keyboard
}

export default getCurrencyKeyboard
