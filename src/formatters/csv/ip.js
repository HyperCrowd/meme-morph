const quoteRegex = /"/g

/**
 * 
 */
function escape (text = '') {
  return `"${(text.toString() || '').replace(quoteRegex, '\"')}"`
}

/**
 * 
 */
export function ipToCsv (geo, torrent) {
  const geoBody = `${
    escape(geo.ip)
  },${
    escape(geo.country)
  },${
    escape(geo.region)
  },${
    escape(geo.city)
  },${
    escape(torrent.geoData.latitude)
  },${
    escape(torrent.geoData.longitude)
  },${
    escape(torrent.contents.length)
  },${
    escape(torrent.hasPorno)
  },${
    escape(torrent.hasChildPorn || false)}`

  let torrentContents = ''
  
  if (torrent.contents.length > 0) {
    torrentContents = '\nimdbId,name,torrentName,category,size,startDate,endDate,infohash,isCP\n'

    for (const content of torrent.contents) {
      torrentContents += `${
        escape(content.imdbId || 'N/A')
      },${
        escape(content.name)
      },${
        escape(content.torrent.name)
      },${
        escape(content.category)
      },${
        escape(content.torrent.size)
      },${
        escape(content.startDate)
      },${
        escape(content.endDate)
      },${
        escape(content.torrent.infohash || 'N/A')
      },${
        escape(content.childPorn || false)
      }\n`
    }
  }

  return `ip,country,region,city,lat,long,torrentCount,hasPorno,hasCP
${geoBody}${torrentContents}
`
}
