import { RELEASE_RE } from './getLatestReleaseHash'

export function tagCurrentCommit({ git }) {
  const date = new Date().toISOString()
  const releaseDate = date
    .slice(0, 16)
    .replace('T', '_')
    .replace(':', '')
  // This is used to detect latest release in getLatestReleaseHash
  // THIS NAME MUST MATCH RELEASE_RE
  const name = `v${releaseDate}`
  if (!RELEASE_RE.test(name)) {
    // This should NEVER EVER EVER happen :-)
    throw new Error(`Tag '${name}' does not match ${RELEASE_RE} !!`)
  }

  return git.createTagForCommit(name).then(() => ({ tag: { name, date } }))
}
