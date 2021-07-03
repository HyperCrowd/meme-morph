const EventEmitter = require('events')

class DelayQueue extends EventEmitter {
  queue = []
  lastResults = []
  delay = 200
  interval = null
  running = false
  onEmptyCallback = null

  /**
   *
   */
  constructor (delay = 500) {
    super()
    this.delay = delay
  }

  /**
   * 
   */
  start (onEmptyCallback) {
    if (this.interval) {
      return this
    }

    this.onEmptyCallback = onEmptyCallback

    this.interval = setInterval(async () => {
      await this.execute()
    }, this.delay)

    return this
  }

  /**
   * 
   */
  stop () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    return this
  }

  /**
   * 
   */
  add (promise) {
    this.queue.push(promise)
  }

  /**
   * 
   */
  async execute () {
    if (this.running) {
      return
    }

    this.running = true

    const task = this.queue.shift()

    if (this.queue.length === 0) {
      this.onEmptyCallback()
    }

    if (!task) {
      this.running = false
      return
    }

    const news = await task()

    this.emit('news', news)

    this.running = false
  }
}

module.exports = DelayQueue
