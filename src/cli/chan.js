import { cli } from '.' 
import { search4Plebs } from '../sources/4plebs'
import { chanToCsv } from '../formatters/csv/chan'
import { chanToText } from '../formatters/text/chan'
import { chanToJson } from '../formatters/json/chan'

cli
  .command('chan <query> <board>', 'Searches 4chan archives', async (yargs) => {
    return yargs
      .positional('query', {
        describe: 'Query',
        default: undefined
      })
      .positional('board', {
        describe: 'Board name',
        default: 'pol'
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        default: 'text',
        description: 'Output format'
      })
  }, async argv => {
    const posts = await search4Plebs(argv.query, argv.board)
    let output

    switch (argv.output) {
      case 'csv':
        output = chanToCsv(posts)
        break
      case 'text':
        output = chanToText(posts) || 'None'
        break
      case 'json':
        output = chanToJson(posts)
        break
    }

    console.log(output)
  })
