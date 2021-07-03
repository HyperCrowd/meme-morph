const EventSource = require('eventsource')

class Stream {
  constructor (url, onMessage) {
    console.info(`Connecting to EventStreams at ${url}`);
    this.eventSource = new EventSource(url);
  
    this.eventSource.onopen = function(event) {
      console.info('--- Opened connection.')
    }
  
    this.eventSource.onerror = function(event) {
      console.error('--- Encountered error', event)
    }
  
    this.eventSource.onmessage = onMessage    
  }
}

module.exports = Stream
