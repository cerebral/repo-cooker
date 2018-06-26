export function publishUnderTemporaryNpmTag({
  config,
  npm,
  packageJson,
  props,
}) {
  const packages = Object.keys(props.newVersionByPackage).filter(
    name =>
      props.newVersionByPackage[name] !== props.currentVersionByPackage[name]
  )

  // Need to ensure successful release of all packages, so
  // we publish under a temporary tag first
  return Promise.all(
    packages.map(name =>
      packageJson.get(name).then(info => (info.private ? null : name))
    )
  )
    .then(names => names.filter(name => name !== null))
    .then(names =>
      Promise.all(names.map(name => npm.publish(name, 'releasing')))
        .then(temporaryNpmTagByPackage => ({
          temporaryNpmTagByPackage: packages.reduce(
            (temporaryNpmTagByPackage, name) => {
              temporaryNpmTagByPackage[name] = 'releasing'

              return temporaryNpmTagByPackage
            },
            {}
          ),
        }))
        .then(
          arg =>
            config.dryRun
              ? arg
              : new Promise(resolve => setTimeout(() => resolve(arg), 3000))
        )
    )
}
