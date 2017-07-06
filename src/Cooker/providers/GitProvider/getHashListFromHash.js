const Git = require('nodegit')

function getHashListFromHashToCommit(sha, commit) {
  if (!sha) {
    throw new Error(
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`
    )
  }
  return new Promise((resolve, reject) => {
    let done = false
    const list = []
    commit
      .history()
      .on('commit', commit => {
        if (done) {
          // discard
        } else if (commit.sha() === sha) {
          done = true
          resolve(list)
        } else {
          list.unshift(commit.sha())
        }
      })
      .on('end', () => done || resolve(sha === 'Big Bang' ? list : []))
      .start()
  })
}

/** Get commit sha list upto 'sha' but not including it.
 * Returns the list as it appears in the commit history (first commit first).
 */
export function getHashListFromHash(repoPath, sha) {
  return Git.Repository
    .open(repoPath)
    .then(repo => repo.getMasterCommit())
    .then(commit => getHashListFromHashToCommit(sha, commit))
}
