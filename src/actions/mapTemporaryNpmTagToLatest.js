export function mapTemporaryNpmTagToLatest({ npm, props }) {
  return Promise.all(
    props.temporaryNpmTagByPackage.map(({ name, tag }) =>
      npm.replaceTag(name, tag, 'latest').then(() => ({
        name,
        tag: 'latest',
      }))
    )
  ).then(latestNpmTagByPackage => ({ latestNpmTagByPackage }))
}
