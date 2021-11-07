import { cli } from '.' 
import { ipToCsv } from '../formatters/csv/ip'
import { ipToJson } from '../formatters/json/ip'
import { ipToText } from '../formatters/text/ip'
import { getGeoFromIp } from '../sources/geoip'
import { getAntiTorrentFromIp } from '../sources/antitor'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

async function delay (timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

/**
 * 
 */
async function getDetails (ip, outputMode) {
  const geo = getGeoFromIp(ip)
  const torrent = await getAntiTorrentFromIp(ip)

  switch (outputMode) {
    case 'csv':
      return ipToCsv(geo, torrent)
    case 'text':
      return ipToText(geo, torrent) || 'None'
    case 'json':
      return ipToJson(geo, torrent)
  }
}

/**
 * 
 */
cli
  .command('ip <ip>', 'Gets the geolocational information about an IP', async (yargs) => {
    return yargs
      .positional('ip', {
        describe: 'IP Address',
        default: undefined,
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        default: 'text',
        description: 'Output format'
      })
    
  }, async argv => {
    const isIp = argv.ip.toString().match(ipRegex) !== null

    if (isIp) {
      // Checking a single IP
      const output = await getDetails(argv.ip, argv.output)
      console.log(output)
    } else {
      // Checking many IPs
      const ipsFilepath = resolve(argv.ip)
      const ips = (await readFile(ipsFilepath)).toString().split('\n')
      
      for (const ip of ips) {
        const output = await getDetails(ip, argv.output)
        console.log(output)
        delay(1000)
      }
    }
  })
