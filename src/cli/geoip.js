import { cli } from '.' 
import { geoipToCsv } from '../formatters/csv/geoip'
import { geoipToJson } from '../formatters/json/geoip'
import { geoipToText } from '../formatters/text/geoip'
import { getGeoFromIp } from '../sources/geoip'

cli
  .command('geoip <ip>', 'Gets the geolocational information about an IP', (yargs) => {
    return yargs
      .positional('ip', {
        describe: 'IP Address',
        default: undefined
      })
  }, async argv => {
    const result = getGeoFromIp(argv.ip)
    let output

    switch (argv.output) {
      case 'csv':
        output = geoipToCsv(result)
        break
      case 'text':
        output = geoipToText(result)
        break
      case 'json':
        output = geoipToJson(result)
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
    
