const Twitter = require('twitter-v2')
const { getTwitterQuery } = require('../query/twitter')

export const searchTwitter = async (query, from, to, minFaves) => {
  const since = from === undefined
    ? 0
    : new Date(from)

  const until = to === undefined
    ? new Date()
    : new Date(to)

  const client = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  })

  const { data = [] } = await client.get('tweets/search/recent', {
    query: getTwitterQuery(query),
    'tweet.fields': 'in_reply_to_user_id,author_id,public_metrics,reply_settings,withheld,created_at'
  })

  const tweets = data.filter(tweet => {
    if (tweet.text.substr(0, 3) === 'RT ') {
      return false
    }

    const date = new Date(tweet.created_at)

    const isInDateRange = date > since && date < until

    const isMinFaved = minFaves === undefined
      ? true
      : tweet.public_metrics.like_count >= minFaves
    
    return isInDateRange && isMinFaved
  })

  return {
    [query]: tweets
  }
}
