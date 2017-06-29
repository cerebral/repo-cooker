import nodegit from 'nodegit'
import { extractInfo } from './extractInfo'

function extractAuthor(commit) {
  const author = commit.author()
  return {
    name: author.name(),
    email: author.email(),
  }
}

function extractChangedFiles(diffList) {
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

export function extractCommit(repoPath, sha) {
  return nodegit.Repository
    .open(repoPath)
    .then(repo => repo.getCommit(sha))
    .then(commit =>
      commit.getDiff().then(extractChangedFiles).then(files =>
        Object.assign(
          {},
          {
            author: extractAuthor(commit),
            date: commit.date().toJSON(),
            sha: commit.sha(),
          },
          extractInfo(commit.message()),
          { files }
        )
      )
    )
}
