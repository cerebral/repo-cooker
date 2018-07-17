export function publishUnderTemporaryNpmTag({
  config,
  npm,
  packageJson,
  props,
}) {
  const related = props.relatedPackagesByPackage
  const packages = Object.keys(props.newVersionByPackage).filter(
    name =>
      props.newVersionByPackage[name] !== props.currentVersionByPackage[name]
  )
  const existingPackages = Object.keys(props.newVersionByPackage).filter(
    name =>
      props.newVersionByPackage[name] === props.currentVersionByPackage[name]
  )

  // Need to ensure successful release of all packages, so
  // we publish under a temporary tag first
  return Promise.all(
    packages.map(name =>
      packageJson.get(name).then(info => (info.private ? null : name))
    )
  )
    .then(names => names.filter(name => name !== null))
    .then(names => {
      // Start already published packages as published
      const published = existingPackages.reduce((pub, name) => {
        pub[name] = true
        return pub
      }, {})
      function publishReady(todo) {
        if (!todo.length) {
          return Promise.resolve([])
        }

        let ready = todo.filter(
          name =>
            related[name].filter(n => published[n] === undefined).length === 0
        )

        if (!ready.length) {
          return Promise.reject(
            new Error(
              `Cannot run publish on packages: there is a dependency cycle between packages ${JSON.stringify(
                related
              )}.`
            )
          )
        }

        // Make sure the package is to be released
        ready = ready.filter(name => names.indexOf(name) > -1)

        return Promise.all(
          ready.map(name => npm.publish(name, 'releasing'))
        ).then(results => {
          ready.forEach(name => (published[name] = true))

          return publishReady(
            todo.filter(n => published[n] === undefined)
          ).then(res => results.concat(res))
        })
      }

      return publishReady(names)
    })
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
}
