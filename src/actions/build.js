import { runAll } from '../helpers/runAll'

function buildPackages(npm, names) {
  return runAll(names.map(name => npm.runScript(name, 'build'))).then(
    results => {
      const failures = results.filter(result => result && !result.pass)
      if (failures.length) {
        throw new Error(`running npm scripts 'build' failed.`)
      }
      return Object.assign(
        ...results.map((result, idx) => ({
          [names[idx]]: result || false, // make sure we do not have undefined here
        }))
      )
    }
  )
}

export function build({ props, npm }) {
  const related = props.relatedPackagesByPackage
  console.log('related', related)
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
