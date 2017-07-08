export function writeVersionToPackages({
  packageJson,
  props: { newVersionByPackage },
}) {
  return Promise.all(
    newVersionByPackage.map(({ name, version }) =>
      packageJson.writeVersion(name, version)
    )
  ).then(() => ({}))
}
