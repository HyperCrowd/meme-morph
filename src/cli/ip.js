import { cli } from '.' 
import { ipToCsv } from '../formatters/csv/ip'
import { ipToJson } from '../formatters/json/ip'
import { ipToText } from '../formatters/text/ip'
import { getGeoFromIp } from '../sources/geoip'
import { getAntiTorrentFromIp } from '../sources/antitor'

cli
  .command('ip <ip>', 'Gets the geolocational information about an IP', async (yargs) => {
    return yargs
      .positional('ip', {
        describe: 'IP Address',
        default: undefined
      })
  }, async argv => {
    const geo = getGeoFromIp(argv.ip)
    const torrent = await getAntiTorrentFromIp(argv.ip)
    let output

    switch (argv.output) {
      case 'csv':
        output = ipToCsv(geo, torrent)
        break
      case 'text':
        output = ipToText(geo, torrent)
        break
      case 'json':
        output = ipToJson(geo, torrent)
        break
    }

    console.log(output)
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    default: 'text',
    description: 'Output format'
  })
    
