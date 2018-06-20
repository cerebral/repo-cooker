import * as cook from '../actions'

function buildPackages(npm, names) {
  return Promise.all(names.map(name => npm.runScript(name, 'build'))).then(
    results =>
      Object.assign(
        ...results.map((result, idx) => ({
          [names[idx]]: result || false, // make sure we do not have undefined here
        }))
      )
  )
}

function build({ props, npm }) {
  const related = props.relatedPackagesByPackage
  const built = {}
  function buildReady(todo) {
    if (!todo.length) {
      return Promise.resolve({})
    }

    const ready = todo.filter(
      name => related[name].filter(n => built[n] === undefined).length === 0
    )

    if (!ready.length) {
      return Promise.reject(
        new Error(
          `Cannot build packages: there is a dependency cycle between packages ${JSON.stringify(
            related
          )}.`
        )
      )
    }

    return buildPackages(npm, ready).then(results => {
      Object.assign(built, results)
      return buildReady(todo.filter(n => built[n] === undefined))
    })
  }
  return buildReady(Object.keys(related)).then(() => ({ build: built }))
}

export const buildSequence = [
  cook.relatedPackagesByPackage,
  build,
  cook.fireworksWithTitle('build'),
]

export const buildSetup = {
  use: { packageJson: true, npm: true },
  sequence: buildSequence,
}
