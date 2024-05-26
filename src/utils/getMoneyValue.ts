import currencies from '../data/currencies'

const getMoneyValue = (currencyCode: string, sum: number): string => {
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

export default getMoneyValue
