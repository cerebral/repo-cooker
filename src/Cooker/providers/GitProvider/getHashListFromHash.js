const nodegit = require('nodegit')

function getHashListFromHashToCommit(sha, commit) {
  if (!sha) {
    throw new Error(
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`
    )
  }

  return new Promise((resolve, reject) => {
    let reachedHash = false
    const list = []
    commit
      .history()
      .on('commit', commit => {
        if (reachedHash) {
          return
        }

        if (commit.sha() === sha) {
          reachedHash = true
        } else {
          list.unshift(commit.sha())
        }
      })
      .on('end', () => {
        if (reachedHash || sha === 'Big Bang') {
          resolve(list)
        } else {
          reject(
            new Error(
              `Invalid hash value '${sha}' (not found in commit history).`
            )
          )
        }
      })
      .start()
  })
}

/** Get commit sha list upto 'sha' but not including it.
 * Returns the list as it appears in the commit history (first commit first).
 */
export function getHashListFromHash(repoPath, sha) {
  return nodegit.Repository
    .open(repoPath)
    .then(repo => repo.getHeadCommit())
    .then(commit => getHashListFromHashToCommit(sha, commit))
}
