
import express from 'express'
// const bodyParser = require('body-parser')

export class HttpService {
  constructor () {
    this.app = express()
    // this.app.use(bodyParser.json({ extended: true }))
  }

  /**
   * 
   */
  setPostRoute(path, callback) {
    this.app.post(path, callback)
  }

  /**
   * 
   */
  async start (port = 8080) {
    return new Promise(resolve => {
      this.app.listen(port, resolve)
      console.log('Listening on', port)
    })
  }
}
