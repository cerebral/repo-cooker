import * as fs from 'fs'

import { getBranchObject } from './getBranchObject'
import { listBranches } from 'isomorphic-git'
import { runAll } from '../../../helpers/runAll'

// Return the list of branches as objects with:
// { sha, name, date }
export async function getBranches(repoPath) {
  const branches = await listBranches({ fs, dir: repoPath })

  return runAll(branches.map(async name => getBranchObject(name, repoPath)))
}
