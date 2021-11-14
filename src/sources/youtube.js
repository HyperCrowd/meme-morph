import Scraper from '@yimura/scraper'

const wait = async (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout))

export const searchYoutube = async (keywords) => {

  const youtube = new Scraper.default()
  const queries = keywords.split(',').map(k => k.trim())

  const results = {}
  
  for (const query of queries) {
    results[query] = {
      videos: [],
      streams: []
    }

    const result = results[query]
    const response = await youtube.search(query)

    response.videos
      .filter(video => video.uploaded.indexOf('1 hour ago') > -1 || video.uploaded.indexOf('2 hours ago') > -1)
      .forEach(video => {
        result.videos.push({
          description: video.description,
          duration: video.duration_raw,
          views: video.views,
          id: video.id,
          title: video.title,
          channel: video.channel === undefined
           ? false
           : video.channel.name,
          channelUrl: video.channel === undefined
           ? false
           : video.channel.link
        })
      })

    response.streams
      .forEach(video => {
        result.streams.push({
          views: video.watching,
          id: video.id,
          title: video.title,
          channel: video.channel === undefined
            ? false
            : video.channel.name,
          channelUrl: video.channel === undefined
            ? false
            : video.channel.link
        })
      })

    await wait()
  }

  return results
}
