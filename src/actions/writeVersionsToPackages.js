function createWriteCallback(
  name,
  newVersionByPackage,
  currentVersionByPackage
) {
  return function writeCallback(content) {
    const version = newVersionByPackage[name]

    /*
      If there are any dependencies we need to fill in the correct
      version from related packages, them being bumped or not
    */
    const dependencies =
      content.dependencies &&
      Object.keys(content.dependencies).reduce((dependencies, dependency) => {
        dependencies[dependency] =
          dependency in newVersionByPackage
            ? `^${newVersionByPackage[dependency]}`
            : dependency in currentVersionByPackage
              ? `^${currentVersionByPackage[dependency]}`
              : dependencies[dependency]

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

export function writeVersionsToPackages({
  packageJson,
  props: { newVersionByPackage, currentVersionByPackage },
}) {
  const packages = Object.keys(newVersionByPackage)

  return Promise.all(
    packages.map(name =>
      packageJson.write(
        name,
        createWriteCallback(name, newVersionByPackage, currentVersionByPackage)
      )
    )
  ).then(() => ({}))
}
