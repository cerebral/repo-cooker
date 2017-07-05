export function getLatestReleaseHash({ git }) {
  return git.getLatestTagMatchingName('release_').then(hash => ({ hash }))
}
