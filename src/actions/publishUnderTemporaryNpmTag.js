export function publishUnderTemporaryNpmTag({ npm, props }) {
  const packages = Object.keys(props.newVersionByPackage)

  // Need to ensure successful release of all packages, so
  // we publish under a temporary tag first
  return Promise.all(
    packages.map(name => npm.publish(name, 'releasing'))
  ).then(temporaryNpmTagByPackage => ({
    temporaryNpmTagByPackage: packages.reduce(
      (temporaryNpmTagByPackage, name) => {
        temporaryNpmTagByPackage[name] = 'releasing'

        return temporaryNpmTagByPackage
      },
      {}
    ),
  }))
}
