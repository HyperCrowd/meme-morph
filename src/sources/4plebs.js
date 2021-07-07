// 

import fetch from 'node-fetch'
import { DelayQueue } from "../system/queue"

const queue = new DelayQueue(500)

/**
 * 
 */
export async function search4Plebs (query, boards = 'pol') {
  const result = await fetch(`http://archive.4plebs.org/_/api/chan/search/?boards=${boards}&email=&username=&tripcode=&capcode=user&subject=&text=${query}&uid=&country=&filename=&image=&deleted=not-deleted&ghost=none&filter=image&type=posts&start=&end=&results=&order=asc`, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
  console.log((await result.buffer()).toString())
  return result[0].posts
}

/**
 *
 */
 export function queueSearch4Plebs (ip) {
  queue.add(search4Plebs(ip))
}
