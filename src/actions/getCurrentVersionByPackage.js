export function getCurrentVersionByPackage({ config, npm, props }) {
  const { semverByPackage, relatedPackagesByPackage } = props
  const neededPackageNames = Object.keys(semverByPackage).concat(
    ...Object.keys(semverByPackage).map(name => relatedPackagesByPackage[name])
  )
  return Promise.all(
    Object.keys(config.packagesPaths)
      .filter(name => neededPackageNames.includes(name))
      .map(name =>
        npm.getCurrentPackageVersion(name).then(version => ({
          name,
          version,
        }))
      )
  ).then(packages => ({
    currentVersionByPackage: packages.reduce(
      (currentVersionByPackage, pckg) => {
        currentVersionByPackage[pckg.name] = pckg.version

        return currentVersionByPackage
      },
      {}
    ),
  }))
}
