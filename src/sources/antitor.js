import fetch from 'node-fetch'
import { DelayQueue } from "../system/queue"

const queue = new DelayQueue(500)

/**
 * 
 */
export async function getAntiTorrentFromIp (ip) {
  const result = await fetch(`https://api.antitor.com/history/peer?ip=${ip}&days=30&contents=100&key=${process.env.ANTITOR_KEY}`)
  return result.json()
}

/**
 *
 */
 export function queueAntiTorrentFromIp (ip) {
  queue.add(antiTorQuery(ip))
}
