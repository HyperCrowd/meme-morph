require('dotenv').config()
const Config = require('./src/config')
const Http = require('./src/services/http')
const onNews = require('./src/sources/newsapi')

/**
 * 
 */
async function main () {
  const http = new Http()

  await http.start()

  onNews(({ country, category, articles}) => {
    console.log([country, category, articles.length])
    
    /*
    for (const article of article) {
      const author = article.author
      const title = article.title
      const description = article.description
      const url = article.url
      const publishedAt = article.publishedAt
      const content = article.content
    }
    */
  })
}

main()
