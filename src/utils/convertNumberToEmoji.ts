type ConvertNumberToEmoji = (num: number) => string

const convertNumberToEmoji: ConvertNumberToEmoji = num => {
  return `${num}`
    .replace(/1/g, '1️⃣')
    .replace(/2/g, '2️⃣')
    .replace(/3/g, '3️⃣')
    .replace(/4/g, '4️⃣')
    .replace(/5/g, '5️⃣')
    .replace(/6/g, '6️⃣')
    .replace(/7/g, '7️⃣')
    .replace(/8/g, '8️⃣')
    .replace(/9/g, '9️⃣')
    .replace(/0/g, '0️⃣')
}

export default convertNumberToEmoji
