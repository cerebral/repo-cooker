import * as fs from 'fs'

import { readCommit, resolveRef } from 'isomorphic-git'

export async function getBranchObject(name, repoPath) {
  const hash = await resolveRef({ fs, dir: repoPath, ref: name })
  const commit = (await readCommit({ fs, dir: repoPath, oid: hash })).commit

  return {
    date: new Date(commit.author.timestamp * 1000).toISOString(),
    name,
    hash,
  }
}
