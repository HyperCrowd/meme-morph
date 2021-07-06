import geoip from 'geoip-lite'

export function getGeoFromIp (ip) {
  const result = {
    ip
  }
  const geo = geoip.lookup(ip)

  if (!geo) {
    return result
  }

  if (geo.country) {
    result.country = geo.country
  }

  if (geo.region) {
    result.region = geo.region
  }

  if (geo.city) {
    result.city = geo.city
  }

  return result
}
