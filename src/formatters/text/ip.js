export function ipToText (geo, torrent) {
  let contents = ''

  for (const content of torrent.contents) {
    console.log(content)
    contents += `
IMDB ID: ${content.imdbId || 'N/A'}
Name: ${content.name}
Torrent Name: ${content.torrent.name}
Category: ${content.category}
Size: ${content.torrent.size}
Start Date: ${content.startDate}
End Date: ${content.endDate}
Infohash: ${content.torrent.infohash || 'N/A'}
Is CP?: ${content.childPorn || false}\n`
  }

  const body = `IP: ${geo.ip}
Country: ${geo.country} / ${torrent.geoData.country}
Region: ${geo.region}
City: ${geo.city} / ${torrent.geoData.city}
Latitude: ${torrent.geoData.latitude}
Longitude: ${torrent.geoData.longitude}

Contents:
========
${contents}
`

  return body
}
