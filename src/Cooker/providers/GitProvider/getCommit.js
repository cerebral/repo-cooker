// Import through proxy for better error message.
import { nodegit } from './nodegit'
import { runAll } from '../../../helpers/runAll'

function getAuthor(commit) {
  const author = commit.author()
  return {
    name: author.name(),
    email: author.email(),
  }
}

function getChangedFiles(diffList) {
  const files = []
  return new Promise((resolve, reject) => {
    runAll(
      diffList.map(diff =>
        diff.patches().then(patches => {
          files.push(...patches.map(patch => patch.newFile().path()))
        })
      )
    )
      .then(() => {
        resolve(files.sort())
      })
      .catch(reject)
  })
}

export function getCommit(repoPath, hash) {
  return nodegit.Repository.open(repoPath)
    .then(repo => repo.getCommit(hash))
    .then(commit =>
      commit
        .getDiff()
        .then(getChangedFiles)
        .then(files => ({
          author: getAuthor(commit),
          date: commit.date().toJSON(),
          hash: commit.sha(),
          message: commit.message(),
          files,
        }))
    )
}
