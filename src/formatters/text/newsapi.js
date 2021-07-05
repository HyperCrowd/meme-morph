export function newsApiToText (articles = []) {
  let body = ''

  for (const article of articles) {
    body += `Author: ${article.author}
URL: ${article.url}
Published: ${article.publishedAt}
Title: ${article.title}
Description: ${article.description}
Content: ${article.content}

`
  }

  return body

}
