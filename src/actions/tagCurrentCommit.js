export function tagCurrentCommit({ git }) {
  const date = new Date().toISOString()
  const releaseDate = date
    .slice(0, 16)
    .replace('T', '_')
    .replace(':', '')
  // We have to prefix with "v" due to GitHub constraint
  const name = `v${releaseDate}`
  return git.createTagForCommit(name).then(() => ({ tag: { name, date } }))
}
