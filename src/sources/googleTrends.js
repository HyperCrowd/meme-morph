import googleTrends from 'google-trends-api'
import { spark_line } from 'ascii-graphs'
import { getGoogleTrendsQuery } from '../query/googleTrends'

const wait = async (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))

const eventsToAscii = (events) => spark_line(events.map(event => event.value))

// https://developers.google.com/apis-explorer

export const searchGoogleTrends = async (keywords, from, to) => {
  const startTime = new Date(from === undefined
    ? Date.now() - (3600 * 1000)
    : from
  )
  const endTime = new Date(to === undefined
    ? Date.now()
    : to
  )

  const results = {}
  const queries = getGoogleTrendsQuery(keywords)

  for (const keyword of queries) {    
    results[keyword] = {}
    const result = results[keyword]
    const lowerCase = keyword.toLowerCase()

    result.autoComplete = JSON.parse((await googleTrends.autoComplete({
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
    result.interestOverTime = {
      data: interestOverTimeResponse,
      graph: interestOverTimeGraph
    }

    await wait()

    const relatedQueriesResponse = JSON.parse((await googleTrends.relatedQueries({
      keyword
    }))).default.rankedList
    
    result.relatedQueries = []
    
    relatedQueriesResponse.forEach(entry => {
      entry.rankedKeyword.map(rankedKeyword => {
        if (result.relatedQueries.indexOf(rankedKeyword.query) === -1) {
          result.relatedQueries.push(rankedKeyword.query)
        }
      })
    })

    await wait()

    const relatedTopicsResponse = JSON.parse((await googleTrends.relatedTopics({
      keyword,
      startTime,
      endTime
    }))).default.rankedList

    result.relatedTopics = []
    
    relatedTopicsResponse.forEach(entry => {
      entry.rankedKeyword.map(rankedKeyword => {
        if (result.relatedQueries.indexOf(rankedKeyword.query) === -1) {
          result.relatedQueries.push(rankedKeyword.query)
        }
      })
    })

    await wait()
  }

  return results
}
