import * as fs from 'fs'

import { checkout } from 'isomorphic-git'

export async function restoreRepository(repoPath) {
  return checkout({ fs, dir: repoPath, force: true })
}
