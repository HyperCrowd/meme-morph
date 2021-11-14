import { cli } from '.'
import './news'
import './ip'
import './chan'
import './reddit'
import './twitter'

cli
  .demandCommand(1)
  .exitProcess(false)
  .argv
