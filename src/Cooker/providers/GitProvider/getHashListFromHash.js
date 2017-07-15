const nodegit = require('nodegit')

function getHashListFromHashToCommit(sha, commit) {
  if (!sha) {
    throw new Error(
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`
    )
  }
  return new Promise((resolve, reject) => {
    let hitPreviousRelease = false
    const list = []
    commit
      .history()
      .on('commit', commit => {
        if (hitPreviousRelease) {
          return
        }

        if (commit.sha() === sha) {
          hitPreviousRelease = true
        } else {
          list.unshift(commit.sha())
        }
      })
      .on('end', () => {
        if (hitPreviousRelease || list.length < 50) {
          resolve(list)
        } else {
          resolve([])
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
    .then(repo => repo.getMasterCommit())
    .then(commit => getHashListFromHashToCommit(sha, commit))
}
