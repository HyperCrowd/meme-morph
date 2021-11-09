import { cli } from '.' 
import { searchGoogleTrends } from '../sources/googleTrends'
import { googleTrendsToCsv } from '../formatters/csv/googleTrends'
import { googleTrendsToText } from '../formatters/text/googleTrends'
import { googleTrendsToJson } from '../formatters/json/googleTrends'

cli
  .command('googleTrends <topics>', 'Searches Google Trends', async (yargs) => {
    return yargs
      .positional('topics', {
        describe: 'Comma-separated topics',
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
    const trends = await searchGoogleTrends(argv.topics, argv.from, argv.to, argv.size)
    
    let output

    switch (argv.output) {
      case 'text':
        output = googleTrendsToText(trends) || 'None'
        break
      case 'csv':
        output = googleTrendsToCsv(trends)
        break
      case 'json':
        output = googleTrendsToJson(trends)
        break
    }

    console.log(output)
  })
