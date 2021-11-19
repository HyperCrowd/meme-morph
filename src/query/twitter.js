export function getTwitterQuery (keywords) {
  const result = keywords
    .toLowerCase()
    .split(',')
    .map(word => {
      return '"' + word.trim() + '"'
    })
    .join(' OR ')

  if (result.length > 512) {
    throw new RangeError(`${result} is longer than 512 characters`)
  }
}
