import { cli } from '.'
import './news'
import './ip'
import './chan'
import './reddit'
import './twitter'
import './googleTrends'

cli
  .demandCommand(1)
  .argv