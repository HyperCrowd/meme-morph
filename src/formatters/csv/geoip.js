const quoteRegex = /"/g

/**
 * 
 */
function escape (text) {
  return `"${(text || '').replace(quoteRegex, '\"')}"`
}

/**
 * 
 */
export function geoipToCsv (geo) {
  const body = `${escape(geo.ip)},${escape(geo.country)},${escape(geo.region)},${escape(geo.city)}`

  return `ip,country,region,city
${body}`
}
