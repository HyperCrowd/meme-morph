const Twitter = require('twitter-v2');

export const searchTwitter = async (query, from, to, minFaves = 100) => {
  const since = from === undefined
    ? parseInt(Date.now() / 1000) - 3600
    : parseInt(new Date(from).getTime() / 1000)

  const until = to === undefined
    ? parseInt(Date.now() / 1000)
    : parseInt(new Date(to).getTime() / 1000)

  const client = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  })

  const { data } = await client.get('tweets/search/recent', {
    query,
    'tweet.fields': 'in_reply_to_user_id,author_id,public_metrics,reply_settings,withheld'
  })

  return data
}
