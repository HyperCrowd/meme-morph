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
  }, async argv => {
    const tweets = await searchTwitter(argv.query)

    let output

    switch (argv.output) {
      case 'text':
        output = twitterToText(tweets)
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
