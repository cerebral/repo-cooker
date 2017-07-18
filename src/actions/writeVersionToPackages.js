function createWriteCallback(
  name,
  newVersionsByPackage,
  currentVersionsByPackage
) {
  return function writeCallback(content) {
    const version = newVersionsByPackage[name]

    /*
      If there are any dependencies we need to fill in the correct
      version from related packages, them being bumped or not
    */
    const dependencies =
      content.dependencies &&
      Object.keys(content.dependencies).reduce((dependencies, dependency) => {
        dependencies[dependency] =
          newVersionsByPackage[dependency] ||
          currentVersionsByPackage[dependency] ||
          dependencies[dependency]

        return dependencies
      }, {})

    return Object.assign(
      {},
      content,
      { version },
      dependencies ? { dependencies } : {}
    )
  }
}

export function writeVersionToPackages({
  packageJson,
  props: { newVersionsByPackage, currentVersionsByPackage },
}) {
  const packages = Object.keys(newVersionsByPackage)

  return Promise.all(
    packages.map(name =>
      packageJson.write(
        name,
        createWriteCallback(
          name,
          newVersionsByPackage,
          currentVersionsByPackage
        )
      )
    )
  ).then(() => ({}))
}
