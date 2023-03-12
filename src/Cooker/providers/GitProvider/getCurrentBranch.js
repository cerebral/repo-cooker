import * as fs from 'fs'

import { currentBranch } from 'isomorphic-git'
import { getBranchObject } from './getBranchObject'

export async function getCurrentBranch(repoPath) {
  const name = await currentBranch({ fs, dir: repoPath })

  return getBranchObject(name, repoPath)
}
