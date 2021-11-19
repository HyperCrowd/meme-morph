import { cli } from '.' 
import { searchReddit } from '../sources/reddit'
import { redditToCsv } from '../formatters/csv/reddit'
import { redditToText } from '../formatters/text/reddit'
import { redditToJson } from '../formatters/json/reddit'

cli
  .command('reddit <query>', 'Searches Reddit', async (yargs) => {
    return yargs
      .positional('query', {
        describe: 'Query',
        default: undefined
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        default: 'json',
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
      .option('size', {
        alias: 's',
        type: 'number',
        default: 2000,
        description: 'Number of results to return'
      })
  }, async argv => {
    const posts = await searchReddit(argv.query, argv.from, argv.to, argv.size)
    
    let output

    switch (argv.output) {
      case 'text':
        output = redditToText(posts) || 'None'
        break
      case 'csv':
        output = redditToCsv(posts)
        break
      case 'json':
        output = redditToJson(posts)
        break
    }

    console.log(output)
  })
