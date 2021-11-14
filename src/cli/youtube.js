import { cli } from '.' 
import { searchYoutube } from '../sources/youtube'
import { youtubeToCsv } from '../formatters/csv/youtube'
import { youtubeToText } from '../formatters/text/youtube'
import { youtubeToJson } from '../formatters/json/youtube'

cli
  .command('youtube <query>', 'Searches Google Trends', async (yargs) => {
    return yargs
      .positional('query', {
        describe: 'Query',
        default: undefined
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        default: 'text',
        description: 'Output format'
      })
      .option('from', {
        alias: 'f',
        type: 'string',
        default: undefined,
        description: 'Datetime to start search'
      })
      .option('to', {
        alias: 't',
        type: 'string',
        default: undefined,
        description: 'Datetime to end search'
      })
  }, async argv => {
    const trends = await searchYoutube(argv.query, argv.from, argv.to)
    
    let output

    switch (argv.output) {
      case 'text':
        output = youtubeToText(trends) || 'None'
        break
      case 'csv':
        output = youtubeToCsv(trends)
        break
      case 'json':
        output = youtubeToJson(trends)
        break
    }

    console.log(output)
  })
