export function geoipToText (geo) {
  const body = `IP: ${geo.ip}
Country: ${geo.country}
Region: ${geo.region}
City: ${geo.city}

`

  return body
}
