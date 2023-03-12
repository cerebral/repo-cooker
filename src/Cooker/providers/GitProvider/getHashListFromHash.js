import * as fs from 'fs'

import { log, readCommit, resolveRef } from 'isomorphic-git'

async function getHashListFromHashToHash(repoPath, fromHash, toHash) {
  if (!fromHash || !toHash) {
    throw new Error(
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`
    )
  }
  if (fromHash !== 'Big Bang') {
    // Verify that 'fromHash' is valid first
    try {
      await readCommit({ fs, dir: repoPath, oid: fromHash })
    } catch (error) {
      throw new Error(
        `Invalid hash value '${fromHash}' (not found in commit history).`
      )
    }
  }
  const logList = (await log({ fs, dir: repoPath, ref: toHash })).map(
    commit => commit.oid
  )
  if (fromHash !== 'Big Bang') {
    logList.splice(logList.indexOf(fromHash))
  }

  return logList.reverse()
}

/** Get commit sha list upto 'hash' but not including it.
 * Returns the list in historical order (oldest commit first).
 */
export async function getHashListFromHash(repoPath, hash) {
  const headHash = await resolveRef({ fs, dir: repoPath, ref: 'HEAD' })

  return getHashListFromHashToHash(repoPath, hash, headHash)
}
