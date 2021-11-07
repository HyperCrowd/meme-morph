import fetch from 'node-fetch'
import { DelayQueue } from '../system/queue'

const queue = new DelayQueue(500)

const stripLetters = /T|Z|.000/g

/**
 * 
 */
export async function searchReddit (query, from, to, size=2000) {
  let q = query

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

  const submissionResponse = await fetch(`https://api.pushshift.io/reddit/search/submission/?q=${(q)}&size=${size}${after}${before}&sort_type=created_utc&sort=desc`)
  const commentResponse = await fetch(`https://api.pushshift.io/reddit/search/comment/?q=${(q)}&size=${size}${after}${before}&sort_type=created_utc&sort=desc`)

  const submissions = await submissionResponse.json()
  const comments = await commentResponse.json()

  submissions.data.forEach(submission => submission.created_utc = new Date(submission.created_utc * 1000).toISOString())
  comments.data.forEach(submission => submission.created_utc = new Date(submission.created_utc * 1000).toISOString())

  return {
    submissions,
    comments
  }
}

/**
 *
 */
 export function queueRedditSearch (query) {
  queue.add(searchReddit(query))
}
