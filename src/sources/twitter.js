const Twitter = require('twitter-v2');

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

  const { data } = await client.get('tweets/search/recent', {
    query,
    'tweet.fields': 'in_reply_to_user_id,author_id,public_metrics,reply_settings,withheld,created_at'
  })
/*
curl "https://api.twitter.com/2/tweets/1261326399320715264" -H "Authorization: Bearer <token>"

[
    {
      "id": "1373001119480344583",
      "text": "Looking to get started with the Twitter API but new to APIs in general? @jessicagarson will walk you through everything you need to know in APIs 101 session. She’ll use examples using our v2 endpoints, Tuesday, March 23rd at 1 pm EST.nnJoin us on Twitchnhttps://t.co/GrtBOXyHmB"
      in_reply_to_user_id
      author_id
      public_metrics
        retweet_count
        reply_count
        like_count
        quote_count
      reply_settings (everyone | mentionedUsers | following)
      withheld
        copyright (boolean)
        country_codes ( string[] )
        scope ( tweet | user)
      created_at
    },
    {
      "id": "1372627771717869568",
      "text": "Thanks to everyone who joined and made today a great session! 🙌 nnIf weren't able to attend, we've got you covered. Academic researchers can now sign up for office hours for help using the new product track. See how you can sign up, here 👇nhttps://t.co/duIkd27lPx https://t.co/AP9YY4F8FG"
    },
    {
      "id": "1367519323925843968",
      "text": "Meet Aviary, a modern client for iOS 14 built using the new Twitter API. It has a beautiful UI and great widgets to keep you up to date with the latest Tweets. https://t.co/95cbd253jK"
    },
    {
      "id": "1366832168333234177",
      "text": "The new #TwitterAPI provides the ability to build the Tweet payload with the fields that you want. nnIn this tutorial @suhemparack explains how to build the new Tweet payload and how it compares with the old Tweet payload in v1.1 👇 https://t.co/eQZulq4Ik3"
    },
    {
      "id": "1364984313154916352",
      "text": "“I was heading to a design conference in New York and wanted to meet new people,” recalls @aaronykng, creator of @flocknet. “There wasn't an easy way to see all of the designers in my network, so I built one.” Making things like this opened the doors for him to the tech industry."
    },
    {
      "id": "1364275610764201984",
      "text": "If you're newly approved for the Academic Research product track, our next stream is for you.nnThis Thursday, February 25th at 10AM PST @suhemparack will demo how academics can use this track to get started with the new #TwitterAPInnJoin us on Twitch! 👀nhttps://t.co/SQziibOD9P"
    }
  ]
}
*/
  return data.filter(tweet => {
    const date = new Date(tweet.created_at)

    const isInDateRange = date > since && date < until

    const isMinFaved = minFaves === undefined
      ? true
      : tweet.public_metrics.like_count >= minFaves
    
    return isInDateRange && isMinFaved
  })
}
