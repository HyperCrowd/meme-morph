import { HttpService } from './services/http'
import { onNews } from './sources/newsapi'

/**
 * 
 */
export async function main () {
  const http = new HttpService()

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
