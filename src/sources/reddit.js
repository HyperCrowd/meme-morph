import fetch from 'node-fetch'
import { DelayQueue } from '../system/queue'
import { getRedditQuery } from '../query/reddit'

const queue = new DelayQueue(500)
const wait = async (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))
const stripLetters = /T|Z|.000/g

/**
 * 
 */
export async function searchReddit (query, from, to, size=2000) {
  let queries = getRedditQuery(query)
  const result = {}

  const after = from === undefined
    ? ''
    : `&after=${new Date(from)
      .toISOString()
      .replace(stripLetters, ' ')
      .trim()
    }`

  const before = to === undefined
    ? ''
    : `&before=${new Date(to)
      .toISOString()
      .replace(stripLetters, ' ')
      .trim()
    }`

  for (const q of queries) {
    const submissionResponse = await fetch(`https://api.pushshift.io/reddit/search/submission/?q=${(q.query)}&size=${size}${after}${before}&sort_type=created_utc&sort=desc`)
    const commentResponse = await fetch(`https://api.pushshift.io/reddit/search/comment/?q=${(q.query)}&size=${size}${after}${before}&sort_type=created_utc&sort=desc`)

    const submissions = await submissionResponse.json()
    const comments = await commentResponse.json()

    submissions.data.forEach(submission => submission.created_utc = new Date(submission.created_utc * 1000).toISOString())
    comments.data.forEach(submission => submission.created_utc = new Date(submission.created_utc * 1000).toISOString())

    result[q.word] = {
      submissions,
      comments
    }

    await wait()
  }

  return result
}

/**
 *
 */
 export function queueRedditSearch (query) {
  queue.add(searchReddit(query))
}
