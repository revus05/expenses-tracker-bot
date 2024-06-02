import { getCurrencyCodeWithFlag } from '../data/currencies'
import { $Enums } from '@prisma/client'

type PreferredCurrencySelected = (currency: $Enums.Currency) => string

const preferredCurrencySelected: PreferredCurrencySelected = currency => {
  return `✅ Успешно!\n${getCurrencyCodeWithFlag(currency)} выбрана как основная валюта!`
}

export default preferredCurrencySelected
