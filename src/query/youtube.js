export function getYoutubeQuery (keywords) {
  const result = keywords
    .toLowerCase()
    .split(',')
    .map(word => {
      return '"' + word.trim() + '"'
    })

  return result
}
