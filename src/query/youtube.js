export function getYoutubeQuery (keywords) {
  const result = keywords
    .toLowerCase()
    .split(',')
    .map(word => {
      return {
        word,
        query: '"' + word.trim() + '"'
      }
    })

  return result
}
