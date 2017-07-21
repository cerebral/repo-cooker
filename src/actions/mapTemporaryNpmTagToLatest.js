export function mapTemporaryNpmTagToLatest({
  npm,
  props: { temporaryNpmTagByPackage, newVersionByPackage },
}) {
  const packages = Object.keys(temporaryNpmTagByPackage)

  return Promise.all(
    packages.map(name =>
      npm.replaceTag(
        name,
        newVersionByPackage[name],
        temporaryNpmTagByPackage[name],
        'latest'
      )
    )
  ).then(() => ({
    latestNpmTagByPackage: packages.reduce((latestNpmTagByPackage, name) => {
      latestNpmTagByPackage[name] = 'latest'

      return latestNpmTagByPackage
    }, {}),
  }))
}
