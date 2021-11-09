import googleTrends from 'google-trends-api'
import { spark_line } from 'ascii-graphs'

const wait = async (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))

const eventsToAscii = (events) => spark_line(events.map(event => event.value))

export const searchGoogleTrends = async (keyword, from, to) => {
  const startTime = new Date(from === undefined
    ? Date.now() - (3600 * 1000)
    : from
  )
  const endTime = new Date(to === undefined
    ? Date.now()
    : to
  )

  const lowerCase = keyword.toLowerCase()

  const autoComplete = JSON.parse((await googleTrends.autoComplete({
    keyword
  }))).default.topics
    .filter(topic => topic.title.toLowerCase() !== lowerCase)
    .map(topic => `${topic.title} (${topic.type})`)

  await wait()

  const interestOverTimeResponse = JSON.parse(await googleTrends.interestOverTime({
    keyword,
    startTime,
    endTime,
    granularTimeResolution: true
  })).default.timelineData.map(event => {
    return {
      time: parseInt(event.time),
      value: event.value[0]
    }
  })

  const interestOverTimeGraph = eventsToAscii(interestOverTimeResponse)
  const interestOverTime = {
    data: interestOverTimeResponse,
    graph: interestOverTimeGraph
  }

  await wait()

  const relatedQueriesResponse = JSON.parse((await googleTrends.relatedQueries({
    keyword
  }))).default.rankedList
  
  const relatedQueries = []
  
  relatedQueriesResponse.forEach(entry => {
    entry.rankedKeyword.map(rankedKeyword => {
      if (relatedQueries.indexOf(rankedKeyword.query) === -1) {
        relatedQueries.push(rankedKeyword.query)
      }
    })
  })

  await wait()

  const relatedTopicsResponse = JSON.parse((await googleTrends.relatedTopics({
    keyword,
    startTime,
    endTime
  }))).default.rankedList

  const relatedTopics = []
  
  relatedTopicsResponse.forEach(entry => {
    entry.rankedKeyword.map(rankedKeyword => {
      if (relatedQueries.indexOf(rankedKeyword.query) === -1) {
        relatedQueries.push(rankedKeyword.query)
      }
    })
  })

  return {
    autoComplete,
    interestOverTime,
    relatedQueries,
    relatedTopics
  }
}
