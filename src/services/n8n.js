
import fetch from 'node-fetch'

export class N8nService {
  constructor (url) {
    this.url = url
  }

  /**
   * 
   */
  async start () {
    return true
  }

  /**
   * 
   */
   async get () {
    const response = await fetch(this.url + '/webhook/' + webhookId, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    })

    return response.json()
  }

  /**
   * 
   */
   async post (webhookId, body = {}) {
    const response = await fetch(this.url + '/webhook/' + webhookId, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })

    return response.json()
  }

  /**
   * 
   */
  stream (webhookId, onChunk, intervalMs = 10000) {
    const interval = setInterval(() => {
      try {
        const response = await fetch(this.url + '/webhook/' + webhookId, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
        })

        for await (const chunk of response.body) {
          onChunk(JSON.parse(chunk.toString()))
        }
      } catch (err) {
        console.error(err.stack)
      }
    }, intervalMs)

    return () => {
      clearInterval(interval)
    }
  }
}
