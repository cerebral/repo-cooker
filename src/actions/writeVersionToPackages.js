export function writeVersionToPackages({
  packageJson,
  props: { newVersionsByPackage },
}) {
  return Promise.all(
    newVersionsByPackage.map(({ name, version }) =>
      packageJson.writeVersion(name, version)
    )
  ).then(() => ({}))
}
