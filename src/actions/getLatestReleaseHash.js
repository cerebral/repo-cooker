export function getLatestReleaseHash({ git }) {
  return git
    .getLatestTagMatchingName('release_')
    .then(
      tag => (tag ? { hash: tag.hash, tag: tag.tag } : { hash: 'Big Bang' })
    )
}
