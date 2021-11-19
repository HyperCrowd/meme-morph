import { writeFile, access, rm } from 'fs/promises'
import { constants } from 'fs'
import { resolve } from 'path'

const lockFile = resolve(__dirname, '../../.lock')

async function doesLockExist () {
  return access(lockFile, constants.W_OK)
    .then(() => true)
    .catch(() => false)
}

export async function lockCheck () {
  return new Promise(async resolve => {
    if (await doesLockExist()) {
      // A lock exists
      const interval = setInterval(async () => {
        // We wait to check the lock later
        if(await doesLockExist() === false) {
          // The lock has been deleted, clear the interval
          clearInterval(interval)
          // Create a new lock
          await writeFile(lockFile, '')
          // Then run the CLI runner
          resolve()
        }
      }, 5000)
    } else {
      // No lock exists, create one
      await writeFile(lockFile, 'locked')
      // Then run the CLI runner
      resolve()
    }
  })
}

export async function removeLock() {
  if (await doesLockExist()) {
    await rm(lockFile)
  }
}
