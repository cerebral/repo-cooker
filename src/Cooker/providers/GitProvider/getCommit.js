import nodegit from 'nodegit'

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
    Promise.all(
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
  return nodegit.Repository
    .open(repoPath)
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
