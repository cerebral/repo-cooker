export function getCurrentVersionsByPackage({ packageJson, props }) {
  return Promise.all(
    props.semverByPackage.map(({ name }) =>
      packageJson.getPackageVersion(name).then(version => ({
        name,
        version,
      }))
    )
  ).then(currentVersionsByPackage => ({ currentVersionsByPackage }))
}
