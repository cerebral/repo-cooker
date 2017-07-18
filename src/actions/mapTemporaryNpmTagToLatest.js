export function mapTemporaryNpmTagToLatest({ npm, props }) {
  const packages = Object.keys(props.temporaryNpmTagByPackage)

  return Promise.all(
    packages.map(name =>
      npm.replaceTag(name, props.temporaryNpmTagByPackage[name], 'latest')
    )
  ).then(latestNpmTagByPackage => ({
    latestNpmTagByPackage: packages.reduce((temporaryNpmTagByPackage, name) => {
      temporaryNpmTagByPackage[name] = 'latest'

      return temporaryNpmTagByPackage
    }, {}),
  }))
}
