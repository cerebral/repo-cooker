export function publishUnderTemporaryNpmTag({ npm, props }) {
  // Need to ensure successful release of all packages, so
  // we publish under a temporary tag first
  return Promise.all(
    props.newVersionByPackage.map(({ name }) =>
      npm.publish(name, 'releasing').then(() => ({
        name,
        tag: 'releasing',
      }))
    )
  ).then(temporaryNpmTagByPackage => ({ temporaryNpmTagByPackage }))
}
