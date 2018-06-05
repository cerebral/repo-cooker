// Import through proxy for better error message.
import { nodegit } from './nodegit'

export function getLatestTagMatchingName(repoPath, regex) {
  if (typeof regex === 'string') {
    regex = RegExp(regex)
  }
  return nodegit.Repository.open(repoPath).then(repo =>
    nodegit.Tag.list(repo)
      .then(list =>
        list
          .sort((a, b) => (a > b ? -1 : 1))
          .find(tagName => regex.test(tagName))
      )
      .then(
        tagName =>
          tagName
            ? nodegit.Reference.lookup(repo, `refs/tags/${tagName}`)
                .then(ref => ref.peel(nodegit.Object.TYPE.COMMIT))
                .then(ref => nodegit.Commit.lookup(repo, ref.id()))
                .then(commit => ({
                  tag: tagName,
                  hash: commit.sha(),
                  date: commit.date().toJSON(),
                }))
            : null
      )
  )
}
