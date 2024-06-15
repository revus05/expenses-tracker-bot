type GetDateDayFormat = (date: Date) => string

const getDateFormat: GetDateDayFormat = date => {
  return `${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`
}

export default getDateFormat
