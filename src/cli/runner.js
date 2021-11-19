import { cli } from '.'
import './news'
import './ip'
import './chan'
import './reddit'
import './twitter'
import './googleTrends'
import './youtube'

export async function run () {
  return cli
    .demandCommand(1)
    .exitProcess(false)
    .parse()
}
