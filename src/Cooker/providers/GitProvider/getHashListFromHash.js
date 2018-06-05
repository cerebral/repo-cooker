// Import through proxy for better error message.
import { nodegit } from './nodegit'

function getHashListFromHashToHash(repo, fromHash, toHash) {
  if (!fromHash || !toHash) {
    throw new Error(
      `Missing hash parameter. For commits from origin of repository, use 'Big Bang' as hash.`
    )
  }

  return new Promise((resolve, reject) => {
    const list = []

    const revwalk = repo.createRevWalk()
    const walk = () =>
      revwalk
        .next()
        .then(oid => {
          const hash = oid.tostrS()
          if (hash === fromHash) {
            resolve(list)
          } else {
            list.unshift(hash)
            return walk()
          }
        })
        .catch(error => {
          if (error.errno === nodegit.Error.CODE.ITEROVER) {
            // Reached the end
            resolve(list)
          } else {
            reject(error)
          }
        })

    revwalk.sorting(nodegit.Revwalk.SORT.TIME)
    revwalk.push(toHash)
    // How can we detect that fromHash is in commit history ?
    if (fromHash !== 'Big Bang') {
      // Verify that 'fromHash' is valid first
      repo
        .getCommit(fromHash)
        .then(() => {
          revwalk.hide(fromHash)
          walk()
        })
        .catch(() =>
          reject(
            new Error(
              `Invalid hash value '${fromHash}' (not found in commit history).`
            )
          )
        )
    } else {
      walk()
    }
  })
}

/** Get commit sha list upto 'hash' but not including it.
 * Returns the list as it appears in the commit history (first commit first).
 */
export function getHashListFromHash(repoPath, hash) {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getHeadCommit()
      .then(commit => getHashListFromHashToHash(repo, hash, commit.sha()))
  )
}
