import { cli } from '.' 
import { searchReddit } from '../sources/reddit'
// import { chanToCsv } from '../formatters/csv/chan'
import { redditToText } from '../formatters/text/reddit'
// import { chanToJson } from '../formatters/json/chan'

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
        default: 'text',
        description: 'Output format'
      })    
  }, async argv => {
    const posts = await searchReddit(argv.query)
    let output

    switch (argv.output) {
      case 'text':
        output = redditToText(posts)
        break
      case 'csv':
        output = chanToCsv(posts)
        break
      case 'json':
        output = chanToJson(posts)
        break
    }

    console.log(output)
  })
