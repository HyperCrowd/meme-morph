import { readFile } from 'fs/promises'

/**
 * 
 */
export async function readNewlineFile (path) {
  return (await readFile(path)).toString().split('\n')
}
