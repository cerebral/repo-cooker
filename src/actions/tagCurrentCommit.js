export function tagCurrentCommit({ git }) {
  const now = new Date()
    .toISOString()
    .slice(0, 16)
    .replace('T', '_')
    .replace(':', '')
  const tag = `release_${now}`
  return git.createTagForCommit(tag).then(() => ({}))
}
