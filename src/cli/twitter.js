import { cli } from '.' 
import { twitterToJson } from '../formatters/json/twitter'
import { twitterToText } from '../formatters/text/twitter'
import { twitterToCsv } from '../formatters/csv/twitter'
import { searchTwitter } from '../sources/twitter'

cli
  .command('twitter <query>', 'Searches Twitter', async (yargs) => {
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
      .option('likes', {
        alias: 'l',
        type: 'number',
        default: 0,
        description: 'Minimum number of likes a tweet has to have'
      })
  }, async argv => {
    const tweets = await searchTwitter(argv.query, argv.from, argv.to, argv.likes)

    let output

    switch (argv.output) {
      case 'text':
        output = twitterToText(tweets) || 'None'
        break
      case 'csv':
        output = twitterToCsv(tweets)
        break
      case 'json':
        output = twitterToJson(tweets)
        break 
    }
    
    console.log(output)
  })
