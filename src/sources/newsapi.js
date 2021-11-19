import NewsAPI from 'newsapi'
import { DelayQueue } from '../system/queue'
import { getNewsapiQuery } from '../query/newsapi'

const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)
const queue = new DelayQueue(500)

const wait = async (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))

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
export async function newsQuery (query, country, from = new Date(0).toISOString(), to = new Date().toISOString()) {
  const queries = getNewsapiQuery(query)
  const articles = {}

  return new Promise(async resolve => {

    for (const query of queries) {
      const qRegex = new RegExp(query.word, 'i')

      const data = await newsapi.v2.everything({
        q: query.query,
        language: 'en',
        from,
        to,
        sortBy: 'publishedAt',
        pageSize: 100
      })

      articles[query.word] = []

      for (const article of data.articles) {
        if (contains(article.url, qRegex) || 
          contains(article.author, qRegex) || 
          contains(article.title, qRegex) || 
          contains(article.description, qRegex) || 
          contains(article.context, qRegex)
        ) {
          articles[query.word].push(article)
        } else {
          continue
        }
      }

      await wait()
    }

    resolve({
      country,
      from,
      to,
      articles
    })
  })
}

/**
 *
 */
export async function onNews (onNews) {
  queue.on('news', onNews)
}
