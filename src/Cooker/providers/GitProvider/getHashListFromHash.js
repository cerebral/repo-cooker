import * as fs from 'fs'

import { log, readCommit, resolveRef } from 'isomorphic-git'

async function getHashListFromHashToHash(repoPath, fromHash, toHash) {
  if (!fromHash || !toHash) {
    throw new Error(
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`
    )
  }
  let since
  if (fromHash !== 'Big Bang') {
    // Verify that 'fromHash' is valid first
    try {
      const fromCommit = await readCommit({ fs, dir: repoPath, oid: fromHash })
      since = new Date(fromCommit.commit.committer.timestamp * 1000)
    } catch (error) {
      throw new Error(
        `Invalid hash value '${fromHash}' (not found in commit history).`
      )
    }
  }
  const logList = (await log({ fs, dir: repoPath, ref: toHash, since })).map(
    commit => commit.oid
  )

  return logList.reverse()
}

/** Get commit sha list upto 'hash' but not including it.
 * Returns the list in historical order (oldest commit first).
 */
export async function getHashListFromHash(repoPath, hash) {
  const headHash = await resolveRef({ fs, dir: repoPath, ref: 'HEAD' })

  return getHashListFromHashToHash(repoPath, hash, headHash)
}
