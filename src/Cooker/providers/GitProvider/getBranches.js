// Import through proxy for better error message.
import { nodegit } from './nodegit'

const BRANCH_RE = /^refs\/heads\/(.+)$/

// Return the list of branches as objects with:
// { sha, name, date }
export function getBranches(repoPath) {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getReferenceNames(nodegit.Reference.TYPE.LISTALL)
      .then(list =>
        Promise.all(
          list.map(refName =>
            nodegit.Reference
              .lookup(repo, refName)
              .then(ref => ref.peel(nodegit.Object.TYPE.COMMIT))
              .then(ref => nodegit.Commit.lookup(repo, ref.id()))
              .then(commit => ({
                date: commit.date().toJSON(),
                name: (BRANCH_RE.exec(refName) || {})[1],
                hash: commit.sha(),
              }))
          )
        )
      )
      .then(list => list.filter(l => l.name))
  )
}
