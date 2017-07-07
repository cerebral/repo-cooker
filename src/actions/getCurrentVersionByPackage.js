export function getCurrentVersionByPackage({ npm, props }) {
  return Promise.all(
    props.semverByPackage.map(({ name }) =>
      npm.getCurrentPackageVersion(name).then(version => ({
        name,
        version,
      }))
    )
  ).then(currentVersionByPackage => ({ currentVersionByPackage }))
}
