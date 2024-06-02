type FindAllOccurrences = (string: string, substring: string) => number[]

const findAllOccurrences: FindAllOccurrences = (string, substring) => {
  let indices = []
  let startIndex = 0
  let index

  while ((index = string.indexOf(substring, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + substring.length
  }

  return indices
}

export default findAllOccurrences
