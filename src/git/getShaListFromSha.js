const Git = require('nodegit')

function getShaListFromShaToCommit(sha, commit) {
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
export function getShaListFromSha(repoPath, sha) {
  return Git.Repository
    .open(repoPath)
    .then(repo => repo.getMasterCommit())
    .then(commit => getShaListFromShaToCommit(sha, commit))
}
