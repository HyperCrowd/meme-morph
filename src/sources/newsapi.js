import NewsAPI from 'newsapi'
import { DelayQueue } from '../system/queue'

const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)
const queue = new DelayQueue(500)

/**
 *
 */
export function queueQuery (query, country, category) {
  queue.add(queueQuery(query, country, category))
}

function contains (text = '', regex) {
  return (text || '').match(regex) !== null
}

/**
 *
 */
export async function newsQuery (query, country, category) {
  return new Promise(resolve => {
    const qRegex = new RegExp(query, 'i')

    newsapi.v2.everything({
      q: query,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 100
    }).then(data => {
      const articles = []

      for (const article of data.articles) {
        if (contains(article.url, qRegex) || 
          contains(article.author, qRegex) || 
          contains(article.title, qRegex) || 
          contains(article.description, qRegex) || 
          contains(article.context, qRegex)
        ) {
          articles.push(article)
        } else {
          continue
        }
      }

      resolve({
        country,
        category,
        articles
      })
    })
  })
}

/**
 *
 */
export async function onNews (onNews) {
  queue.on('news', onNews)
}
