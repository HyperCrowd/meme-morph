import fetch from 'node-fetch'
import { DelayQueue } from '../system/queue'

const queue = new DelayQueue(500)

/**
 * 
 */
export async function searchReddit (query) {
  const submissions = await fetch(`https://api.pushshift.io/reddit/search/submission/?q=${escape(query)}&size=2000&sort_type=created_utc&sort=desc`)
  const comments = await fetch(`https://api.pushshift.io/reddit/search/comment/?q=${escape(query)}&size=2000&sort_type=created_utc&sort=desc`)

  return {
    submissions: await submissions.json(),
    comments: await comments.json()
  }
}

/**
 *
 */
 export function queueRedditSearch (query) {
  queue.add(searchReddit(query))
}
