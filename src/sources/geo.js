import geoip from 'geoip-lite'

export function getGeo (ip) {
  const geo = geoip.lookup(ip)

  if (!geo) {
    return false
  }

  let location = {}

  if (geo.country) {
    location.country = geo.country
  }

  if (geo.region) {
    location.region = geo.region
  }

  if (geo.city) {
    location.city = geo.city
  }

  return location
}
