export function getRedditQuery (keywords) {
  return keywords
    .toLowerCase()
    .split(',')
    .map(word => {
      return encodeURIComponent('"' + word.trim() + '"')
    })
}
