function createNewContent(content, version, versionsByPackage) {
  /*
    We need to grab versions of any dependencies and fill it in
  */
  const dependencies = Object.keys(content.dependencies || {}).reduce(
    (acc, dependency) => {
      const pckg = versionsByPackage.find(({ name }) => name === dependency)

      acc.dependencies[dependency] = pckg
        ? pckg.version
        : acc.dependencies[dependency]

      return acc
    },
    {
      dependencies: {},
    }
  )

  return Object.assign(
    {},
    content,
    { version },
    content.depenendices ? dependencies : {}
  )
}

export function writeVersionToPackages({
  packageJson,
  props: { newVersionsByPackage, currentVersionsByPackage },
}) {
  return Promise.all(
    newVersionsByPackage.map(({ name, version }) =>
      packageJson.write(
        name,
        createNewContent(
          version,
          // By combining new versions and current versions we
          // will get a complete list of all possible package versions,
          // also for dependencies
          newVersionsByPackage.concat(currentVersionsByPackage)
        )
      )
    )
  ).then(() => ({}))
}
