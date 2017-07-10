export function tagCurrentCommit({ git }) {
  const date = new Date().toISOString()
  const releaseDate = date.slice(0, 16).replace('T', '_').replace(':', '')
  const name = `release_${releaseDate}`
  return git.createTagForCommit(name).then(() => ({ tag: { name, date } }))
}
