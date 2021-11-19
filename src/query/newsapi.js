export function getNewsapiQuery (keywords) {
  return keywords
    .toLowerCase()
    .split(',')
    .map(word => {
      const query = '+' + word.trim()

      if (query.length > 500) {
        throw new RangeError(`${query} is longer than 500 characters`)  
      }

      return {
        query,
        word
      }
    })
}
