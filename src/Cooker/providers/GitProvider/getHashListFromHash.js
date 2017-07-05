const Git = require('nodegit')

function getHashListFromHashToCommit(sha, commit) {
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
