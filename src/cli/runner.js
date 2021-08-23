import { cli } from '.'
import './news'
import './ip'
import './chan'
import './reddit'

cli
  .demandCommand(1)
  .argv