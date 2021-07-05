const quoteRegex = /"/g

function escape (text) {
  return `"${text.replace(quoteRegex, '\"')}"`
}

export function newsApiToCsv (articles = []) {
  let body = ''

  for (const article of articles) {
    body += `${escape(article.author)},${escape(article.url)},${escape(article.publishedAt)},${escape(article.title)},${escape(article.description)},${escape(article.content)}\n`
  }

  return `author,url,publishedAt,title,description,content
${body}`

}
