type GetDateTimeFormat = (date: Date) => string

const getDateTimeFormat: GetDateTimeFormat = date => {
  return `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
}

export default getDateTimeFormat
