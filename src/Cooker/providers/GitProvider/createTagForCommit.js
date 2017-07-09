import nodegit from 'nodegit'

export function createTagForCommit(path, tag, message = '', ref = 'HEAD') {
  return nodegit.Repository.open(path).then(repo =>
    nodegit.Reference
      .nameToId(repo, ref)
      .then(oid => nodegit.Commit.lookup(repo, oid))
      .then(commit =>
        nodegit.Tag.create(
          repo,
          tag,
          commit,
          repo.defaultSignature(),
          message,
          // 1 = force
          1
        )
      )
  )
}
