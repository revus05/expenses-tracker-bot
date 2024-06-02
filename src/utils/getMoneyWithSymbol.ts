import currencies from '../data/currencies'
import { $Enums } from '@prisma/client'

const getMoneyWithSymbol = (currencyCode: $Enums.Currency, sum: number): string => {
  if (
    currencyCode == 'USD' ||
    currencyCode == 'EUR' ||
    currencyCode == 'GBP' ||
    currencyCode == 'AUD' ||
    currencyCode == 'CAD' ||
    currencyCode == 'HKD' ||
    currencyCode == 'NZD' ||
    currencyCode == 'SGD' ||
    currencyCode == 'TWD'
  ) {
    return `${currencies.get(currencyCode)}${sum}`
  } else {
    return `${sum} ${currencies.get(currencyCode)}`
  }
}

export default getMoneyWithSymbol
