import nodegit from 'nodegit'

export function getLatestTagMatchingName(repoPath, regex) {
  if (typeof regex === 'string') {
    regex = RegExp(regex)
  }
  return nodegit.Repository.open(repoPath).then(repo =>
    nodegit.Tag
      .list(repo)
      .then(list =>
        Promise.all(
          list.map(tagName =>
            nodegit.Reference
              .lookup(repo, `refs/tags/${tagName}`)
              .then(ref => nodegit.Commit.lookup(repo, ref.target()))
              .then(commit => ({
                tag: tagName,
                date: commit.date().toJSON(),
              }))
          )
        )
      )
      .then(tags =>
        tags
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .map(tags => tags.tag)
          .find(tag => regex.test(tag))
      )
      .catch(console.log)
  )
}
