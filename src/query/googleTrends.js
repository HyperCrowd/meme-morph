export function getGoogleTrendsQuery (keywords) {
  return keywords
    .toLowerCase()
    .split(',')
    .map(word => word.trim())
}
