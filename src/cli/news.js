import { cli } from '.' 
import { newsApiToText } from '../formatters/text/newsapi'
import { newsQuery } from '../sources/newsapi'

cli
  .command('news <query>', 'Fetches news', (yargs) => {
    return yargs
      .positional('query', {
        describe: 'Text to search for',
        default: undefined
      })
  }, async argv => {
    const result = await newsQuery(argv.query, argv.country)
    const text = newsApiToText(result.articles)
    console.log(text)
  })
  .option('country', {
    alias: 'c',
    type: 'string',
    default: 'us',
    description: 'Country to select for'
  })
