const quoteRegex = /"/g

/**
 * 
 */
function escape (text = '') {
  return `"${(text.toString() || '').replace(quoteRegex, '\"')}"`
}

/**
 * 
 */
export function youtubeToCsv (posts) {
  // @TODO: do this
  return 'Coming soon!'
}
