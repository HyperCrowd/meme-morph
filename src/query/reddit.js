export function getRedditQuery (keywords) {
  return keywords
    .toLowerCase()
    .split(',')
    .map(word => {
      return {
        word,
        query: encodeURIComponent('"' + word.trim() + '"')
      }
    })
}
