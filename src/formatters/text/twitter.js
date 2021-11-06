export function twitterToText (tweets = []) {
  let body = ''

  for (const tweet of tweets) {
    body += `ID: ${tweet.id}
Text: ${tweet.text}

`
  }

  return body

}
