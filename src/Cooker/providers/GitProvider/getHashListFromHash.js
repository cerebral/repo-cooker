const Git = require('nodegit')

function getHashListFromHashToCommit(sha, commit) {
  return new Promise((resolve, reject) => {
    let done = false
    let timeout = null
    const list = []
    commit
      .history()
      .on('commit', commit => {
        if (done) {
          // discard
        } else if (commit.sha() === sha) {
          done = true
          clearTimeout(timeout)
          resolve(list)
        } else {
          clearTimeout(timeout)
          list.unshift(commit.sha())
          timeout = setTimeout(() => resolve(list))
        }
      })
      .start()
  })
}

/** Get commit sha list upto 'sha' but not including it.
 * There is no guarantee as to the commit order.
 */
export function getHashListFromHash(repoPath, sha) {
  return Git.Repository
    .open(repoPath)
    .then(repo => repo.getMasterCommit())
    .then(commit => getHashListFromHashToCommit(sha, commit))
}
