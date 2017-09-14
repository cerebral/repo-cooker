import nodegit from 'nodegit'

const TYPES = {
  soft: nodegit.Reset.TYPE.SOFT,
  mixed: nodegit.Reset.TYPE.MIXED,
  hard: nodegit.Reset.TYPE.HARD,
}

export function resetRepository(path, type, ref) {
  const gitType = TYPES[type]
  if (gitType === 'undefined') {
    throw new Error(
      `Invalid reset type '${type}' (expected 'soft', 'mixed' or 'hard').`
    )
  }

  return nodegit.Repository.open(path).then(repo =>
    nodegit.Reference
      .nameToId(repo, ref)
      .then(oid => repo.getCommit(oid))
      .then(commit => nodegit.Reset(repo, commit, gitType, {}, 'master'))
  )
}
