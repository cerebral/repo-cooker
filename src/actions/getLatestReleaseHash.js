export const RELEASE_RE = /[a-zA-Z_]+\d\d\d\d-\d\d-\d\d_\d\d\d\d/

export function getLatestReleaseHash({ git }) {
  return git
    .getLatestTagMatchingName(RELEASE_RE)
    .then(tag =>
      tag ? { hash: tag.hash, tag: tag.tag } : { hash: 'Big Bang' }
    )
}
