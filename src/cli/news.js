import { cli } from '.' 
import { newsApiToJson } from '../formatters/json/newsapi'
import { newsApiToText } from '../formatters/text/newsapi'
import { newsApiToCsv } from '../formatters/csv/newsapi'
import { newsQuery } from '../sources/newsapi'

cli
  .command('news <query>', 'Fetches news that contains the query', (yargs) => {
    return yargs
      .positional('query', {
        describe: 'Text to search for',
        default: undefined
      })
      .option('country', {
        alias: 'c',
        type: 'string',
        default: 'us',
        description: 'Country to select for'
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
        default: 'us',
        description: 'Datetime to start search'
      })
      .option('to', {
        alias: 't',
        type: 'string',
        default: 'us',
        description: 'Datetime to end search'
      })
  }, async argv => {
    const result = await newsQuery(argv.query, argv.country, argv.from, argv.to)
    let output

    switch (argv.output) {
      case 'csv':
        output = newsApiToCsv(result.articles)
        break
      case 'text':
        output = newsApiToText(result.articles)
        break
      case 'json':
        output = newsApiToJson(result.articles)
        break
    }

    console.log(output)
  })
