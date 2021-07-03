const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)
const DelayQueue = require('./queue')

const queue = new DelayQueue(500).start(() => {
  getHeadlines('us', 'business')
  /*
  getHeadlines('us', 'health')
  getHeadlines('us', 'science')
  getHeadlines('us', 'technology')
  getHeadlines('de', 'business')
  getHeadlines('de', 'health')
  getHeadlines('de', 'science')
  getHeadlines('de', 'technology')
  getHeadlines('us', 'business')
  getHeadlines('us', 'health')
  getHeadlines('us', 'science')
  getHeadlines('us', 'technology')
  getHeadlines('il', 'business')
  getHeadlines('il', 'health')
  getHeadlines('il', 'science')
  getHeadlines('il', 'technology')
  getHeadlines('cn', 'business')
  getHeadlines('cn', 'health')
  getHeadlines('cn', 'science')
  getHeadlines('cn', 'technology')
  getHeadlines('au', 'business')
  getHeadlines('au', 'health')
  getHeadlines('au', 'science')
  getHeadlines('au', 'technology')
  */
})

/**
 *
 */
function getHeadlines (country, category) {
  queue.add(async () => new Promise(resolve => {
    newsapi.v2.topHeadlines({
      category,
      language: 'en',
      country,
      pageSize: 100
    }).then(data => {
      resolve({
        country,
        category,
        articles: data.articles
      })
    })
  }))
}

/**
 *
 */
async function onNews (onNews) {
  queue.on('news', onNews)
}

module.exports = onNews
