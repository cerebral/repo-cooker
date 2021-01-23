import { runAll } from '../helpers/runAll'

function updateField(
  content,
  currentVersionByPackage,
  newVersionByPackage,
  name
) {
  if (!content[name]) {
    return {}
  }
  const currentDeps = content[name]
  return {
    [name]: Object.keys(content[name]).reduce((dependencies, dependency) => {
      dependencies[dependency] =
        dependency in newVersionByPackage
          ? `${newVersionByPackage[dependency]}`
          : dependency in currentVersionByPackage
          ? `${currentVersionByPackage[dependency]}`
          : currentDeps[dependency]

      return dependencies
    }, {}),
  }
}

function createWriteCallback(
  name,
  newVersionByPackage,
  currentVersionByPackage
) {
  return function writeCallback(content) {
    const version = newVersionByPackage[name]

    /*
      If there are any dependencies, peerDependencies or devDependencies, we
      need to fill in the correct version from related packages.
    */
    return Object.assign(
      {},
      content,
      { version },
      updateField(
        content,
        currentVersionByPackage,
        newVersionByPackage,
        'dependencies'
      ),
      updateField(
        content,
        currentVersionByPackage,
        newVersionByPackage,
        'devDependencies'
      ),
      updateField(
        content,
        currentVersionByPackage,
        newVersionByPackage,
        'peerDependencies'
      )
    )
  }
}

export function writeVersionsToPackages({
  packageJson,
  props: { newVersionByPackage, currentVersionByPackage },
}) {
  const packages = Object.keys(newVersionByPackage)

  return runAll(
    packages.map(name =>
      packageJson.write(
        name,
        createWriteCallback(name, newVersionByPackage, currentVersionByPackage)
      )
    )
  ).then(() => ({}))
}
